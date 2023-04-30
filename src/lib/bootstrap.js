const config = require('../bot/config')
const {
  MONGO_URI,
  LOGGER_LEVEL_MAIN,
  SENTRY_URL
} = config

const IoC = require('./DI')()

const { loggerService } = require('../components/logger')
const { sentryService } = require('../components/sentry')

const { sessionService } = require('../components/session')
const { userService } = require('../components/user')

const { databaseService } = require('../components/database')

const bot = require('../bot')

IoC.register('config', config)

IoC.register('loggerLevelMain', LOGGER_LEVEL_MAIN ?? 'info')
IoC.factory('loggerService', loggerService)

IoC.register('sentryUrl', SENTRY_URL)
IoC.factory('sentryService', sentryService)

IoC.register('mongoUri', MONGO_URI)
IoC.factory('databaseService', databaseService)

IoC.factory('userService', userService)

IoC.factory('sessionService', sessionService)

IoC.factory('bot', bot)

IoC.get('bot')

const sentry = IoC.get('sentryService')
const logger = IoC.get('loggerService')

async function stopApplication (code = 0) {
  logger.main.info('Stopping application...')
  const bot = await IoC.get('bot')

  const databaseService = IoC.get('databaseService')
  await Promise.allSettled([
    sentry.close(2000).then(() => logger.main.info('Sentry stopped...')),
    bot.stop().then(() => logger.main.info('Bot stopped...')),
    databaseService.close()
  ])
  logger.main.info('Application stopped')
  process.exit(code)
}

async function processError (error) {
  logger.main.error(error.stack)
  sentry.captureException(error, {
    tags: {
      type: 'process'
    }
  })
  await stopApplication(1)
}

process
  .once('uncaughtException', processError)
  .once('unhandledRejection', processError)
  .once('SIGTERM', () => stopApplication())
  .once('SIGINT', () => stopApplication())

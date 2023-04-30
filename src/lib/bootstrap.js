const config = require('../bot/config')
const {
  MONGO_URI,
  LOGGER_LEVEL_MAIN,
  SENTRY_URL
} = config

const IoC = require('./DI')()

const loggerService = require('../components/logger/logger.service')
const sentryService = require('../components/sentry/sentry.service')

const sessionService = require('../components/session/session.service')

const userService = require('../components/user/user.service')

const database = require('../components/database/database.service')

const bot = require('../bot')

IoC.register('config', config)

IoC.register('loggerLevelMain', LOGGER_LEVEL_MAIN ?? 'info')
IoC.factory('loggerService', loggerService)

IoC.register('sentryUrl', SENTRY_URL)
IoC.factory('sentryService', sentryService)

IoC.register('mongoUri', MONGO_URI)
IoC.factory('database', database)

IoC.factory('userService', userService)

IoC.factory('sessionService', sessionService)

IoC.factory('bot', bot)

IoC.get('bot')

const sentry = IoC.get('sentryService')
const logger = IoC.get('loggerService')

async function stopApplication (code = 0) {
  logger.main.info('Stopping application...')
  const bot = await IoC.get('bot')

  const database = IoC.get('database')
  await Promise.allSettled([
    sentry.close(2000).then(() => logger.main.info('Sentry stopped...')),
    bot.stop().then(() => logger.main.info('Bot stopped...')),
    database.close()
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

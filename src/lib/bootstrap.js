const config = require('../bot/config')
const {
  MONGO_URI,
  LOGGER_LEVEL_MAIN,
  SENTRY_URL
} = config

const IoC = require('./DI')()

const LoggerService = require('../components/logger/logger.service')
const SentryService = require('../components/sentry/sentry.service')

const SessionService = require('../components/session/session.service')

const UserService = require('../components/user/user.service')

const Database = require('./database')

IoC.register('config', config)

IoC.register('loggerLevelMain', LOGGER_LEVEL_MAIN ?? 'info')
IoC.factory('LoggerService', LoggerService)

IoC.register('sentryUrl', SENTRY_URL)
IoC.factory('SentryService', SentryService)

IoC.register('mongoUri', MONGO_URI)
IoC.factory('Database', Database)

IoC.factory('UserService', UserService)

IoC.factory('SessionService', SessionService)

IoC.factory('bot', require('../bot'))

IoC.get('bot')

const Sentry = IoC.get('SentryService')
const logger = IoC.get('LoggerService')

async function stopApplication (code = 0) {
  logger.main.info('Stopping application...')
  const bot = await IoC.get('bot')

  const Database = IoC.get('Database')
  await Promise.allSettled([
    Sentry.close(2000).then(() => logger.main.info('Sentry stopped...')),
    bot.stop().then(() => logger.main.info('Bot stopped...')),
    Database.close()
  ])
  logger.main.info('Application stopped')
  process.exit(code)
}

async function processError (error) {
  logger.main.error(error.stack)
  Sentry.captureException(error, {
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

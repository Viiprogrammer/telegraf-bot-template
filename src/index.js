const { bot: botConfig, environment } = require('./config/index.js')
const { createBot } = require('./lib/runtime.js')
const { logger } = require('./lib/logger.js')
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: environment.SENTRY_URL,
  tracesSampleRate: 1.0
})

async function main () {
  const bot = await createBot(botConfig.token, {
    username: botConfig.username
  })

  bot.launch({ dropPendingUpdates: environment.BOT_DROP_PENDING_UPDATES })
    .then(async () => {
      logger.info('Start polling...')
      /* eslint-disable camelcase */
      bot.telegram.getMe()
        .then(({
          id,
          username,
          first_name,
          can_join_groups,
          can_read_all_group_messages,
          supports_inline_queries
        }) => {
          let message = 'Bot information:\r\n'
          message += `ID: ${id}\r\n`
          message += `Bot name: ${first_name}\r\n`
          message += `Bot username: ${username}\r\n`
          message += `Can join groups: ${can_join_groups}\r\n`
          message += `Can read all group messages: ${can_read_all_group_messages}\r\n`
          message += `Supports inline queries: ${supports_inline_queries}\r\n`

          logger.info(message)
        })
      /* eslint-enable */
    }).catch((error) => {
      Sentry.captureException(error)
      logger.error(error)
    })
}

main()
  .catch((error) => {
    Sentry.captureException(error)
    console.log(error)
  })

process.on('uncaughtException', (error) => {
  if (environment.SENTRY_URL) {
    Sentry.captureException(error, {
      tags: {
        type: 'process'
      }
    })
  }
  logger.error(error)
  process.exit(1)
})

process.on('unhandledRejection', (error) => {
  if (environment.SENTRY_URL) {
    Sentry.captureException(error, {
      tags: {
        type: 'process'
      }
    })
  }
  logger.error(error)
  process.exit(1)
})

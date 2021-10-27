const Sentry = require('@sentry/node')
const { Telegraf } = require('telegraf')
const { isDev, environment } = require('../config/index.js')

async function createBot (token, telegrafConfig) {
  const bot = new Telegraf(token, telegrafConfig)

  if (isDev) {
    bot.use(Telegraf.log())
  }

  bot.use(
    require('../handlers/middlewares'),
    require('../handlers/commands'),
    require('../handlers/unmatched')
  )

  if (environment.SENTRY_URL) {
    bot.catch((error) => {
      Sentry.captureException(error)
    })
  }

  return bot
}

module.exports = { createBot }

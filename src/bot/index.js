const { Telegraf, Composer } = require('telegraf')
const middlewares = require('./handlers/middlewares')
const commands = require('./handlers/commands')
const unmatchedHandler = require('./handlers/unmatched')

module.exports = async (config, loggerService, userService, sentryService, sessionService) => {
  const { token, username } = config.botInfo
  const bot = new Telegraf(token, { username })

  bot.context.service = {
    user: userService,
    session: sessionService
  }

  bot.use(
    middlewares,
    commands,
    unmatchedHandler
  )

  await bot.telegram.deleteWebhook({ drop_pending_updates: !!config.BOT_DROP_PENDING_UPDATES })
  bot.launch()
    .then(() => loggerService.main.info(`Bot "${username}" started`))
    .catch(error => {
      loggerService.main.error(error.stack)
    })

  bot.catch((error) => {
    loggerService.main.error(error.stack)
    sentryService.captureException(error, (scope) => {
      scope.setTag('type', 'bot')
      error.userId && scope.setUser({ id: error.userId })
    })
  })

  return bot
}

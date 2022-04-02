const { Telegraf, Composer } = require('telegraf')
const middlewares = require('./handlers/middlewares')
const commands = require('./handlers/commands')
const unmatched = require('./handlers/unmatched')

module.exports = async (config, LoggerService, UserService, SentryService, SessionService) => {
  const { token, username } = config.botInfo
  const bot = new Telegraf(token, { username })

  bot.context.service = {
    User: UserService,
    Session: SessionService
  }

  bot.use(
    middlewares,
    commands,
    Composer.mount('message', Composer.privateChat(unmatched))
  )

  await bot.telegram.deleteWebhook({ drop_pending_updates: !!config.BOT_DROP_PENDING_UPDATES })
  bot.launch()
    .then(() => LoggerService.main.info(`Bot "${username}" started`))
    .catch(error => {
      LoggerService.main.error(error.stack)
    })

  bot.catch((error) => {
    LoggerService.main.error(error.stack)
    SentryService.captureException(error, (scope) => {
      scope.setTag('type', 'bot')
      error.userId && scope.setUser({ id: error.userId })
    })
  })

  return bot
}

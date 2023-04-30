const { Composer } = require('telegraf')

const unmatchedHandler = Composer.mount('message', Composer.privateChat(ctx => {
  return ctx.reply(
    'Sorry, I couldn\'t understand that, do you need /help?'
  )
}))

module.exports = unmatchedHandler

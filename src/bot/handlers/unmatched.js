const unmatchedHandler = ctx => {
  return ctx.reply(
    'Sorry, I couldn\'t understand that, do you need /help?'
  )
}

module.exports = unmatchedHandler

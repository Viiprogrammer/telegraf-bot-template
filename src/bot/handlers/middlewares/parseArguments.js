/**
 * @param ctx {TelegrafContext}
 * @param next {function}
 * @returns {Promise}
 */
module.exports = (ctx, next) => {
  if (ctx.updateType === 'message' && ctx.updateSubTypes.includes('text')) {
    const text = ctx.message.text
    if (ctx.message.entities?.[0].type === 'bot_command') {
      const match = text.match(/^\/(\S+)\s?(.+)?/)
      let args = []
      let command
      if (match !== null) {
        if (match[1]) {
          command = match[1]
        }
        if (match[2]) {
          args = match[2].split(' ')
        }
      }

      ctx.state.command = {
        raw: text,
        command,
        args
      }
    }
  }
  return next()
}

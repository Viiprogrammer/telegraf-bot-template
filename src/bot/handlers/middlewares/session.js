const Mutex = require('async-mutex').Mutex
const session = (sessionName = 'session') => {
  const sessionLocks = new Map()

  /**
   * @param ctx {TelegrafContext}
   * @param next {function}
   * @returns {Promise}
   */
  return async (ctx, next) => {
    const sessionService = ctx.service.session
    const key = sessionService.getSessionKey(ctx)
    if (!sessionLocks.has(key)) sessionLocks.set(key, new Mutex())

    return sessionLocks.get(key)
      .runExclusive(async () => {
        const sessionData = await sessionService.getSession(key)
        ctx[sessionName] = key == null ? undefined : sessionData

        await next()

        if (ctx[sessionName] != null) {
          await sessionService.saveSession(key, ctx[sessionName])
        }
        sessionLocks.delete(key)
      })
  }
}
module.exports = session

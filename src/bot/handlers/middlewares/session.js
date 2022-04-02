const Mutex = require('async-mutex').Mutex
const session = (sessionName = 'session') => {
  const sessionLocks = new Map()

  /**
   * @param ctx {TelegrafContext}
   * @param next {function}
   * @returns {Promise}
   */
  return async (ctx, next) => {
    const SessionService = ctx.service.Session
    const key = SessionService.getSessionKey(ctx)
    if (!sessionLocks.has(key)) sessionLocks.set(key, new Mutex())

    return sessionLocks.get(key)
      .runExclusive(async () => {
        const sessionData = await SessionService.getSession(key)
        ctx[sessionName] = key == null ? undefined : sessionData

        await next()

        if (ctx[sessionName] != null) {
          await SessionService.saveSession(key, ctx[sessionName])
        }
        sessionLocks.delete(key)
      })
  }
}
module.exports = session

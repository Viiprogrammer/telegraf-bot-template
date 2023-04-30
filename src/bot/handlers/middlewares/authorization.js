/**
 * User authorization middleware
 * @param ctx {TelegrafContext}
 * @param next {function}
 * @returns {Promise}
 */

module.exports = async (ctx, next) => {
  ctx.state.user = await ctx.service.user.authorize(ctx.from)
  return next()
}

/**
 * User authorization middleware
 * @param ctx {TelegrafContext}
 * @param next {function}
 * @returns {Promise}
 */

module.exports = async (ctx, next) => {
  ctx.state.user = await ctx.service.User.authorize(ctx.from)
  return next()
}

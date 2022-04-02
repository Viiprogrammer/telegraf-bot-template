const { Composer } = require('telegraf')
const { isForwarded } = require('../../../utils')
const adminComposer = new Composer()
const cp = require('../commands/admin/cp')

adminComposer.command('/checkAdmin', ctx => ctx.reply('ADMIN!'))
adminComposer.command('/cp', cp)

module.exports = Composer.acl(ctx => {
  // Checking message forward & user role
  return !isForwarded(ctx) && ctx.state.user.role === 'ADMIN'
}, adminComposer)

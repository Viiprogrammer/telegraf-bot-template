const { Composer } = require('telegraf')
const cp = require('../commands/admin/cp')

const adminPanel = new Composer()

adminPanel.command('/checkAdmin', ctx => ctx.reply('ADMIN!'))
adminPanel.command('/cp', cp)

module.exports = Composer.privateChat(
  Composer.acl(ctx => ctx.state.user.role === 'ADMIN', adminPanel)
)

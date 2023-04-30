const { Router } = require('telegraf')
const router = new Router(require('./router'))

const helpCommand = require('./help');

router.handlers = new Map()
router.handlers.set('help', helpCommand)

module.exports = router

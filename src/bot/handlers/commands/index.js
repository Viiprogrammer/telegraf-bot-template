const { Router } = require('telegraf')
const router = new Router(require('./router'))

router.handlers = new Map()
router.handlers.set('help', require('./help'))

module.exports = router

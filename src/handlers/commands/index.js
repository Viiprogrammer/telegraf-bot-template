const { Router } = require('telegraf')
const requireDir = require('require-directory')
const rename = name => name.toLowerCase()
const router = new Router(require('./router'))
module.exports = router

const extensions = ['js']
const handlers = requireDir(module, { extensions, exclude: (_, name) => name === 'router.js', rename })
router.handlers = new Map(Object.entries(handlers))
module.exports = router

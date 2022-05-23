const { Router } = require('telegraf')
const path = require('path')
const fs = require('fs')
const router = new Router(require('./router'))

router.handlers = new Map(fs
  .readdirSync(__dirname)
  .filter(file => !['index.js', 'router.js'].includes(file) && fs.lstatSync(path.join(__dirname, file)).isFile())
  .map(file => [path.parse(file).name.toLowerCase(), require(path.join(__dirname, file))]))

module.exports = router

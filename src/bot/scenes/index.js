const path = require('path')
const fs = require('fs')

module.exports = fs
  .readdirSync(__dirname)
  .filter(file => !['index.js'].includes(file) && fs.lstatSync(path.join(__dirname, file)).isFile())
  .map(file => require(path.join(__dirname, file)))

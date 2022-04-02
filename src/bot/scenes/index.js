const path = require('path')
const fs = require('fs')
const dir = fs.readdirSync(path.join(__dirname, path.sep))

dir.forEach(function (filename) {
  if (path.extname(filename) === '.js' && filename !== 'models.js') {
    const exportAsName = path.basename(filename)
    module.exports[exportAsName] = require(path.join(__dirname, filename))
  }
})

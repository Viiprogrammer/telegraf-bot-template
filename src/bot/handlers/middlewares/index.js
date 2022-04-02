const { Composer } = require('telegraf')
const composer = new Composer()

composer.use(
  require('./session')(),
  require('./authorization'),
  require('./parseArguments'),
  Composer.privateChat(require('./adminComposer'))
)
module.exports = composer

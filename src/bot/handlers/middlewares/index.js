const { Composer, Stage } = require('telegraf')
const composer = new Composer()

composer.use(
  require('./session')(),
  require('./authorization'),
  require('./parseArguments'),
  new Stage(require('../../scenes')),
  Composer.privateChat(require('./adminComposer'))
)
module.exports = composer

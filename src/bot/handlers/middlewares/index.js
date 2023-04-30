const { Composer, Stage } = require('telegraf')
const composer = new Composer()
const scenes = require('../../scenes')
const stage = new Stage(Object.values(scenes))
const session = require('./session')
const authorization = require('./authorization')
const parseArgs = require('./parseArguments')

const adminPanel = require('./adminComposer')

composer.use(
  session(),
  authorization,
  parseArgs,
  stage,
  adminPanel
)

module.exports = composer

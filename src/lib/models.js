const { userModel } = require('../components/user')
const { sessionModel } = require('../components/session')

const models = {
  user: userModel,
  session: sessionModel
}

module.exports = models

const { model } = require('mongoose')
const UserScheme = require('./user.scheme')

module.exports = model('user', UserScheme)

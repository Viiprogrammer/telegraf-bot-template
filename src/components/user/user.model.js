const { model } = require('mongoose')
const userScheme = require('./user.scheme')

module.exports = model('user', userScheme)

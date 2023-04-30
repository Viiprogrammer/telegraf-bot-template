const { model } = require('mongoose')
const sessionScheme = require('./session.scheme')

module.exports = model('session', sessionScheme)

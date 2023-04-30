const { model } = require('mongoose')
const SessionScheme = require('./session.scheme')

module.exports = model('session', SessionScheme)

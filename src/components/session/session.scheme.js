const { Schema } = require('mongoose')
const { isProd } = require('../../bot/config')

const Session = new Schema({
  key: {
    type: String,
    required: true,
    index: { unique: true }
  },
  data: {
    type: Object,
    required: true
  }
}, {
  autoIndex: isProd !== true,
  autoCreate: true
})

module.exports = Session

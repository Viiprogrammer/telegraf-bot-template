const { Schema } = require('mongoose')
const { isProd } = require('../../bot/config')

const session = new Schema({
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

module.exports = session

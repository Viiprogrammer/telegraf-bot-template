const { Schema } = require('mongoose')
const { isProd } = require('../../bot/config')

const user = new Schema({
  userId: {
    type: String,
    required: true,
    index: { unique: true }
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  name: {
    first: String,
    last: String,
    user: String
  }
}, {
  autoIndex: isProd !== true,
  autoCreate: true,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

user.virtual('fullName').get(function () {
  const { first, last } = this.name
  return [first, last].filter(_ => _).join(' ')
})

module.exports = user

const { config } = require('dotenv')

config()

const environment = process.env

if (!environment.BOT_TOKEN) {
  throw new Error('No telegram bot token provided')
}

const {
  BOT_TOKEN,
  BOT_USERNAME,
  NODE_ENV = 'development'
} = environment

const bot = {
  token: BOT_TOKEN,
  username: BOT_USERNAME
}

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV !== 'development'

module.exports = { environment, bot, isDev, isProd }

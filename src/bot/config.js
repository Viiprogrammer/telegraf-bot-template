const environment = process.env

const {
  BOT_TOKEN,
  BOT_USERNAME,
  NODE_ENV = 'development',
  MONGO_URI
} = environment

if (!BOT_TOKEN) {
  throw new Error('No telegram bot token provided')
}

if (!MONGO_URI) {
  throw new Error('No mongodb url provided')
}

const botInfo = {
  token: BOT_TOKEN,
  username: BOT_USERNAME
}

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV !== 'development'
const isTest = NODE_ENV === 'test'

module.exports = {
  isDev,
  isProd,
  isTest,
  botInfo,
  ...environment
}

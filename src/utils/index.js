const usernameNormalize = s => s.replace(/^@/, '').toLowerCase()

function usernameEquals () {
  return Object.values(arguments).reduce((previousValue, currentValue) => {
    return usernameNormalize(previousValue) === usernameNormalize(currentValue)
  })
}

const isCommand = (message) => {
  const firstEntity = message?.entities?.[0]
  return firstEntity?.type === 'bot_command' && firstEntity.offset === 0
}

const isForwarded = ctx => ctx.message && 'forward_from' in ctx.message
const isPrivateChat = ctx => ctx.chat?.type === 'private'

const arrayRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// eslint-disable-next-line no-unused-vars
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const noop = Function.prototype

module.exports = {
  getRandomIntInclusive,
  usernameNormalize,
  usernameEquals,
  isCommand,
  isForwarded,
  isPrivateChat,
  arrayRandom,
  noop
}

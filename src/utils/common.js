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

module.exports = {
  usernameNormalize,
  usernameEquals,
  isCommand
}

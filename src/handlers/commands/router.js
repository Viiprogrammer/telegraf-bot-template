const { usernameEquals, isCommand } = require('../../utils/common')
module.exports = ({ me, message }) => {
  if (!isCommand(message)) return null
  const [, command, username] =
        /^\/(?:start )?(\w+)(@\w+)?/.exec(message.text)

  if (username && !usernameEquals(username, me)) return null

  return { route: command.toLowerCase() }
}
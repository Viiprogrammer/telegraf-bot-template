const { usernameEquals, isCommand } = require('../../../utils')

/**
 * Commands router middleware
 * @param {TelegrafContext}
 * @returns {null|{route: string}}
 */
module.exports = ({ me, message }) => {
  if (!isCommand(message)) return null
  const [, command, username] =
        /^\/(?:start )?(\w+)(@\w+)?/.exec(message.text)

  if (username && !usernameEquals(username, me)) return null

  return { route: command.toLowerCase() }
}

/**
 * Create a new User registration object to be handled in authorization middleware.
 * @param message {string} [message=An error occurred.] - The json message key to return to the user.
 * @extends Error
 */
class AuthorizationError extends Error {
  constructor (message, userId) {
    super(message)
    this.userId = userId
    this.name = this.constructor.name
    this.message = message
  }
}

module.exports = { AuthorizationError }

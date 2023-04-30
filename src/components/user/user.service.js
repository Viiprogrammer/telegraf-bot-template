const { User: { AuthorizationError } } = require('../../errors')

module.exports = (databaseService) => {
  class UserService {
    constructor (model) {
      this.model = model
    }

    /**
     * Creating new or updating exists user
     * @param user {object: { id: number, username: string|undefined, first_name: string, last_name: string|undefined}}
     * @returns {Promise: object}
     * @throws {AuthorizationError|Error}
     */
    authorize (user) {
      // eslint-disable-next-line camelcase
      const { id, username, first_name, last_name } = user

      // eslint-disable-next-line camelcase
      if (!first_name) {
        throw new AuthorizationError(`Missing fields for user ${id}`, id)
      }

      return this.model.findOneAndUpdate({
        userId: id
      }, {
        // eslint-disable-next-line camelcase
        'name.first': first_name,
        'name.last': last_name,
        'name.user': username,
        userId: id
      }, {
        upsert: true,
        new: true
      })
    }
  }

  return new UserService(databaseService.model.user)
}

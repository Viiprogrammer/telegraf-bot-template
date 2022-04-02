// eslint-disable-next-line no-unused-vars
const TelegrafContext = require('telegraf/context')

module.exports = (SessionRepository) => {
  class SessionService {
    constructor (repository) {
      this.repository = repository
    }

    saveSession (key, data) {
      return this.repository.updateOne({ key }, { $set: { data } }, { upsert: true })
    }

    /**
     * Method for getting session by session key
     * @param key {string}
     * @returns {Object}
     */
    async getSession (key) {
      const session = await this.repository.findOne({ key })
      return session?.data ?? {}
    }

    /**
     * Method for getting session key by context
     * @param {TelegrafContext}
     * @returns {string|null}
     */
    getSessionKey ({
      from,
      chat
    }) {
      if (from == null || chat == null) {
        return null
      }

      return `${from.id}:${chat.id}`
    }
  }

  return new SessionService(SessionRepository)
}

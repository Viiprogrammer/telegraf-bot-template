module.exports = (databaseService) => {
  class SessionService {
    constructor (model) {
      this.model = model
    }

    saveSession (key, data) {
      return this.model.updateOne({ key }, { $set: { data } }, { upsert: true })
    }

    /**
     * Method for getting session by session key
     * @param key {string}
     * @returns {Object}
     */
    async getSession (key) {
      const session = await this.model.findOne({ key })
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

  return new SessionService(databaseService.model.session)
}

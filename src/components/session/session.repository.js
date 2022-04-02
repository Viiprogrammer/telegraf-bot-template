module.exports = (Database) => {
  class SessionRepository {
    constructor (model) {
      this.model = model
    }

    findOne (filter, options) {
      return this.model.findOne(filter, options)
    }

    updateOne (filter, update, options) {
      return this.model.updateOne(filter, update, options)
    }
  }
  return new SessionRepository(Database.model.Session)
}

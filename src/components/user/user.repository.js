module.exports = (Database) => {
  class UserRepository {
    constructor (model) {
      this.model = model
    }

    findOneAndUpdate (filter, update, options) {
      return this.model.findOneAndUpdate(filter, update, options)
    }
  }
  return new UserRepository(Database.model.User)
}

const mongoose = require('mongoose')
const models = require('../../lib/models')

class DatabaseService {
  /**
   * Database class constructor
   * @constructor
   */
  constructor (logger) {
    this._logger = logger
    this._connection = mongoose.connection
    this._models = models
    this._connection
      .on('open', () => logger.info('Database connection: open'))
      .on('close', () => logger.info('Database connection: close'))
      .on('disconnected', () => logger.warn('Database connection: disconnecting'))
      .on('reconnectFailed', () => logger.error('Database connection: reconnect failed'))
      .on('reconnected', () => logger.info('Database connection: reconnected'))
      .on('fullsetup', () => logger.info('Database connection: fullsetup'))
      .on('all', () => logger.info('Database connection: all'))
      .on('error', error => logger.error(`MongoDB connection: error: ${error.stack}`))
  }

  /**
   * Getter for models
   * @returns {object}
   */
  get model () {
    return this._models
  }

  /**
   * MongoDriver Client
   * @returns {MongoClient}
   */
  get client () {
    return this._connection.getClient()
  }

  /**
   * Open db connection
   * @returns {Promise}
   */
  async connect ({
    url,
    options
  }) {
    try {
      await mongoose.connect(url, options)
    } catch (error) {
      this._logger.error(error.stack)
    }
  }

  /**
   * Closing db connection
   * @returns {Promise}
   */
  async close () {
    try {
      await this._connection.close()
    } catch (error) {
      this._logger.error(error.stack)
    }
  }
}

module.exports = (mongoUri, loggerService) => {
  const db = new DatabaseService(loggerService.main)
  db.connect({ url: mongoUri })
  return db
}

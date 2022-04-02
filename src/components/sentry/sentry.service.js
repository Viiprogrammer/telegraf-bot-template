const sentry = require('@sentry/node')

module.exports = (sentryUrl, config) => {
  class Sentry {
    constructor () {
      sentry.init(...arguments)
    }

    captureException () {
      return sentry.captureException(...arguments)
    }

    close () {
      return sentry.close(...arguments)
    }
  }

  return new Sentry({
    dsn: sentryUrl,
    environment: config.NODE_ENV,
    tracesSampleRate: parseFloat(config.SENTRY_TRACES_SAMPLE_RATE)
  })
}

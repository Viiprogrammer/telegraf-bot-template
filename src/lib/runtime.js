const { Telegraf } = require("telegraf");
const { isDev, environment } = require('../config/index.js');

async function createBot(token, telegrafConfig) {
    const bot = new Telegraf(token, telegrafConfig);

    if (isDev) {
        bot.use(Telegraf.log());
    }

    if (environment.SENTRY_URL) {
        bot.catch((error) => {
            Sentry.captureException(error);
        });
    }

    return bot;
}

module.exports = {createBot};
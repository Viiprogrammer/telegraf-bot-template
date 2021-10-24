const winston = require('winston')
const path = require('path')
const logsDirectoryPath = path.join(__dirname, '..', '..', 'logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    timestamp: function () {
        return (new Date()).toLocaleTimeString();
    },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: path.join(logsDirectoryPath, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logsDirectoryPath, 'combined.log') }),
    ],
});

winston.addColors({
    error: "red",
    warn: "magenta",
    info: "green",
    verbose: "gray",
    debug: "blue",
    silly: "grey"
});

winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
    }));
}
module.exports = { logger }


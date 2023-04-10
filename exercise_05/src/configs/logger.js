const { createLogger, transports, format } = require('winston');
require('dotenv').config();

const options = {
    file: {
        level: process.env.LOGGER_LEVEL,
        filename: process.env.LOG_LOCATION,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: process.env.LOGGER_LEVEL,
        handleExceptions: true,
        colorize: true,
    },
};


const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
    ]
});

const loggerMiddleware = (req, res, next) => {
    logger.log('info', `${req.method}/${req.httpVersion} ${req.url}`);
    next();
}

module.exports = { logger, loggerMiddleware };
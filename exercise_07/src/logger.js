const { createLogger, transports, format } = require('winston');

require('dotenv').config();

// Different ways to store or view logs
const transportOptions = {
    file: {
        level: 'info',
        filename: process.env.LOG_LOCATION,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// Configuration of the logger
const loggerOptions = {
    level: process.env.LOGGER_LEVEL,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new transports.File(transportOptions.file),
        new transports.Console(transportOptions.console),
    ]
}


const logger = createLogger(loggerOptions);

// Logger middleware to log requests received
const loggerMiddleware = (req, res, next) => {
    logger.log('info', `${req.method}/${req.httpVersion} ${req.url}`);
    next();
}

module.exports = { logger, loggerMiddleware };
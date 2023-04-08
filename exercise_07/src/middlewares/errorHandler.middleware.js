const HTTPError = require("../utils/error_utils/HTTPError");
const { REQUEST_STATUS, MESSAGES, STATUS_CODES } = require("../constants/response.constants");
const { logger } = require("../logger");
require('dotenv').config();


const errorHandler = (error, req, res, next) => {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.SERVER_ERROR;

    if(error instanceof HTTPError) {
        // Handle HTTPErrors 
        logger.info(error.json());
        statusCode = error.statusCode
        message = error.message
    } else if(error instanceof Error) {
        // Handle expected and unexpected errors from application
        logger.error(`${error.name}: ${error.message}`);
        logger.error(error.stack);
        if(process.env.NODE_ENV !== 'production') {
            // Donot show application error to users in production
            message = error.message;
        }
    } else {
        // Handle other object that has been sent to the errorHandler
        logger.error(error);
    }

    // Send response
    res.status(statusCode).json({
        message: message,
        status: REQUEST_STATUS.FAILED
    })
}

module.exports = errorHandler;

const { logger } = require("../../configs/logger")
const HTTPError = require('../error_utils/HttpError');


const errorHandler = (error, req, res, next) => {
    if(error instanceof Error) {
        logger.info()
        console.log(error);
        console.log(error.json());
    } else if (error instanceof HTTPError) {
        logger.error(error.json());
    }
}

// errorHandler(error, null, null, null);

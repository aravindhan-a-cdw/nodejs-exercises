const { MESSAGES, REQUEST_STATUS, STATUS_CODES, ERRORS } = require('../constants/response.constants');
const {createUser} = require('../services/user.services');
const {handleError} = require('../utils/error_utils/error-handlers.utils');
const HTTPError = require('../utils/error_utils/HTTPError');


const userPostController = async (req, res, next) => {

    try {
        // Check if user is already authenticated
        if(req.isAuthenticated) {
            throw new HTTPError(MESSAGES.ALREADY_LOGGED_IN, ERRORS.ALREADY_LOGGED_IN, STATUS_CODES.BAD_REQUEST);
        }

        // Get credentials and validate
        const userData = {
            username: req.body.username, 
            password: req.body.password
        }
        if(userData.username === undefined || userData.password === undefined) {
            throw new HTTPError(MESSAGES.CREDENTIAL_VALIDATION, ERRORS.CREDENTIAL_VALIDATION, STATUS_CODES.BAD_REQUEST);
        }

        // Create new user and send response
        await createUser(userData);
    
        res.status(STATUS_CODES.CREATED).json({
            "status": REQUEST_STATUS.SUCCESS,
            "message": MESSAGES.ACCOUNT_CREATION_SUCCESS
        })

    }catch (err) {
        next(err);
    }
}

module.exports = {
    userPostController
}
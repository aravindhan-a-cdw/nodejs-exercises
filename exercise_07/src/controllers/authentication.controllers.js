const { STATUS_CODES, MESSAGES, REQUEST_STATUS, ERRORS } = require("../constants/response.constants");
const { checkUser, getJWTToken } = require("../services/authentication.services");
const HTTPError = require("../utils/error_utils/HTTPError");


const loginController = async (req, res, next) => {
    try{
        // Check if user is already logged in
        if(req.isAuthenticated) {
            throw new HTTPError(MESSAGES.ALREADY_LOGGED_IN, ERRORS.ALREADY_LOGGED_IN, STATUS_CODES.BAD_REQUEST);
        }
    
        // Get credentials and validate
        const USER_DATA = {
            username: req.body.username, 
            password: req.body.password
        }
        // Validate user data
        if(USER_DATA.username === undefined || USER_DATA.password === undefined) {
            throw new HTTPError(MESSAGES.CREDENTIAL_VALIDATION, ERRORS.CREDENTIAL_VALIDATION, STATUS_CODES.BAD_REQUEST);
        }
        
        // Check registered user and send JWT Token
        const USERID = await checkUser(USER_DATA);
        const JWT_TOKEN = await getJWTToken({id: USERID});
    
        res.status(STATUS_CODES.OK).json({
            status: REQUEST_STATUS.SUCCESS,
            message: MESSAGES.LOGIN_SUCCESS,
            token: JWT_TOKEN
        })

    } catch (error) {
        next(error);
    }

}

module.exports = {
    loginController
}


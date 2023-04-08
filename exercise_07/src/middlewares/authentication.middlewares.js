const { verify } = require("jsonwebtoken");
const HTTPError = require('../utils/error_utils/HTTPError');
const {MESSAGES, STATUS_CODES, ERRORS} = require('../constants/response.constants');
require("dotenv").config();

const authenticateUser = (req, res, next) => {
    try{
        const jwtToken = req.headers["authorization"]?.split(" ")[1] || null;
        if (jwtToken !== null) {
            const jwtData = verify(jwtToken, process.env.JWT_SECRET);
            req.isAuthenticated = true;
            req.user = jwtData.payload;
        }
    } catch (error) {
        next(error);
    }
    next();
}

const authenticationRequired = (req, res, next) => {
    if(!req.isAuthenticated) {
        return next(new HTTPError(MESSAGES.UNAUTHENTICATED_USER, ERRORS.UNAUTHENTICATED_USER, STATUS_CODES.UNAUTHORIZED));
    }
    next();
}

module.exports = { authenticationRequired, authenticateUser};

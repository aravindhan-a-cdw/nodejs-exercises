const {createUser} = require('../services/user.services');
const {handleError} = require('../utils/error_utils/error-handlers.utils');
const HTTPError = require('../utils/error_utils/HTTPError');


const userPostController = async (req, res, next) => {

    try {
        // Check if user is already authenticated
        if(req.isAuthenticated) {
            throw new HTTPError("You are already logged in!", "UserLoggedIn", 400);
        }

        // Get credentials and validate
        const userData = {
            username: req.body.username, 
            password: req.body.password
        }
        if(userData.username === undefined || userData.password === undefined) {
            throw new HTTPError("Username or password field cannot be empty!", "ValidationError", 400);
        }

        // Create new user and send response
        await createUser(userData);
    
        res.json({
            "status": "success",
            "message": "Your account has been created successfully!"
        })

    }catch (err) {
        next(err);
    }
}

module.exports = {
    userPostController
}
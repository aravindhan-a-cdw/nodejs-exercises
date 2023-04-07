const { checkUser, getJWTToken } = require("../services/authentication.services");
const HTTPError = require("../utils/error_utils/HTTPError");


const loginController = async (req, res, next) => {
    try{
        // Check if user is already logged in
        if(req.isAuthenticated) {
            throw new HTTPError("You are already logged in!", "UserLoggedIn", 400);
        }
    
        // Get credentials and validate
        const USER_DATA = {
            username: req.body.username, 
            password: req.body.password
        }
        if(USER_DATA.username === undefined || USER_DATA.password === undefined) {
            throw new HTTPError("Username or password field cannot be empty!", "ValidationError", 400);
        }
    
        const USERID = await checkUser(USER_DATA);
        const JWT_TOKEN = await getJWTToken(USERID);
    
        res.status(200).json({
            status: "success",
            message: "Log in successful",
            token: JWT_TOKEN
        })

    } catch (error) {
        next(error);
    }

}

module.exports = {
    loginController
}


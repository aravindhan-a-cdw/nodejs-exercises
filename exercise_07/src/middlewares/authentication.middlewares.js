const { verify } = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
    const jwtToken = req.headers["authorization"]?.split(" ")[1] || null;
    if (jwtToken !== null) {
        const jwtData = verify(jwtToken, process.env.JWT_SECRET);
        console.log(jwtData);
        req.isAuthenticated = true;
    }
    next();
}


module.exports = authenticateUser
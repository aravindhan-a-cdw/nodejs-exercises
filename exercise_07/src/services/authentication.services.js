const {readFile} = require('fs/promises');
const {existsSync} = require('fs');
const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const HTTPError = require('../utils/error_utils/HTTPError');
const { ERRORS, MESSAGES, STATUS_CODES } = require('../constants/response.constants');
require('dotenv').config();

/**
 * 
 * @param {Object} user The data specific to the user
 * @returns {String} Signed JWT Token for the given payload
 */
const getJWTToken = (user) => {
    return sign(user, process.env.JWT_SECRET, {expiresIn: '30m'});    
}

/**
 * Function to check if user is a valid registered user.
 * @param {Object} userData Object containing username and password.
 * @returns UserId
 */
const checkUser = async (userData) => {
    let users = [];
    // Load data from file
    if(existsSync(process.env.USER_DATA_LOCATION)){
        const FILEDATA = (await readFile(process.env.USER_DATA_LOCATION)).toString('utf-8');
        
        if(FILEDATA !== '' && FILEDATA !== '[]'){
            users = JSON.parse(FILEDATA);
            if(!(users instanceof Array)){
                throw new Error('File is in unexpected format.');
            }
        }
    }
    // Check if the username is available
    const USER_INDEX = users.findIndex(user => user.username === userData.username);
    if(USER_INDEX === -1){
        throw new HTTPError(MESSAGES.LOGIN_FAILED, ERRORS.LOGIN_FAILED, STATUS_CODES.BAD_REQUEST);
    }
    // Fetch user data, check the password and return user id
    const EXISTING_USER = users[USER_INDEX];
    if(!(await compare(userData.password, EXISTING_USER.password))){
        throw new HTTPError(MESSAGES.LOGIN_FAILED, ERRORS.LOGIN_FAILED, STATUS_CODES.BAD_REQUEST);
    }
    return EXISTING_USER.id;
}

module.exports = {
    checkUser, getJWTToken
}


const {readFile} = require('fs/promises');
const {existsSync} = require('fs');
const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const HTTPError = require('../utils/error_utils/HTTPError');
require('dotenv').config();

/**
 * 
 * @param {Number|String} user_id The unique id to represent a user
 * @returns {String} Signed JWT Token for the given payload
 */
const getJWTToken = (user_id) => {
    return sign({user_id}, process.env.JWT_SECRET, {expiresIn: '30m'});    
}

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
        throw new HTTPError("Username or password is incorrect!", "IncorrectCredentialError", 400);
    }
    // Fetch user data, check the password and return user id
    const EXISTING_USER = users[USER_INDEX];
    if(!(await compare(userData.password, EXISTING_USER.password))){
        throw new HTTPError("Username or password is inncorrect!", "IncorrectCredentialError", 400);
    }
    return EXISTING_USER.id || USER_INDEX;
}

module.exports = {
    checkUser, getJWTToken
}


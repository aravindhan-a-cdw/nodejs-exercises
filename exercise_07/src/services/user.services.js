const {readFile, writeFile} = require('fs/promises');
const {existsSync} = require('fs');
const {hash} = require('bcrypt');
const HTTPError = require('../utils/error_utils/HTTPError');
require('dotenv').config();


const createUser = async (userData) => {
    
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
    const EXISTING_USER = users.findIndex(user => user.username === userData.username);
    if(EXISTING_USER !== -1){
        throw new HTTPError("Username already exists!", "UsernameNotAvailableError", 400);
    }
    // Hash the password before storing
    userData.password = await hash(userData.password, parseInt(process.env.SALT_ROUNDS));
    users.push(userData);
    // Write the users data to persistent storage
    await writeFile(process.env.USER_DATA_LOCATION, JSON.stringify(users, null, '\t'));
}


module.exports = {
    createUser
}

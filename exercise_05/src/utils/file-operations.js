const fs = require('fs');
require('dotenv').config();

const dataSourceFileName = process.env.BUDDIES_FILE_NAME;

const writeJsonFile = (jsonObj) => {
    fs.writeFile(dataSourceFileName, JSON.stringify(jsonObj, null, '\t'), 'utf-8', (err) => {
        if(err) {
            console.error("Error occurred while saving data to file.", err.message);
        }
    })
};

const readJsonFileSync = () => {
    try {
        const fileData = fs.readFileSync(dataSourceFileName, 'utf-8');
        const jsonData = JSON.parse(fileData);
        return jsonData;
    } catch(err) {
        console.error("Error occurred while reading file.", err.message);
    }
    return []; // This feels wrong as the caller won't know whether the file is empty or it has []
}

module.exports = {writeJsonFile, readJsonFileSync};

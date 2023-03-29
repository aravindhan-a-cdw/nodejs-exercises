const fs = require('fs');

const dataSourceFileName = __dirname + '/../../files/cdw_ace23_buddies.json';

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
    return [];
}

module.exports = {writeJsonFile, readJsonFileSync};

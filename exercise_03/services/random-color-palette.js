const fs = require('fs');
const getRandomElements = require('random-elements-array')

const sourceFileName = 'color_palette.json';

// Get File Data and parse as json and pass it to the callback
const getJsonFileAsync = (fileName, callback) => {
    fs.readFile(fileName, 'utf-8', (err, fileData) => {
        if (err) {
            console.log("Error while reading the file");
            console.error(err.message);
            return;
        }
        const jsonFileData = JSON.parse(fileData);
        callback(jsonFileData);
    });
}

const randomColorRequestHandler = (req, res) => {
    getJsonFileAsync('data/' + sourceFileName, (jsonData) => {
        const randomPalette = getRandomElements(jsonData, 5);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'color-palette': randomPalette}, null, 4));
    })
}

module.exports = {randomColorRequestHandler};
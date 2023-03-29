const fs = require('fs');

const sourceFileName = 'color_palette.json';

// Get File Data and parse as json and pass it to the callback
const getJsonFileAsync = (fileName, callback) => {
    fs.readFile(fileName, 'utf-8', (err, fileData) => {
        if (err) {
            console.log("Error while reading the file");
            console.error(err.message);
            return;
        }
        try{
            const jsonFileData = JSON.parse(fileData);
            callback(jsonFileData);
        } catch (err) {
            console.error(err.message);
        }
    });
}

// Get random elements array by passing the array and count.
const getRandomArray = (array, elementCount) => {

    if(elementCount > array.length) {
        console.log("Elements count cannot be greater than the array length");
        return null;
    }
    const randomArray = [];

    while(elementCount != 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array.splice(randomIndex, 1);
        randomArray.push(...randomElement);
        elementCount--;
    }

    return randomArray;
}

const randomColorRequestHandler = (req, res) => {
    getJsonFileAsync('data/' + sourceFileName, (jsonData) => {
        const randomPalette = getRandomArray(jsonData, 5);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'color-palette': randomPalette}, null, 4));
    })
}

module.exports = {randomColorRequestHandler};
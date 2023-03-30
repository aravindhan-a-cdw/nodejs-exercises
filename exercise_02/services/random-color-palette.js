const fs = require('fs');

const sourceFileName = 'color_palette.json';

// Get File Data and parse as json and pass it to the callback
const getJsonFileAsync = (fileName, callback, errHanlder) => {
    fs.readFile(fileName, 'utf-8', (err, fileData) => {
        try{
            if (err) {
                throw err;
            }
            const jsonFileData = JSON.parse(fileData);
            callback(jsonFileData);
        } catch (err) {
            errHanlder(err);
        }
    });
}

// Get random elements array by passing the array and count.
const getRandomArray = (array, elementCount) => {

    if(elementCount > array.length) {
        throw new Error("Elements count cannot be greater than the array length");
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
    getJsonFileAsync(
            'data/' + sourceFileName, 
            (jsonData) => {
                // Callback in case of no error in getting jsonData
                const randomPalette = getRandomArray(jsonData, 50000);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({'color-palette': randomPalette}, null, 4));
            },
            (err) => {
                // Error Handler in case of any error
                console.log(err.message);
                res.statusCode = 500;
                res.end("Server could not complete your request");
            }
        )
}

module.exports = {randomColorRequestHandler};
/*
    1. Read the color_palette.json file as a JSON array from the filesystem using the core `fs` module
    2. Randomize the color palette and take 5 colors
    3. Programmatically create a new file `randomized_color_ palette.json` in your filesystem and write the randomized 5 colors into that file
    4. Read the newly created `randomized_color_ palette.json` again in the same NodeJS program and print those 5 colors in the console
*/

let fs = require('fs');

let sourceFileName = 'color_palette.json';
let newFileName = 'randomized_color_palette.json';

// Get File Data and convert to object synchronously.
const getJsonFileSync = (fileName) => {
    const fileData = fs.readFileSync(fileName, "utf-8");
    const jsonData = JSON.parse(fileData);
    return jsonData;
}

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

// Get random elements array by passing the array and count.
const getRandomElements = (array, elementCount) => {

    if(elementCount > array.length) {
        console.log("Elements count cannot be greater than the array length");
        return null;
    }
    const randomArray = [];

    while(elementCount != 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array.splice(randomIndex, 1);
        randomArray.push(randomElement);
        elementCount--;
    }

    return randomArray;
}

// Save random colorpalette synchronously
const saveRandomColorsSync = (sourceFileName, destFileName, count) => {
    try{
        const colorPalette = getJsonFileSync(sourceFileName);
        const randomArray = getRandomElements(colorPalette, count);

        fs.writeFileSync(destFileName, JSON.stringify(value=randomArray, null, "\t"))
    }catch (error) {
        console.log(error.message);
    }
}

// Save random colorpalatte asynchronously
const saveRandomColorsAsync = (sourceFileName, destFileName, count) => {
    getJsonFileAsync(sourceFileName, (jsonData) => {
        const randomArray = getRandomElements(jsonData, count);

        const fileWriteCallback = (err) => {
            if(err){
                console.log("Error Occurred while writing the file");
                console.log(err.message);
            } else {
                console.log("File has been saved successfully!");
            }
        };

        fs.writeFile(destFileName, JSON.stringify(randomArray, null, 4), 'utf-8', fileWriteCallback);
    })
}

saveRandomColorsSync(sourceFileName, newFileName, 5);
// saveRandomColorsAsync(sourceFileName, newFileName, 5);

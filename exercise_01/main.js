/*
    1. Read the color_palette.json file as a JSON array from the filesystem using the core `fs` module
    2. Randomize the color palette and take 5 colors
    3. Programmatically create a new file `randomized_color_ palette.json` in your filesystem and write the randomized 5 colors into that file
    4. Read the newly created `randomized_color_ palette.json` again in the same NodeJS program and print those 5 colors in the console
*/

const fs = require('fs');

let sourceFileName = 'color_palette.json';
let newFileName = 'randomized_color_palette.json';

// Get File Data and convert to object synchronously.
const getJsonFileSync = (fileName) => {
    try{
        const fileData = fs.readFileSync(fileName, "utf-8");
        // const jsonData = JSON.parse(fileData);
        const jsonData = eval(`(${fileData})`); // Alternative to JSON.parse;
        return jsonData;
    } catch (error) {
        console.error("Error:", error.message);
    }
    return null;
}

// Get File Data and parse as json and pass it to the callback
const getJsonFileAsync = (fileName, callback) => {
    fs.readFile(fileName, 'utf-8', (error, fileData) => {
        try{
            if (error) {
                throw error;
            }
            const jsonFileData = JSON.parse(fileData);
            callback(jsonFileData);
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}

// Get random elements array by passing the array and count.
const getRandomElements = (array, elementCount) => {

    if(elementCount > array.length) {
        throw new Error("Elements count cannot be greater than the array length");
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
        if(colorPalette === null) {
            throw new Error("Color palette is null");
        }
        if(colorPalette.length === 0){
            throw new Error("Color palettes is empty!");
        }
        const randomArray = getRandomElements(colorPalette, count);

        fs.writeFileSync(destFileName, JSON.stringify(value=randomArray, null, "\t"))
    }catch (error) {
        console.error("Error:", error.message);
    }
}

// Save random colorpalatte asynchronously
const saveRandomColorsAsync = (sourceFileName, destFileName, count) => {
    getJsonFileAsync(sourceFileName, (colorPalette) => {
        try {
            if(colorPalette.length === 0) {
                throw new Error("Color Palette is empty!");
            }
            const randomArray = getRandomElements(colorPalette, count);
        } catch (error) {
            console.error("Error:", error.message);
        }

        const fileWriteCallback = (error) => {
            if(error){
                console.log("Error Occurred while writing the file");
                console.log(error.message);
            } else {
                console.log("File has been saved successfully!");
            }
        };

        fs.writeFile(destFileName, JSON.stringify(randomArray, null, 4), 'utf-8', fileWriteCallback);
    })
}

saveRandomColorsSync(sourceFileName, newFileName, 5);
// saveRandomColorsAsync(sourceFileName, newFileName, 5);

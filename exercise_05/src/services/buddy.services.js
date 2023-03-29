// Imports 
const { readJsonFileSync, writeJsonFile } = require('../utils/file-operations');
require('dotenv').config();

const useMemory = process.env.USE_MEMORY;
let buddiesList = [];

/**
 * Function which returns buddies list from file if useMemory is set to false else it will return array saved in memory.
 * 
 * @returns {Array}
 */
const getBuddiesData = () => {
    if (useMemory) {
        return buddiesList;
    }
    buddiesList = readJsonFileSync();
    return buddiesList;
}

/**
 * Function to get all buddies.
 * @returns {Array}
 */
const getAllBuddies = () => {
    return getBuddiesData();
};

/**
 * This function requires either employeeId or name to return the matching buddies from the list.
 * @param {Number} id EmployeeId
 * @param {String} name realName of the buddy
 * @returns {Array}
 */
const getBuddy = (id = null, name = null) => {
    const buddies = getBuddiesData();

    let buddy = [];
    if (id) {
        buddy = buddies.filter((buddyObj) => buddyObj.employeeId === id);
    } else if (name) {
        buddy = buddies.filter((buddyObj) => buddyObj.realName === name);
    }
    return buddy;
};

/**
 * 
 * @param {Object} buddyData An object containing employeeId, realName, nickName, dob, hobbies.
 * @returns {String|null} Error message or null
 */
const createBuddy = (buddyData) => {

    // Check if buddy already exists

    const existingBuddy = buddiesList.filter(buddy => buddy.employeeId === buddyData.employeeId);
    if(existingBuddy.length !== 0) {
        return "You are already in the list!";
    }

    // Store new buddy to the list
    buddiesList.push(buddyData);
    writeJsonFile(buddiesList);
    return null;

};

/**
 * Handler to update buddy information.
 * @param {Number} id EmployeeId 
 * @param {Object} buddyData An object containing data to be updated
 * @returns {String | null} Error message in case of any error or null
 */
const updateBuddy = (id, buddyData) => {
    const index = buddiesList.findIndex((buddy) => buddy.employeeId === id);
    if(index === -1) {
        return "Buddy doesn't exist to update!"
    }
    buddiesList[index] = {
        ...buddiesList[index],
        ...buddyData
    }
    writeJsonFile(buddiesList);
    return null;
};

/**
 * Handler to delete a buddy by passing the employeeId
 * @param {Number} id EmployeeId to delete from the list
 * @returns {String | null} Error message in case of any error or null
 */
const deleteBuddy = (id) => {
    const index = buddiesList.findIndex((buddy) => buddy.employeeId === id);
    if(index === -1) {
        return "Buddy doesn't exist to delete!"
    }

    buddiesList.splice(index, 1);
    writeJsonFile(buddiesList);
    return null;

};

module.exports = { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy };

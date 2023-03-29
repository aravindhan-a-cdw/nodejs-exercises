// Imports 
const { readJsonFileSync, writeJsonFile } = require('../utils/file-operations');


const useMemory = false;
let buddiesList = [{ id: 10, name: "Aravindhan A", nickname: "Arav" }];

const getBuddiesData = () => {
    if (useMemory) {
        return buddiesList;
    }
    buddiesList = readJsonFileSync();
    return buddiesList;
}

const getAllBuddies = () => {
    return getBuddiesData();
};

const getBuddy = (id = null, name = null) => {
    console.log("ID", id, "Name", name);
    const buddies = getBuddiesData();

    let buddy = [];
    if (id) {
        buddy = buddies.filter((buddyObj) => buddyObj.employeeId === id);
    } else if (name) {
        buddy = buddies.filter((buddyObj) => buddyObj.realName === name);
    }
    return buddy;
};

const createBuddy = (buddyData) => {
    
    if (isNaN(buddyData.employeeId)) {
        return "EmployeeId is not valid!";
    }
    
    if (!buddyData.realName || !buddyData.nickName || !buddyData.dob || !buddyData.hobbies) {
        return "Some values given by you are not valid!";
    }

    const existingBuddy = buddiesList.filter(buddy => buddy.employeeId === buddyData.employeeId);
    if(existingBuddy.length !== 0) {
        return "You are already in the list!";
    }

    buddiesList.push(buddyData);
    writeJsonFile(buddiesList);
    return null;

};

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

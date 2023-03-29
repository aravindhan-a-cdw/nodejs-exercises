// Imports 
const { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy } = require('../services/buddy.services');
const { sendResponse } = require('../utils/response');
const { logger } = require('../logger');


const buddyGetAllController = (req, res) => {
    res.json(getAllBuddies());
};

const buddyGetController = (req, res) => {
    const idOrName = req.params.id;
    let result = null;

    if (!isNaN(idOrName)) {
        result = getBuddy(parseInt(idOrName));
    } else {
        result = getBuddy(null, idOrName);
    }
    const statusCode = result.length > 0 ? 200 : 404;
    res.status(statusCode).json(result);
};

const buddyCreateController = (req, res) => {

    // Preparing data from body and path parameter
    const buddyData = {
        ...req.body,
    }

    try {

        // Data validation
        if (isNaN(buddyData.employeeId)) {
            return sendResponse(res, "EmployeeId is not Valid!", 400);
        }

        if (buddyData.realName === "" || buddyData.nickName === "" || !buddyData.dob === "" || !buddyData.hobbies === "") {
            return sendResponse(res, "Some fields are not valid. Check and submit.", 400);
        }

        // Pass data to the service
        const err = createBuddy(buddyData);

        if (err) {
            return sendResponse(res, err, 400);
        }
        return sendResponse(res, "Buddy added successfully!", 201);

    } catch (err) {
        logger.log('error', err.message, "Buddy Controller");
        return sendResponse(res, err.message, 500);
    }
};

const buddyUpdateController = (req, res) => {

    // Prepare data from body and path parameter
    const employeeId = parseInt(req.params.id);
    const newData = req.body;

    // Data validation
    if (isNaN(employeeId)) {
        return sendResponse(res, "EmployeeId is not valid!", 400);
    }

    // Handle data in service
    const err = updateBuddy(employeeId, newData);

    if (err) {
        return sendResponse(res, err, 400);
    }

    return sendResponse(res, "Buddy updated successfully!");
};

const buddyDeleteController = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).json({
            status: "failed",
            message: "EmployeeId is not valid!"
        })
    }
    const err = deleteBuddy(parseInt(id));
    if (err) {
        return res.status(400).json({
            status: "failed",
            message: err
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Buddy deleted successfully!"
    });
};

module.exports = { buddyGetController, buddyGetAllController, buddyCreateController, buddyUpdateController, buddyDeleteController };

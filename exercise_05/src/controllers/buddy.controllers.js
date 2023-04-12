// Imports 
const { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy } = require('../services/buddy.services');
const { sendResponse } = require('../utils/response');
const RESPONSES = require('../constants/buddyResponse.constants');
const STATUS = require('../constants/status.constants');
const { logger } = require('../logger');
const STATUS_CODES = require('../constants/statusCodes.constants');


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
    const statusCode = result.length > 0 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
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
            return sendResponse(res, RESPONSES.NOT_VALID_ID, STATUS_CODES.BAD_REQUEST);
        }

        if (buddyData.realName === "" || buddyData.nickName === "" || !buddyData.dob === "" || !buddyData.hobbies === "") {
            return sendResponse(res, RESPONSES.MISSING_FIELDS, STATUS_CODES.BAD_REQUEST);
        }

        // Pass data to the service
        const err = createBuddy(buddyData);

        if (err) {
            return sendResponse(res, err, STATUS_CODES.BAD_REQUEST);
        }
        return sendResponse(res, RESPONSES.CREATED_SUCCESS, STATUS_CODES.CREATED);

    } catch (err) {
        logger.log('error', err.message, "Buddy Controller");
        return sendResponse(res, err.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};

const buddyUpdateController = (req, res) => {

    // Prepare data from body and path parameter
    const employeeId = parseInt(req.params.id);
    const newData = req.body;

    // Data validation
    if (isNaN(employeeId)) {
        return sendResponse(res, RESPONSES.NOT_VALID_ID, STATUS_CODES.BAD_REQUEST);
    }

    // Handle data in service
    const err = updateBuddy(employeeId, newData);

    if (err) {
        return sendResponse(res, err, STATUS_CODES.BAD_REQUEST);
    }

    return sendResponse(res, RESPONSES.UPDATED_SUCCESS);
};

const buddyDeleteController = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            status: STATUS.FAILED,
            message: RESPONSES.NOT_VALID_ID
        })
    }
    const err = deleteBuddy(parseInt(id));
    if (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            status: STATUS.FAILED,
            message: err
        })
    }

    return res.status(200).json({
        status: STATUS.SUCCESS,
        message: RESPONSES.DELETED_SUCCESS
    });
};

module.exports = { buddyGetController, buddyGetAllController, buddyCreateController, buddyUpdateController, buddyDeleteController };

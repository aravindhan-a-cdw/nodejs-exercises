// Imports 
const { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy } = require('../services/buddy.services');


const buddyGetAllController = (req, res) => {
    res.json(getAllBuddies());
};

const buddyGetController = (req, res) => {
    const idOrName = req.params.id;
    let result = null;

    if(!isNaN(idOrName)) {
        result = getBuddy(parseInt(idOrName));
    } else {
        result = getBuddy(null, idOrName);
    }
    const statusCode = result.length > 0 ? 200: 404;
    res.status(statusCode).json(result);
};

const buddyCreateController = (req, res) => {
    try{
        const buddyData = {
            ...req.body,
            employeeId: parseInt(req.body.employeeId)
        }
        const err = createBuddy(buddyData);
        if(err) {
            return res.status(400).json({
                status: "failed",
                message: err
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Buddy added successfully!"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
};

const buddyUpdateController = (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        return res.status(400).json({
            status: "failed",
            message: "EmployeeId is not valid!"
        })
    }
    const err = updateBuddy(parseInt(id), req.body);
    if(err) {
        return res.status(400).json({
            status: "failed",
            message: err
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Buddy updated successfully!"
    });
};

const buddyDeleteController = (req, res) =>{
    const id = req.params.id;
    if(isNaN(id)) {
        return res.status(400).json({
            status: "failed",
            message: "EmployeeId is not valid!"
        })
    }
    const err = deleteBuddy(parseInt(id));
    if(err) {
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

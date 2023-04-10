const { response } = require("express");
const { ERRORS, STATUS_CODES, REQUEST_STATUS } = require("../constants/response.constants");
const { getAllTasks, getATask, saveTask, deleteTask, updateTask } = require("../services/task.services");
const HTTPError = require("../utils/error_utils/HTTPError");

const taskGetAllController = async (req, res, next) => {
    try{
        const OPTIONS = {
            sort: req.query.sort,
            offset: parseInt(req.query.offset) || 0,
            limit: parseInt(req.query.limit) || 5
        }
    
        const FILTERS = {};

        for(const key in req.query) {
            if(!(key in OPTIONS)){
                FILTERS[key] = req.query[key];
            }
        }
        
        OPTIONS["filters"] = FILTERS;

        const tasks = await getAllTasks(req.user.id, OPTIONS);
        res.status(STATUS_CODES.OK).send({
            status: REQUEST_STATUS.SUCCESS,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}

const taskGetController = async (req, res, next) => {
    try {
        const task = await getATask(req.params.task_id, req.user.id);
        res.status(STATUS_CODES.OK).send({
            status: REQUEST_STATUS.SUCCESS,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

const taskPostController = async (req, res, next) => {
    try{
        // Get and validate the task data
        const TASK_DATA = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            comments: req.body.comments
        }
        for(const key of Object.keys(TASK_DATA)) {
            if(TASK_DATA[key] === undefined || TASK_DATA[key] === "") {
                throw new HTTPError(key + " is a required field", ERRORS.VALIDATION_ERROR, STATUS_CODES.BAD_REQUEST);
            }
        }
        const task = await saveTask(TASK_DATA, req.user.id);

        res.status(STATUS_CODES.CREATED).json({
            status: REQUEST_STATUS.SUCCESS,
            message: "Task Created Successfully",
            data: task
        })

    } catch (error) {
        next(error);
    }
}

const taskPutController = async (req, res, next) => {
    try{
        const TASK_DATA = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            comments: req.body.comments
        }
        Object.keys(TASK_DATA).forEach(key => TASK_DATA[key] === undefined && delete TASK_DATA[key])

        const task = await updateTask(req.params.task_id, TASK_DATA, req.user.id);
        res.status(STATUS_CODES.OK).send({
            status: REQUEST_STATUS.SUCCESS,
            data: task
        });
    } catch(error) {
        next(error);
    }
}
const taskDeleteController = async (req, res, next) => {
    try{
        const task = await deleteTask(req.params.task_id, req.user.id);
        res.status(STATUS_CODES.OK).send({
            status: REQUEST_STATUS.SUCCESS,
            data: task
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    taskGetAllController,
    taskGetController,
    taskPostController,
    taskPutController,
    taskDeleteController
}
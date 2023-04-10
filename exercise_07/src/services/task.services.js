const {existsSync} = require('fs');
const {writeFile, readFile} = require('fs/promises');
const HTTPError = require('../utils/error_utils/HTTPError');
const {STATUS_CODES} = require('../constants/response.constants');
const TASKS_FILE_LOCATION = 'data/tasks.json';


// Get all tasks of the user with filtering, sorting and pagination
const getAllTasks = async (user_id, options) => {
    let tasks = {};
    if(existsSync(TASKS_FILE_LOCATION)){
        // Check if file exists and load data from file
        const FILEDATA = (await readFile(TASKS_FILE_LOCATION)).toString('utf-8');
        if(FILEDATA.length !== 0 && FILEDATA !== '{}'){
            tasks = JSON.parse(FILEDATA);
            if(!(tasks instanceof Object)){
                // If the parsed object is not of type Object then it is not expected
                throw new Error('Tasks File is in unexpected format.');
            }
        }
    }
    // Send message is no tasks is present
    if((tasks[user_id] instanceof Object && Object.keys(tasks[user_id]).length === 0 ) || tasks[user_id] === undefined){
        throw new HTTPError('No tasks found!', "NotFound", STATUS_CODES.NOT_FOUND);
    }

    let userTasks = Object.values(tasks[user_id]);
    // Filter tasks
    if(Object.keys(options.filters) !== 0){
        userTasks = userTasks.filter((task) => {
            // Flag to see if all filters satisfy
            let isValid = true;
            for(const filter in options.filters){
                if(typeof task[filter] === "string"){
                    isValid = isValid && task[filter].includes(options.filters[filter]);
                }else {
                    isValid = isValid && task[filter] == options.filters[filter];
                }
            }
            return isValid;
        });
    }
    // Sort tasks
    if(options.sort) {
        userTasks.sort((a, b) => {
            // Custom sorting function
            if(a[options.sort] === b[options.sort]) return 0;
            else if (a[options.sort] < b[options.sort]) return -1;
            return 1;
        });
    }
    // Paginate tasks
    userTasks = userTasks.slice(options.offset, options.offset + options.limit);
    // Show error in case of no tasks found
    if(userTasks.length === 0){
        throw new HTTPError('No task found!', "NotFound", STATUS_CODES.NOT_FOUND);
    }
    return userTasks;
}

// Get a single task of the user
const getATask = async (task_id, user_id) => {
    let tasks = {};
    if(existsSync(TASKS_FILE_LOCATION)){
        const FILEDATA = (await readFile(TASKS_FILE_LOCATION)).toString('utf-8');
        if(FILEDATA.length !== 0 && FILEDATA !== '{}'){
            tasks = JSON.parse(FILEDATA);
            if(!(tasks instanceof Object)){
                throw new Error('Tasks File is in unexpected format.');
            }
        }
        // Send error incase of no task found for the given id
        if(!(tasks[user_id] !== undefined && tasks[user_id][task_id] !== undefined)){
            throw new HTTPError("Task not found", "NotFound", STATUS_CODES.NOT_FOUND);
        }
    }
    // Return the task data
    return tasks[user_id][task_id];
}

const saveTask = async (task_data, user_id) => {
    let tasks = {};
    if(existsSync(TASKS_FILE_LOCATION)){
        // Load tasks data from file
        const FILEDATA = (await readFile(TASKS_FILE_LOCATION)).toString('utf-8');
        if(FILEDATA.length !== 0 && FILEDATA !== '{}'){
            tasks = JSON.parse(FILEDATA);
            if(!(tasks instanceof Object)){
                throw new Error('Tasks File is in unexpected format.');
            }
        }
    }
    // If user doesn't have any existing task then create one with the provided data
    if(tasks[user_id] === undefined || Object.keys(tasks[user_id]).length  === 0) {
        tasks[user_id] = {"0": task_data};
    }else {
        // Get the id of the last task and increment to get new id
        const task_id = parseInt((Object.keys(tasks[user_id])).pop()) +  1;
        tasks[user_id][task_id.toString()] = task_data;
    }

    // Write the updated task object to file
    await writeFile(TASKS_FILE_LOCATION, JSON.stringify(tasks, null, '\t'));

    // Return the last inserted task
    return tasks[user_id][Object.keys(tasks[user_id]).pop()];
}

// Update a task
const updateTask = async (task_id, task_data, user_id) => {
    let tasks = {};
    if(existsSync(TASKS_FILE_LOCATION)){
        const FILEDATA = (await readFile(TASKS_FILE_LOCATION)).toString('utf-8');
        if(FILEDATA.length !== 0 && FILEDATA !== '{}'){
            tasks = JSON.parse(FILEDATA);
            if(!(tasks instanceof Object)){
                throw new Error('Tasks File is in unexpected format.');
            }
        }
        if(!(tasks[user_id] !== undefined && tasks[user_id][task_id] !== undefined)){
            throw new HTTPError("Task not found", "NotFound", STATUS_CODES.NOT_FOUND);
        }
    }
    tasks[user_id][task_id] = {
        // Insert existing data
        ...tasks[user_id][task_id],
        // Overwrite with new data
        ...task_data
    }
    // Save to file and return
    await writeFile(TASKS_FILE_LOCATION, JSON.stringify(tasks, null, '\t'));
    return tasks[user_id][task_id];
}

// Delete a task
const deleteTask = async (task_id, user_id) => {
    let tasks = {};
    if(existsSync(TASKS_FILE_LOCATION)){
        const FILEDATA = (await readFile(TASKS_FILE_LOCATION)).toString('utf-8');
        if(FILEDATA.length !== 0 && FILEDATA !== '{}'){
            tasks = JSON.parse(FILEDATA);
            if(!(tasks instanceof Object)){
                throw new Error('Tasks File is in unexpected format.');
            }
        }
        // Send error if task with given id is not available
        if(!(tasks[user_id] !== undefined && tasks[user_id][task_id] !== undefined)){
            throw new HTTPError("Task not found", "NotFound", STATUS_CODES.NOT_FOUND);
        }
    }
    // Take copy of data and delete
    const task = tasks[user_id][task_id];
    delete tasks[user_id][task_id];
    // Write to file and send the deleted task
    await writeFile(TASKS_FILE_LOCATION, JSON.stringify(tasks, null, '\t'));
    return task;
}

module.exports = {
    getAllTasks, getATask, saveTask, updateTask, deleteTask
}
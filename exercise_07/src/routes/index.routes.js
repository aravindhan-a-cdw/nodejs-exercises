const authenticationRouter = require('./authentication.routes');
const taskRouter = require('./task.routes');
const userRouter = require('./user.routes');


module.exports = {
    authenticationRouter, taskRouter, userRouter
};

// 3rd Party Library imports
const express = require('express');
const cors = require('cors');
// Config imports
require('dotenv').config();
const {logger, loggerMiddleware} = require('./logger');
const corsOptions = require('../cors.json');
// Internal files imports
const taskRouter = require('./routes/task.routes');
const userRouter = require('./routes/user.routes');
const authenticationRouter = require('./routes/authentication.routes');
const authenticateUser = require('./middlewares/authentication.middlewares');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const HTTPError = require('./utils/error_utils/HTTPError');


const app = express();

// Add Middlewares
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors(corsOptions));
app.use(authenticateUser);


//Add routes
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use('/auth', authenticationRouter);


app.listen(process.env.PORT, () => {
    logger.info("Server is up and running in port " + process.env.PORT);
})

app.use(notFoundMiddleware);
app.use((error, req, res, next) => {
    console.log("Handling error");
    if(error instanceof HTTPError) {
        logger.info(error.json());
        res.status(error.statusCode).json({
            message: error.message,
            status: "failed"
        })
    } else if(error instanceof Error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
            status: "failed"
        })
    } else {
        logger.error(error);
        return res.status(500).json({
            message: "Server couldn't process your request!",
            status: "failed"
        });
    }
})

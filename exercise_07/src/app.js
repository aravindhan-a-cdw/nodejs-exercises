// 3rd Party Library imports
const express = require('express');
const cors = require('cors');

// Config imports
require('dotenv').config();
const corsOptions = require('./configs/cors.json');

// Internal files imports
const {logger, loggerMiddleware} = require('./logger');
const { authenticationRouter, taskRouter, userRouter } = require('./routes/index.routes');
const {authenticateUser} = require('./middlewares/authentication.middlewares');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');


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


// Middlewares to handle non existant paths and error handling
app.use(notFoundMiddleware);
app.use(errorHandler);

// Bind server to a port
app.listen(process.env.PORT, () => {
    logger.info("Server is up and running in port " + process.env.PORT);
})

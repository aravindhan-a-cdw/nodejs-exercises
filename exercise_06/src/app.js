const express = require('express');
const cors = require('cors');
const {logger, loggerMiddleware} = require('./logger');
const corsOptions = require('../cors.json');

require('dotenv').config();

const taskRouter = require('./routes/task.routes');

const app = express();

// Add Middlewares
app.use(loggerMiddleware);
app.use(cors(corsOptions));

app.use('/task', taskRouter);


app.listen(process.env.PORT, () => {
    logger.info("Server is up and running in port " + process.env.PORT);
})

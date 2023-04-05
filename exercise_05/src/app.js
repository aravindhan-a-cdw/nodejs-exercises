// Import
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const { logger, loggerMiddleware } = require('./logger');
const buddyRouter = require('./routes/buddy.routes');

require('dotenv').config();


const app = express();


// Set Middlewares
app.use(cors());
app.use(express.json());    // To Handle json data sent through body
app.use(express.urlencoded({extended: true}));  // To Handle form data as 
app.use(loggerMiddleware);

// Handle root path
app.get("/", (req, res) => {
    res.send("Welcome to CDW Buddies.");
});

// Handle buddy requests
app.use('/buddy', buddyRouter);

app.listen(process.env.PORT, () => {
    // Create file on start of server
    fs.writeFileSync(process.env.BUDDIES_FILE_NAME, '[]');
    logger.log('info', `Server running on http://127.0.0.1:${process.env.PORT}`);
});
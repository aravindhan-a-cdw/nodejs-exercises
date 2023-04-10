const app = require('./app');
const {logger} = require('./logger');
require('dotenv').config();

// Bind server to a port
app.listen(process.env.PORT, () => {
    logger.info("Server is up and running in port " + process.env.PORT);
})
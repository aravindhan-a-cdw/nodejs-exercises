// Imports
const http = require('http');
const morgan = require('morgan');

const {randomColorRequestHandler} = require('./services/random-color-palette');

// Configurations
const PORT = 4000;

// Create a server and add event listeners
const server = http.createServer();
const logger = morgan('dev');

// server.on('request', (stream) => {
//     console.log("Request:", stream.method, stream.url)
// });

server.listen(PORT, () => {
    console.log(`Server Listening on http://127.0.0.1:${PORT}`);
});


// Handle Request
server.on('request', (req, res) => {

    logger(req, res, function (err) {

        if(req.url === '/random-color-palette') {
            return randomColorRequestHandler(req, res);
        }
        res.writeHead(404, {
            'Content-Type': 'text/plain',
        })

        res.end("Method or path does not exists");

    })


})
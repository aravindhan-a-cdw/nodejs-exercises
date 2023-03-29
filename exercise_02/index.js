// Imports
const http = require('http');
const {randomColorRequestHandler} = require('./services/random-color-palette');

// Configurations
const PORT = 4000;

// Create a server and add event listeners
const server = http.createServer();

server.on('request', (stream) => {
    console.log("Request:", stream.method, stream.url)
});

server.listen(PORT, () => {
    console.log(`Server Listening on http://127.0.0.1:${PORT}`);
});


// Handle Request
server.on('request', (req, res) => {
    if(req.url === '/random-color-palette') {
        try {
            return randomColorRequestHandler(req, res);
        } catch (err) {
            console.error(err.message);
            res.statusCode = 500;
            res.end("500: Server Unable to process your request.");
        }
    }
    res.end("Method or path does not exists");
})
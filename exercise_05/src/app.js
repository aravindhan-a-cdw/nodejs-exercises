// Import
const express = require('express');
const fs = require('fs');
const buddyRouter = require('./routes/buddy.routes');

const PORT = 4000;
const app = express();

// Set Middlewares
app.use(express.json());    // To Handle json data sent through body
app.use(express.urlencoded({extended: true}));  // To Handle form data as 

app.get("/", (req, res) => {
    res.send("Welcome to CDW Buddies.");
});

app.use('/buddy', buddyRouter);

app.listen(PORT, () => {
    // Create file on start
    fs.writeFileSync('files/cdw_ace23_buddies.json', '');

    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
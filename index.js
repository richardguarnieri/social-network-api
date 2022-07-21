const express = require('express');
const routes = require('./routes');
const connection = require('./config/connection')

// creates an express application
const app = express();
const port = process.env.PORT || 3001;

// express middleware
app.use(express.urlencoded()); // parses incoming urlencoded payloads - strings / arrays
app.use(express.json()); // parses incoming json
app.use(routes)

// starts mongoose connection and if successfull, starts the express web server
const init = async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Web Server listening on port: 3001`);
        })
    } catch (err) {
        console.log(err.message)
    }
};

init();
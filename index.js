const express = require('express');
const connection = require('./config/connection')

// creates an express application
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('hello world')
})

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
}

init();
const express = require('express');
const mongoose = require('./config/connection')
const app = express();

const port = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.send('hello world')
})


const init = async () => {
    app.listen(port, () => {
        console.log(`Web Server listening on port: 3001`);
    })
}

init();
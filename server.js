'use strict';

const express = require('express');
const logger = require('heroku-logger')
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const jwt = require('jsonwebtoken');
const route = require('./src/routes.js')



// Prepare the express app
const app = express();

// App Level MW
app.use(express.json());
app.use(route);



module.exports = {
    server:app,
    start: port =>{
        const PORT = port || process.env.PORT || 3000;
        app.listen(PORT,  () => 
        logger.info(`Listening on ${PORT}`));
    }
}
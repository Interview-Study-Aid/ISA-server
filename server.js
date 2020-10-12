'use strict';

const cors = require('cors');
const express = require('express');
require('dotenv').config();
const logger = require('heroku-logger')

// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const jwt = require('jsonwebtoken');
const route = require('./src/routes.js')



// Prepare the express app
const app = express();

// App Level MW
app.use(express.json());
app.use(cors());
app.use(route);



module.exports = {
    server:app,
    start: port =>{
        const PORT = port || process.env.PORT || 3000;
        app.listen(PORT,  () => 
        logger.info(`Listening on ${PORT}`));
    }
}
'use strict';
let setupAllTables = require('./util/table.js');
require('dotenv').config();

setupAllTables();
require('./server.js').start(process.env.PORT);

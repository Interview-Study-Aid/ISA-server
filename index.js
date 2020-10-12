'use strict';
let setupAllTables = require('./util/table.js');

setupAllTables();
require('./server.js').start(process.env.PORT);

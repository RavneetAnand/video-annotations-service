'use strict';

const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require('mysql2');

const routes = require('../api/routes');
const Service = require('./plugins/books')

/**
 * Connect to Mysql server.
 * @param  {Object} options contains database related details.
 * @returns {Object} options The options updated with connectionsPool
 */
const connectToMySqlServer = async(options) => {
    const config = {
        host: options.db_mysql_server.host,
        port: options.db_mysql_server.port,
        user: options.db_mysql_server.user,
        password: options.db_mysql_server.password,
        database: options.db_mysql_server.database
    };
    await mysql.createConnection(config);
    const pool = mysql.createPool(config);
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    await promisePool.query('select 1');
    console.log('Connected to the MySQL server.');
    options.db_mysql_server.connection = promisePool;
};

/**
 * Start the microservice.
 * @param {*} options Object containing details of the service.
 */
const startService = (options) => {
    app.use(express.json());
    app.use(cors());
    routes(app);
    app.listen(options.service.port, () => {
        console.log('Server listening on the port: ' + options.service.port);
    });
}

/**
 * Handle the tasks to be performed on service start.
 * @param options Object containing details of the service.
 * @returns {Promise<void>}
 */
async function start(options) {
    await connectToMySqlServer(options);
    Service(options);
    return startService(options);
}

//Error handling code within middleware
process.on('uncaughtException', function(error) {
    if (!error.isOperational) {
        throw error;
    }
});

// Prepare the configuration object for the service and the connected database.
let config = {
    db_mysql_server: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'admin',
        database: 'dbo'
    },
    service: {
        host: '0.0.0.0',
        type: 'http',
        port: process.env.PORT || 3903,
        protocol: 'http'
    }
};

start(config);
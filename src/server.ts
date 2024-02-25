'use strict';

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

import { routes } from '../api/routes';
import { playersService } from './plugins/players';
import { Pool } from 'mysql2/promise';

export type Options = {
  db_mysql_server: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connection?: Pool;
  };
  service: {
    host: string;
    type: string;
    port: number;
    protocol: string;
  };
};

const app = express();

/**
 * Connect to Mysql server.
 * @param  {Object} options contains database related details.
 * @returns {Object} options The options updated with connectionsPool
 */
const connectToMySqlServer = async (options: Options) => {
  const config = {
    host: options.db_mysql_server.host,
    port: options.db_mysql_server.port,
    user: options.db_mysql_server.user,
    password: options.db_mysql_server.password,
    database: options.db_mysql_server.database,
  };

  // Create the connection to database
  try {
    mysql.createConnection(config);

    const pool = mysql.createPool(config);

    // Get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    await promisePool.query('select 1');

    console.log('Connected to the MySQL server.');
    options.db_mysql_server.connection = promisePool;
  } catch (err: any) {
    console.error('Error connecting to MySQL server' + err.message);
  }
};

/**
 * Start the microservice.
 * @param {*} options Object containing details of the service.
 */
const startService = (options: Options) => {
  try {
    app.use(express.json());
    app.use(cors());

    routes(app);

    app.listen(options.service.port, () => {
      console.log('Server listening on the port: ' + options.service.port);
    });
  } catch (err: any) {
    console.error('Error starting the service' + err.message);
  }
};

/**
 * Handle the tasks to be performed on service start.
 * @param options Object containing details of the service.
 * @returns {Promise<void>}
 */
async function start(options: Options) {
  // await connectToMySqlServer(options);

  playersService(options);

  return startService(options);
}

//Error handling code within middleware
process.on('uncaughtException', (error: any) => {
  if (!error.isOperational) {
    throw error;
  }
});

// Prepare the configuration object for the service and the connected database.
let config = {
  db_mysql_server: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'dbo',
  },
  service: {
    host: '0.0.0.0',
    type: 'http',
    port: parseInt(process.env.PORT || '') || 3903,
    protocol: 'http',
  },
};

start(config);

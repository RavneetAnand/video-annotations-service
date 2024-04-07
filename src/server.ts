import express from 'express';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import sqlite from 'sqlite3';

import { routes } from '../api/routes';
import { videoAnnotationService } from './plugins/videoAnnotations';
import { createTables } from './utils/database';

export type Options = {
  service: {
    host: string;
    type: string;
    port: number;
    protocol: string;
  };
  database: sqlite.Database;
};

const { Database } = sqlite;

const app = express();

/**
 * Start the microservice.
 * @param {*} options Object containing details of the service.
 */
const startService = (options: Options) => {
  try {
    app.use(express.json());
    app.use(cors());
    app.use(
      expressjwt({
        secret: 'your_secret_key',
        algorithms: ['HS256'],
      }).unless({
        path: ['/authenticate'],
      }),
    );

    routes(app);

    app.listen(options.service.port, () => {
      console.log('Server listening on the port: ' + options.service.port);
    });
  } catch (err: any) {
    console.error('Error starting the service' + err.message);
  }
};

// Connect to SQLite database
const db = new Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
    createTables(db);
  }
});

/**
 * Handle the tasks to be performed on service start.
 * @param options Object containing details of the service.
 * @returns {Promise<void>}
 */
async function start(options: Options) {
  videoAnnotationService(options);

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
  service: {
    host: '0.0.0.0',
    type: 'http',
    port: parseInt(process.env.PORT || '') || 8000,
    protocol: 'http',
  },
  database: db,
};

start(config);

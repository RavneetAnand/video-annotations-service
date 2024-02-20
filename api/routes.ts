import { Express } from 'express';

const controller = require('./controller');

export const routes = (app: Express) => {
  // URL to authenticate a user.
  app.post('/authenticate', controller.authenticateUser);
  // URL to get the data from the API.
  app.get('/getplayers', controller.getplayers);
};

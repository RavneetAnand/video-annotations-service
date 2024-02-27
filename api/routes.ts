import { Express } from 'express';
import controller from './controller';

export const routes = (app: Express) => {
  // URL to authenticate a user.
  app.post('/authenticate', controller.authenticateUser);
  // URL to get the data from the API.
  app.post('/getplayers', controller.playersByTeam);
  // URL to get the teams from the API.
  app.get('/teams', controller.teams);
};

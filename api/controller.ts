import { playersService as service } from '../src/plugins/players';

const { authenticateUser, getPlayersListByTeams, getTeams } = service();

let controllers = {
  authenticateUser: async (
    req: { body: { username: string; password: string } },
    res: { json: (arg0: { accessToken: string }) => void },
  ) => {
    try {
      const data = await authenticateUser(req.body);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },
  teams: async (req: any, res: any) => {
    try {
      const data = await getTeams();
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },
  playersByTeam: async (req: any, res: any) => {
    // Validate the request body has valid array of team names
    if (!req.body || !Array.isArray(req.body.teams)) {
      res.status(400).send('Invalid request');
      return;
    }

    try {
      const data = await getPlayersListByTeams(req.body.teams);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },
};

export default controllers;

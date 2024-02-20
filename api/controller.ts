import { playersService as service } from '../src/plugins/players';

const { authenticateUser, getplayersList } = service();

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
  getplayers: async (_: any, res: any) => {
    try {
      const data = await getplayersList();
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },
};

module.exports = controllers;

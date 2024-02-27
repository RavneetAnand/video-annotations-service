import request from 'supertest';

const app = 'http://localhost:3903';
const agent = request(app);

describe('GET: getplayers', () => {
  it('should return the players from the teams', async () => {
    const response = await agent.post('/getplayers').send({
      teams: [1, 2],
    });

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it("should fail when the body doesn't has the right format", async () => {
    const response = await agent.post('/getplayers').send({
      teamsList: [1, 2],
    });

    expect(response.status).toEqual(400);
    expect(response.text).toEqual('Invalid request');
  });
});

describe('GET: teams', () => {
  it('should return the teams', async () => {
    const response = await agent.get('/teams');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(6);
  });
});

describe('POST: authenticate', () => {
  it('authenticate the user', async () => {
    const response = await agent
      .post('/authenticate')
      .send({ username: 'test', password: 'test' });
    expect(response.status).toEqual(200);
    expect(JSON.stringify(response.body)).toContain('validated');
  });

  it('authenticate the user', async () => {
    const response = await agent
      .post('/authenticate')
      .send({ username: undefined, password: 'test' });
    expect(response.status).toEqual(200);
    expect(response.body.accessToken).toEqual('');
  });

  it('authenticate the user', async () => {
    const response = await agent.post('/authenticate').send({});
    expect(response.status).toEqual(200);
    expect(response.body.accessToken).toEqual('');
  });
});

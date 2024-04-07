import request from 'supertest';

const app = 'http://localhost:8000';
const agent = request(app);

describe('POST: authenticate', () => {
  it('authenticate the user', async () => {
    const response = await agent
      .post('/authenticate')
      .send({ username: 'test', password: 'test' });
    expect(response.status).toEqual(200);
    expect(JSON.stringify(response.body)).toBeDefined();
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

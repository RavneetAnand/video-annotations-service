import request from 'supertest';
import { expect } from 'chai';

const app = 'http://localhost:3903';
const agent = request(app);

describe('GET: getplayers', () => {
  it('returns all players', async () => {
    const response = await agent.get('/getplayers');
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(50);
  });
});

describe('POST: authenticate', () => {
  it('authenticate the user', async () => {
    const response = await agent
      .post('/authenticate')
      .send({ username: 'test', password: 'test' });
    expect(response.status).to.equal(200);
    expect(JSON.stringify(response.body)).to.contain('validated');
  });
});

describe('POST: authenticate', () => {
  it('authenticate the user', async () => {
    const response = await agent
      .post('/authenticate')
      .send({ username: undefined, password: 'test' });
    expect(response.status).to.equal(200);
    expect(response.body.accessToken).to.equal('');
  });
});

describe('POST: authenticate', () => {
  it('authenticate the user', async () => {
    const response = await agent.post('/authenticate').send({});
    expect(response.status).to.equal(200);
    expect(response.body.accessToken).to.equal('');
  });
});

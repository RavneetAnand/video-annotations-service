const request = require('supertest')('http://localhost:3903');
const expect = require('chai').expect;

describe('GET: getBooks', () => {
    it('returns all books', async () => {
        const response = await request.get('/getBooks');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(50);
    });
});

describe('POST: authenticate', () => {
    it('authenticate the user', async () => {
        const response = await request.post('/authenticate').send({username : 'test', password: 'test'});
        expect(response.status).to.equal(200);
        expect(JSON.stringify(response.body)).to.contain('validated');
    });
});

describe('POST: authenticate', () => {
    it('authenticate the user', async () => {
        const response = await request.post('/authenticate').send({username : undefined, password: 'test'});
        expect(response.status).to.equal(200);
        expect(response.body.accessToken).to.equal('');
    });
});

describe('POST: authenticate', () => {
    it('authenticate the user', async () => {
        const response = await request.post('/authenticate').send({});
        expect(response.status).to.equal(200);
        expect(response.body.accessToken).to.equal('');
    });
});
const request = require('supertest')('http://localhost:3903');
const expect = require('chai').expect;

describe('GET: getBooks', () => {
    it('returns all books', async () => {
        const response = await request.get('/getBooks');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(50);
    });
});
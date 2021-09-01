'use strict';

const controller = require('./controller');

module.exports = function(app) {
    // URL to authenticate a user.
    app.post('/authenticate', controller.authenticateUser);
    // URL to get the data from the API.
    app.get('/getBooks', controller.getBooks);
};
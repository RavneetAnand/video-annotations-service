'use strict';

let service = require('../src/plugins/books');

let controllers = {
    authenticateUser: async(req, res) => {
        try {
            const data = await service().authenticateUser(req.body);
            res.json(data);
        } catch (err) {
            console.error(err.message);
        }
    },
    getBooks: async (req, res) => {
        try {
            const data = await service().getBooksList();
            res.json(data);
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = controllers;
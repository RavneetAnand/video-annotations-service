'use strict';

let dbConnection;

/**
 * Run the provided query on MySQL database.
 * @param {String} query Query to be run on the database.
 * @returns The result after the query run.
 */
const query = async(query) => {
    let result;
    try {
        const request = await dbConnection;
        result = await request.query(query);
    } catch (err) {
        throw err;
    }
    return result;
};

module.exports = (options) => {
    dbConnection = options.db_mysql_server.connection;
    return {
        query: query
    };
};
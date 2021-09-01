'use strict';
//#region Define locale
const {performance} = require('perf_hooks');
const queries = require('../utils/queries');
let mysql_request;
//#endregion Define locale

/**
 * Provide token after the user validation.
 * @param {*} message It contains the parameters sent to the method.
 * @returns Token authentication.
 */
const authenticateUser = async(message) => {
    let token = '';
    if(message?.username === 'test' && message?.password === 'test') {
        token = 'user-validated';
    }
    return {accessToken: token};
}

//#region Get data
/**
 * Get the books list from database.
 * @returns Data object list of the books.
 */
const getBooksList = async() => {
    let data;
    try {
        console.log(`START - Fetch data from the database at - ${new Date().toUTCString()}`);
        const start = performance.now();
        data = await mysql_request.query(queries.get_books);
        const end = performance.now();
        console.log(`END - Fetched data from the database in - ${(end - start)} ms`);
    } catch (err) {
        console.error('Could not fetch the books list' - err.message);
    }
    return data[0];
}
//#endregion Get data


module.exports = (options) => {
    if(typeof options !== undefined) {
        mysql_request = mysql_request? mysql_request : require('../utils/mysql_request')(options);
    }
    return {
        getBooksList: getBooksList,
        authenticateUser: authenticateUser
    }
}
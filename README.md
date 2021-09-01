# Books service

============================

Books microservice runs on Port number - 3903

## Books

Books supports the following operations :

- ### getBooksList
#### Description : Get the books list from the database. This method is called from the API route "/getBooks".

- ### authenticateUser
#### Description : Provide token after the user validation. This method is called from the API route "/authenticate".

- ### Database configuration
It can be set in the file server.js.

- ### API
URLs to fetch data are defined in the file api/routes.js

### `npx mocha books.test.js`
Launches the test runner in the interactive watch mode using mocha plugin.
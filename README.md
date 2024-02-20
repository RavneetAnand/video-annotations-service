# Players service

============================

Players microservice runs on Port number - 3903

## players

players supports the following operations :

- ### getplayersList

#### Description : Get the players list from the database. This method is called from the API route "/getplayers".

- ### authenticateUser

#### Description : Provide token after the user validation. This method is called from the API route "/authenticate".

- ### Database configuration

  It can be set in the file server.js.

- ### API
  URLs to fetch data are defined in the file api/routes.js

### `npx mocha players.test.js`

Launches the test runner in the interactive watch mode using mocha plugin.

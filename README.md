# Players service

============================

## Getting Started

### Prerequisites

To install the software, you will need the following:

Node.js and npm:
You can install the latest version of npm globally by running the command `npm install npm@latest -g`.
You can install Node.js using nvm (Node Version Manager) by running `nvm install v20`.

### Installation

First, run the server:

```bash
npm run start
```

Players microservice runs on Port number - 3903

## Players-service

This service serves as the backend for the project data-duel. Providing it with the data required such as teams list and the players by the teams identifiers.

Players service supports the following operations:

- ### authenticateUser

#### Description : Provide token after the user validation. This method is called from the API route "/authenticate".

- ### getPlayersListByTeams

#### Description : Get the players list from the database by team identifiers. This method is called from the API route "/playersByTeam". Body should contain an object in below format:

```bash
{
  "teams": [
    1, // identifier team 1
    2 // identifier team 2
  ]
}
```

- ### teams

#### Description : Get the list of teams from the database.

### Data-model

Data model for the app can be found in the file `src/data/dataModel.txt`.

### Database configuration

It can be set in the file `server.ts`.
However, for the ease of use in experimental project. Data meant for the mySQL has been kept in the json files with due relation between them explained in the file `src/data/dataModel.txt`.

### API

URLs to fetch data are defined in the file api/routes.ts.

### `npm run test`

Launches the test runner.

import { Options } from '../server';
import { mySqlRequest } from './../utils/mySqlRequest';

let mySqlQuery;

/**
 * Provide token after the user validation.
 * @param {*} message It contains the parameters sent to the method.
 * @returns Token authentication.
 */
const authenticateUser = (message: { username: string; password: string }) => {
  let token = '';
  if (message?.username === 'test' && message?.password === 'test') {
    token = 'user-validated';
  }
  return { accessToken: token };
};

/**
 * Get the players list from database.
 * @returns Data object list of the players.
 */
const getplayersList = async () => {
  let data;
  try {
    console.log(
      `START - Fetch data from the database at - ${new Date().toUTCString()}`,
    );

    console.log(
      `END - Fetched data from the database at - ${new Date().toUTCString()}`,
    );
  } catch (err: any) {
    console.error('Could not fetch the players list' + err.message);
  }
  return data;
};

export const playersService = (options?: Options) => {
  if (options !== undefined) {
    [({ query: mySqlQuery } = mySqlRequest(options))];
  }

  return {
    getplayersList,
    authenticateUser,
  };
};

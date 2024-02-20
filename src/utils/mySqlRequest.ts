import { Options } from '../server';

/**
 * Run the provided query on MySQL database.
 * @param {String} query Query to be run on the database.
 * @returns The result after the query run.
 */

export const mySqlRequest = (options: Options) => {
  let dbConnection = options.db_mysql_server.connection;
  return {
    query: async (query: string) => {
      let result;
      try {
        const request = await dbConnection;
        result = await request?.query(query);
      } catch (err: any) {
        throw err;
      }
      return result;
    },
  };
};

import { Database } from 'sqlite3';

export const getAll = async (db: Database, query: string) => {
  return new Promise((resolve, reject) => {
    return db.all(query, (err: { message: any }, rows: unknown[]) => {
      if (err) {
        console.error('DB Error: Query failed: ', err.message);
        return reject(err.message);
      }

      return resolve(rows);
    });
  });
};

export const getByParams = async (db: Database, query: string, params: any) => {
  return new Promise((resolve, reject) => {
    return db.get(query, params, (err: { message: any }, row: unknown) => {
      if (err) {
        console.error('DB Error: Query failed: ', err.message);
        return reject(err.message);
      }

      return resolve(row);
    });
  });
};

export const insert = async (db: Database, query: string, row: any) => {
  return new Promise((resolve, reject) => {
    return db.run(query, row, (err: { message: any }) => {
      if (err) {
        console.error('DB Error: Insert failed: ', err.message);
        return reject(err.message);
      }

      return resolve(true);
    });
  });
};

export const updateOrDelete = async (
  db: Database,
  query: string,
  params: any,
) => {
  return new Promise((resolve, reject) => {
    return db.run(query, params, (err: { message: any }) => {
      if (err) {
        console.error('DB Error: operation failed: ', err.message);
        return reject(err.message);
      }

      return resolve(true);
    });
  });
};

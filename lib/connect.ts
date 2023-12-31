import mysql from "mysql2/promise";

import { QueryOptions } from "mysql2/promise";

export async function query({ sql, values = [] }: QueryOptions) {
  const db = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  try {
    const [results] = await db.execute(sql, values);
    db.end();
    return results;
  } catch (error: any) {
    return error.message;
  }
}

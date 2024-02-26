
import { createPool } from 'mysql2/promise';


// Create a MySQL connection pool
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'graphql_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
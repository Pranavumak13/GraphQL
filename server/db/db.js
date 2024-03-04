
// import { createPool } from 'mysql2/promise';
// Require the 'mysql2/promise' module
const { createPool } = require('mysql2/promise');


require('dotenv').config()


// Create a MySQL connection pool
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export the pool object
module.exports = { pool };

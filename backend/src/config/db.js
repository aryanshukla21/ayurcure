const { Pool } = require('pg');

// Pool configuration utilizes environment variables for security and deployment flexibility.
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,

    // Pool sizing and lifecycle management (adjust based on expected load and DB instance limits)
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if a connection cannot be established
});

// Critical: Catch and handle errors on idle clients to prevent Node.js process crashes
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    // Standard query execution leveraging the pool automatically
    query: (text, params) => pool.query(text, params),

    // acquire a dedicated client for transactions (BEGIN, COMMIT, ROLLBACK)
    getClient: () => pool.connect()
};
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Bootstrapping function
async function startServer() {
    try {
        // Test database connection pool
        const { rows } = await db.query('SELECT NOW() AS current_time');
        console.log(`Database Connected Successfully at: ${rows[0].current_time}`);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`AyurCure API Server actively listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize application. Database connection rejected:', error.message);
        process.exit(1); // Force exit if DB fails
    }
}

startServer();
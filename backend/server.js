require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

// Import routes and error handler
const indexRoutes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const { startOtpCleanupJob } = require('./src/utils/cronJobs');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', indexRoutes);

// Global Error Handler MUST be the last middleware
app.use(errorHandler);

// Bootstrapping function
async function startServer() {
    try {
        // Test database connection pool
        const { rows } = await db.query('SELECT NOW() AS current_time');
        console.log(`Database Connected Successfully at: ${rows[0].current_time}`);

        // FIX: Start background jobs (sweep expired OTPs)
        startOtpCleanupJob();
        console.log('Background Jobs Started Successfully');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`AyurCure API Server actively listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize application. Database connection rejected:', error.message);
        process.exit(1);
    }
}

startServer();
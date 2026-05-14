require('dotenv').config();
const express = require('express');
const path = require('path'); // FIX: Imported path to resolve local directories
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const db = require('./src/config/db');
const cookieParser = require('cookie-parser');

// Import routes and error handler
const indexRoutes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const { startOtpCleanupJob, startAppointmentSweepJob } = require('./src/utils/cronJobs');

const app = express();

// ==========================================
// 1. SECURITY & PERFORMANCE MIDDLEWARE
// ==========================================

// Helmet: Secures app by setting various HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false // FIX: Allows images to be loaded by the frontend
}));

// Dynamic CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('short'));
} else {
    app.use(morgan('dev'));
}

// ==========================================
// 2. RATE LIMITING
// ==========================================

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts, please try again later.' }
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// ==========================================
// 3. API ROUTES & STATIC FILES
// ==========================================

// FIX: Serve the uploads directory publicly so the frontend can read the images!
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', indexRoutes);

// Global Error Handler MUST be the last middleware
app.use(errorHandler);

// ==========================================
// 4. BOOTSTRAPPING
// ==========================================

async function startServer() {
    try {
        const { rows } = await db.query('SELECT NOW() AS current_time');
        console.log(`✅ Database Connected Successfully to Supabase at: ${rows[0].current_time}`);

        if (typeof startOtpCleanupJob === 'function') {
            startOtpCleanupJob();
            console.log('✅ Background Jobs Started Successfully');
        } else {
            console.warn('⚠️ startOtpCleanupJob is not a valid function. Check cronJobs.js export.');
        }

        if (typeof startAppointmentSweepJob === 'function') {
            startAppointmentSweepJob();
            console.log('✅ Appointment Sweep Job Started Successfully');
        } else {
            console.warn('⚠️ startAppointmentSweepJob is not a valid function. Check cronJobs.js export.');
        }

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 AyurCure API Server actively listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });
    } catch (error) {
        console.error('❌ Failed to initialize application. Database connection rejected:', error.message);
        process.exit(1);
    }
}

startServer();
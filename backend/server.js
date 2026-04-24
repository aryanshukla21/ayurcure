require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const db = require('./src/config/db');
const cookieParser = require('cookie-parser');

// Import routes and error handler
const indexRoutes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const { startOtpCleanupJob } = require('./src/utils/cronJobs');

const app = express();

// ==========================================
// 1. SECURITY & PERFORMANCE MIDDLEWARE
// ==========================================

// Helmet: Secures app by setting various HTTP headers (e.g., XSS Protection, NoSniff)
app.use(helmet());

// Dynamic CORS Configuration (Uses frontend URL from env or falls back to localhost)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Payload Limit: Prevents Denial of Service (DoS) attacks via massive JSON payloads
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Logging: Morgan (Verbose in Dev, minimal in Prod to prevent logging sensitive data)
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('short')); // Minimal logs
} else {
    app.use(morgan('dev')); // Colorful, detailed logs for local development
}

// ==========================================
// 2. RATE LIMITING
// ==========================================

// Global API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// Strict Auth/OTP Rate Limiter (Protects against brute-force attacks)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 15, // Limit each IP to 15 login/OTP requests per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts, please try again later.' }
});

// Apply rate limiters to respective routes
app.use('/api', apiLimiter); // Applies to all /api routes
app.use('/api/auth', authLimiter); // Overrides with stricter limit for auth routes

// ==========================================
// 3. API ROUTES & ERROR HANDLING
// ==========================================

app.use('/api', indexRoutes);

// Global Error Handler MUST be the last middleware
app.use(errorHandler);

// ==========================================
// 4. BOOTSTRAPPING
// ==========================================

async function startServer() {
    try {
        // Test database connection pool
        const { rows } = await db.query('SELECT NOW() AS current_time');
        console.log(`✅ Database Connected Successfully to Supabase at: ${rows[0].current_time}`);

        // Start background jobs safely (sweep expired OTPs)
        if (typeof startOtpCleanupJob === 'function') {
            startOtpCleanupJob();
            console.log('✅ Background Jobs Started Successfully');
        } else {
            console.warn('⚠️ startOtpCleanupJob is not a valid function. Check cronJobs.js export.');
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
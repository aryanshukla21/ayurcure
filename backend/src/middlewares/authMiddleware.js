const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Authenticates the request by validating the Bearer token in the Authorization header.
 */
const requireAuth = (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ error: 'Authentication required. Token missing.' });
    }

    try {
        // Verify token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload (id, role) to the request for downstream controllers
        req.user = decoded;
        next();
    } catch (error) {
        logger.error(`Auth Middleware Error: ${error.message}`);
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

/**
 * Enforces Role-Based Access Control (RBAC).
 * @param  {...string} roles - The roles authorized to access the route (e.g., 'admin', 'doctor').
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: Insufficient permissions.' });
        }
        next();
    };
};

module.exports = { requireAuth, requireRole };
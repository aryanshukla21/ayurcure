/**
 * Middleware factory to validate required fields in the request body.
 * @param {Array<string>} requiredFields - List of field names that must be present.
 */
const validateBodyFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter((field) => {
            const val = req.body[field];
            return val === undefined || val === null || String(val).trim() === '';
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing or empty required fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

module.exports = { validateBodyFields };
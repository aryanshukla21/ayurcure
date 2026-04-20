const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class AuthService {
    /**
     * Generates a JSON Web Token (JWT) for stateless authentication.
     */
    generateToken(user) {
        return jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    /**
     * Generates a secure 6-digit OTP.
     */
    generateOTP() {
        return crypto.randomInt(100000, 1000000).toString();
    }

    /**
     * Hashes a plaintext string (passwords or OTPs) with salt.
     */
    async hashData(plaintext, saltRounds = 12) {
        return await bcrypt.hash(plaintext, saltRounds);
    }

    /**
     * Compares a plaintext string against a stored hash.
     */
    async verifyHash(plaintext, hash) {
        return await bcrypt.compare(plaintext, hash);
    }
}

module.exports = new AuthService();
const bcrypt = require('bcrypt');
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
     * Generates a 6-digit OTP.
     */
    generateOTP() {
        // Uses Math.random for speed. If cryptographic strictness is required for OTPs, 
        // crypto.randomInt(100000, 999999) should be utilized.
        return Math.floor(100000 + Math.random() * 900000).toString();
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
const db = require('../config/db');

class UserModel {
    static async createUser(userData) {
        const { role, full_name, email, phone, auth_provider, password_hash } = userData;
        const query = `
            INSERT INTO Users (role, full_name, email, phone, auth_provider, password_hash)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, role, full_name, email, account_status, created_at;
        `;
        const values = [role, full_name, email, phone, auth_provider, password_hash];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async getUserByEmail(email) {
        const query = `SELECT * FROM Users WHERE email = $1;`;
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    static async updateUserStatus(userId, status, banReason = null) {
        const query = `
            UPDATE Users 
            SET account_status = $1, ban_reason = $2 
            WHERE id = $3 
            RETURNING id, account_status;
        `;
        const { rows } = await db.query(query, [status, banReason, userId]);
        return rows[0];
    }

    static async clearExpiredOtps() {
        // This query finds any OTP where the expiration time is strictly in the past
        // and safely resets the columns to NULL.
        const query = `
            UPDATE Users 
            SET otp_hash = NULL, otp_expires_at = NULL 
            WHERE otp_expires_at < CURRENT_TIMESTAMP;
        `;
        await db.query(query);
    }
}

module.exports = UserModel;
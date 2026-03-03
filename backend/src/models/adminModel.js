const db = require('../config/db');

class AdminModel {
    static async getDashboardStats() {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM Users WHERE role = 'patient') as total_patients,
                (SELECT COUNT(*) FROM Users WHERE role = 'doctor') as total_doctors,
                (SELECT COUNT(*) FROM Appointments WHERE status = 'Completed') as total_consultations,
                (SELECT COALESCE(SUM(total_amount), 0) FROM Orders WHERE payment_status = 'Paid') as total_ecommerce_revenue
        `;
        const { rows } = await db.query(query);
        return rows[0];
    }

    static async getAllUsers(filters = {}) {
        let query = `SELECT id, role, full_name, email, phone, account_status, created_at FROM Users WHERE 1=1`;
        const values = [];

        if (filters.role) {
            values.push(filters.role);
            query += ` AND role = $${values.length}`;
        }
        if (filters.status) {
            values.push(filters.status);
            query += ` AND account_status = $${values.length}`;
        }

        query += ` ORDER BY created_at DESC;`;
        const { rows } = await db.query(query, values);
        return rows;
    }

    static async updateUserStatus(userId, status, reason) {
        const query = `
            UPDATE Users 
            SET account_status = $1, ban_reason = $2 
            WHERE id = $3 
            RETURNING id, full_name, email, account_status;
        `;
        const { rows } = await db.query(query, [status, reason, userId]);
        return rows[0];
    }

    static async getPendingDoctorApplications() {
        const query = `
            SELECT d.id, u.full_name, u.email, d.qualifications, d.registration_number, d.specialization, d.experience_years
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            WHERE d.verification_status = 'Pending'
            ORDER BY u.created_at ASC;
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async verifyDoctor(doctorId, adminId, status, comments) {
        const query = `
            UPDATE DoctorProfiles 
            SET verification_status = $1, verified_by_admin_id = $2, admin_comments = $3
            WHERE id = $4
            RETURNING *;
        `;
        const { rows } = await db.query(query, [status, adminId, comments, doctorId]);
        return rows[0];
    }

    static async logAction(logData) {
        const { admin_id, action_type, target_entity_id, details } = logData;
        const query = `
            INSERT INTO AdminActionLogs (admin_id, action_type, target_entity_id, details)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [admin_id, action_type, target_entity_id, details]);
        return rows[0];
    }

    static async createPayout(payoutData) {
        const { doctor_id, period_start, period_end, total_consultations, amount_due } = payoutData;
        const query = `
            INSERT INTO Payouts (doctor_id, period_start, period_end, total_consultations, amount_due)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [doctor_id, period_start, period_end, total_consultations, amount_due]);
        return rows[0];
    }

    static async createBannerCampaign(campaignData) {
        const { title, image_url, target_link, type, status, start_date, end_date, created_by } = campaignData;
        const query = `
            INSERT INTO BannerCampaigns (title, image_url, target_link, type, status, start_date, end_date, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [title, image_url, target_link, type, status, start_date, end_date, created_by];
        const { rows } = await db.query(query, values);
        return rows[0];
    }
}

module.exports = AdminModel;
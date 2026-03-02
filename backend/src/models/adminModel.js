const db = require('../config/db');

class AdminModel {
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
}

module.exports = AdminModel;
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

    // --- DOCTOR MANAGEMENT ---
    static async getAllDoctors() {
        const query = `
            SELECT d.id, u.full_name, u.email, u.phone, d.specialization, d.verification_status, d.experience_years
            FROM DoctorProfiles d
            JOIN Users u ON d.user_id = u.id
            ORDER BY u.created_at DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
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

    // --- ORDER MANAGEMENT ---
    static async getAllOrders() {
        const query = `
            SELECT o.id, o.total_amount, o.order_status, o.payment_status, o.created_at, u.full_name as customer_name
            FROM Orders o
            JOIN Users u ON o.user_id = u.id
            ORDER BY o.created_at DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    // --- BLOG MANAGEMENT ---
    static async createBlog(adminId, { title, content, image_url, tags }) {
        const query = `
            INSERT INTO Blogs (author_id, title, content, image_url, tags, published_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [adminId, title, content, image_url, JSON.stringify(tags)]);
        return rows[0];
    }

    static async getAllBlogs() {
        const query = `SELECT * FROM Blogs ORDER BY published_at DESC;`;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getBlogById(blogId) {
        const query = `SELECT * FROM Blogs WHERE id = $1;`;
        const { rows } = await db.query(query, [blogId]);
        return rows[0];
    }

    static async updateBlog(blogId, { title, content, image_url, tags }) {
        const query = `
            UPDATE Blogs 
            SET title = COALESCE($1, title),
                content = COALESCE($2, content),
                image_url = COALESCE($3, image_url),
                tags = COALESCE($4, tags),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *;
        `;
        const { rows } = await db.query(query, [title, content, image_url, JSON.stringify(tags), blogId]);
        return rows[0];
    }

    static async deleteBlog(blogId) {
        const query = `DELETE FROM Blogs WHERE id = $1 RETURNING id;`;
        const { rows } = await db.query(query, [blogId]);
        return rows[0];
    }

    // --- REPORTS & ANALYTICS ---
    static async getRevenueChartData() {
        const query = `
            SELECT 
                to_char(date_trunc('month', created_at), 'Mon') as month,
                SUM(total_amount) as revenue
            FROM Orders
            WHERE payment_status = 'Paid' AND created_at >= CURRENT_DATE - INTERVAL '6 months'
            GROUP BY date_trunc('month', created_at)
            ORDER BY date_trunc('month', created_at) ASC;
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    // --- UTILITIES ---
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
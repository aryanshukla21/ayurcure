const db = require('../config/db');

class AppointmentModel {
    /**
     * Creates a new appointment, checking for time slot conflicts for the specific doctor.
     */
    static async bookAppointment({ patient_id, doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint }) {
        const checkConflictQuery = `
            SELECT id FROM Appointments 
            WHERE doctor_id = $1 
            AND status != 'Cancelled'
            AND scheduled_at = $2;
        `;
        const existing = await db.query(checkConflictQuery, [doctor_id, scheduled_at]);
        if (existing.rows.length > 0) {
            throw new Error('COLLISION');
        }

        const query = `
            INSERT INTO Appointments (patient_id, doctor_id, scheduled_at, mode, status, pre_consultation_symptoms, chief_complaint)
            VALUES ($1, $2, $3, $4, 'Pending', $5, $6)
            RETURNING *;
        `;
        const values = [patient_id, doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    /**
     * Updates the status of an appointment (e.g., 'Pending', 'Confirmed', 'Completed', 'Cancelled').
     */
    static async updateStatus(appointmentId, status) {
        const query = `
            UPDATE Appointments 
            SET status = $1 
            WHERE id = $2 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [status, appointmentId]);
        return rows[0];
    }

    /**
     * Adds prescription details to a completed appointment.
     */
    static async addPrescription(appointmentId, { patient_id, medicine_name, dosage, timing, duration, lifestyle_advice }) {
        const query = `
            INSERT INTO Prescriptions (appointment_id, patient_id, medicine_name, dosage, timing, duration, lifestyle_advice, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, true)
            RETURNING *;
        `;
        const values = [appointmentId, patient_id, medicine_name, dosage, timing, duration, lifestyle_advice];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    /**
     * Adds a review for a completed appointment.
     */
    static async addReview(appointmentId, { rating, review_text }) {
        const query = `
            INSERT INTO AppointmentReviews (appointment_id, rating, review_text)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [appointmentId, rating, review_text]);
        return rows[0];
    }

    static async getById(appointmentId) {
        const query = `SELECT * FROM Appointments WHERE id = $1;`;
        const { rows } = await db.query(query, [appointmentId]);
        return rows[0];
    }

    /**
     * Fetches appointments by date for slot generation.
     */
    static async getAppointmentsByDate(doctorId, dateString) {
        const query = `
            SELECT scheduled_at FROM Appointments 
            WHERE doctor_id = $1 AND status != 'Cancelled' AND DATE(scheduled_at) = $2;
        `;
        const { rows } = await db.query(query, [doctorId, dateString]);
        return rows;
    }
}

module.exports = AppointmentModel;
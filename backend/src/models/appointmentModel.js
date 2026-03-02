const db = require('../config/db');

class AppointmentModel {
    static async bookAppointment(appointmentData) {
        const { patient_id, doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint } = appointmentData;
        const query = `
            INSERT INTO Appointments (patient_id, doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [patient_id, doctor_id, scheduled_at, mode, pre_consultation_symptoms, chief_complaint];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async addPrescription(appointmentId, prescriptionData) {
        const { herbs_prescribed, dosage, duration, lifestyle_advice } = prescriptionData;
        const query = `
            INSERT INTO Prescriptions (appointment_id, herbs_prescribed, dosage, duration, lifestyle_advice)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [appointmentId, herbs_prescribed, dosage, duration, lifestyle_advice];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async addReview(appointmentId, reviewData) {
        const { rating, review_text } = reviewData;
        const query = `
            INSERT INTO AppointmentReviews (appointment_id, rating, review_text)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [appointmentId, rating, review_text]);
        return rows[0];
    }
}

module.exports = AppointmentModel;
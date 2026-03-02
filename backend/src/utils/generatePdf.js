const PDFDocument = require('pdfkit');
const logger = require('./logger');

/**
 * Generates a PDF buffer for a clinical prescription.
 * @param {Object} prescriptionData - Contains patient, doctor, and medication details mapped from the database.
 * @returns {Promise<Buffer>} - Resolves with the binary PDF data.
 */
const generatePrescriptionPdf = (prescriptionData) => {
    return new Promise((resolve, reject) => {
        try {
            // Initialize document with standard margins
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];

            // Capture data chunks in memory rather than writing to disk
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // 1. Document Header
            doc.fontSize(20).text('AyurCure Clinic', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Doctor: ${prescriptionData.doctorName}`);
            doc.text(`Patient: ${prescriptionData.patientName}`);
            doc.text(`Date: ${new Date(prescriptionData.date).toLocaleDateString()}`);
            doc.moveDown();

            // Separator Line
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();

            // 2. Clinical Data (Mapped to PostgreSQL 'Appointments' and 'Prescriptions' tables)
            doc.fontSize(14).text('Chief Complaint:', { underline: true });
            doc.fontSize(12).text(prescriptionData.chiefComplaint || 'N/A');
            doc.moveDown();

            doc.fontSize(14).text('Prescribed Herbs/Medicines:', { underline: true });
            doc.fontSize(12).text(prescriptionData.herbsPrescribed || 'N/A');
            doc.moveDown();

            doc.fontSize(14).text('Dosage & Duration:', { underline: true });
            doc.fontSize(12).text(`Dosage: ${prescriptionData.dosage || 'N/A'}`);
            doc.text(`Duration: ${prescriptionData.duration || 'N/A'}`);
            doc.moveDown();

            doc.fontSize(14).text('Lifestyle Advice:', { underline: true });
            doc.fontSize(12).text(prescriptionData.lifestyleAdvice || 'N/A');

            // 3. Document Footer
            doc.moveDown(3);
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();
            doc.fontSize(10).text('This is a digitally generated prescription.', { align: 'center' });

            // Finalize document assembly
            doc.end();
        } catch (error) {
            logger.error(`PDF Generation Error: ${error.message}`);
            reject(error);
        }
    });
};

module.exports = { generatePrescriptionPdf };
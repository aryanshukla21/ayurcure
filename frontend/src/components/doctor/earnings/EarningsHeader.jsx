import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
// 1. Change the import to import the autoTable function directly
import autoTable from 'jspdf-autotable';

const EarningsHeader = ({ stats, history }) => {
    const handleExportPDF = () => {
        // Initialize a new PDF document
        const doc = new jsPDF();

        // Add Header/Title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text('Earnings & Transactions Report', 14, 22);

        // Add Summary Stats
        doc.setFontSize(12);
        doc.setTextColor(80);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Earnings: $${stats?.totalEarnings?.toLocaleString() || 0}`, 14, 40);
        doc.text(`Monthly Earnings: $${stats?.monthlyEarnings?.toLocaleString() || 0}`, 14, 48);

        // Prepare Table Columns and Rows
        const tableColumn = ["Transaction ID", "Date", "Time", "Patient", "Consultation", "Amount"];
        const tableRows = [];

        // Populate Rows with history data
        if (history && history.length > 0) {
            history.forEach(trx => {
                const rowData = [
                    trx.id,
                    trx.date,
                    trx.time,
                    trx.patient,
                    trx.type,
                    `$${trx.amount}`
                ];
                tableRows.push(rowData);
            });
        }

        // 2. Change how autoTable is called. Pass 'doc' as the first parameter.
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 58, // Starts below the summary stats
            styles: { fontSize: 10, cellPadding: 4 },
            headStyles: { fillColor: [74, 124, 89] }, // Matches your green theme (#4A7C59)
            alternateRowStyles: { fillColor: [253, 249, 238] } // Matches your #FDF9EE background
        });

        // Save PDF with a dynamic timestamped filename
        doc.save(`Doctor_Earnings_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5">
            <div>
                <p className='text-amber-800 font-bold text-sm pb-3 uppercase'> Financial Overview</p>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Earnings</h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleExportPDF}
                    className="flex items-center justify-center gap-2 w-full md:w-auto bg-gray-200 border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3.5 rounded-3xl font-bold transition-all shadow-sm"
                >
                    <Download size={15} />
                    <span className='text-xs'>Export PDF</span>
                </button>
            </div>
        </div>
    );
};

export default EarningsHeader;
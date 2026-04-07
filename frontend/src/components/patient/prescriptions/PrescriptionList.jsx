import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Expanded dummy data to demonstrate working pagination (12 items total)
const ALL_PRESCRIPTIONS = [
  { id: 1, doctor: 'Dr. Ananya Sharma', initials: 'AS', date: 'Oct 12, 2023', color: 'bg-[#FDEEDC] text-[#D9774B]' },
  { id: 2, doctor: 'Dr. Rajesh Kumar', initials: 'RK', date: 'Sep 28, 2023', color: 'bg-[#FEF5D3] text-[#A67C00]' },
  { id: 3, doctor: 'Dr. Priya Menon', initials: 'PM', date: 'Sep 15, 2023', color: 'bg-[#E7F3EB] text-[#4A7C59]' },
  { id: 4, doctor: 'Dr. Vikram Singh', initials: 'VS', date: 'Aug 05, 2023', color: 'bg-[#FDEEDC] text-[#D9774B]' },
  { id: 5, doctor: 'Dr. Sanya Malhotra', initials: 'SM', date: 'Jul 22, 2023', color: 'bg-[#EAE5D9] text-[#79563E]' },
  { id: 6, doctor: 'Dr. Rahul Varma', initials: 'RV', date: 'Jun 30, 2023', color: 'bg-[#E7F3EB] text-[#4A7C59]' },
  { id: 7, doctor: 'Dr. Meera Kapur', initials: 'MK', date: 'Jun 14, 2023', color: 'bg-[#FEF5D3] text-[#A67C00]' },
  { id: 8, doctor: 'Dr. Ananya Sharma', initials: 'AS', date: 'May 20, 2023', color: 'bg-[#FDEEDC] text-[#D9774B]' },
  { id: 9, doctor: 'Dr. Arjun Das', initials: 'AD', date: 'May 02, 2023', color: 'bg-[#EAE5D9] text-[#79563E]' },
  { id: 10, doctor: 'Dr. Priya Menon', initials: 'PM', date: 'Apr 18, 2023', color: 'bg-[#E7F3EB] text-[#4A7C59]' },
  { id: 11, doctor: 'Dr. Rajesh Kumar', initials: 'RK', date: 'Apr 05, 2023', color: 'bg-[#FEF5D3] text-[#A67C00]' },
  { id: 12, doctor: 'Dr. Sanya Malhotra', initials: 'SM', date: 'Mar 21, 2023', color: 'bg-[#EAE5D9] text-[#79563E]' },
];

const ITEMS_PER_PAGE = 5;

const PrescriptionList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(ALL_PRESCRIPTIONS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = ALL_PRESCRIPTIONS.slice(startIndex, endIndex);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // PDF Generation Logic
  const handleDownloadPDF = (item) => {
    const doc = new jsPDF();

    // Brand Header
    doc.setFontSize(22);
    doc.setTextColor(74, 124, 89); // Match #4A7C59
    doc.text('AyurCare360', 14, 22);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Medical Prescription', 14, 34);

    // Meta Details
    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text(`Doctor: ${item.doctor}`, 14, 46);
    doc.text(`Date of Issue: ${item.date}`, 14, 54);
    doc.text(`Patient ID: AC360-PAT-892`, 14, 62); // Static ID for demo

    // Dummy Prescription Data Table
    const tableColumn = ["Medicine / Herb", "Dosage", "Frequency", "Duration"];
    const tableRows = [
      ["Ashwagandha Vati", "1 Tablet", "Twice daily (After meals)", "30 Days"],
      ["Triphala Churna", "1 Teaspoon", "Night (With warm water)", "15 Days"],
      ["Kumkumadi Tailam", "3-4 Drops", "External application", "Ongoing"]
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 72,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [74, 124, 89] },
      alternateRowStyles: { fillColor: [253, 249, 238] }
    });

    // Add Footer Note
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('This is a digitally generated prescription. Please consult your physician before altering dosages.', 14, doc.lastAutoTable.finalY + 20);

    // Generate safe file name
    const safeDate = item.date.replace(/, /g, '_').replace(/ /g, '_');
    doc.save(`Prescription_${item.initials}_${safeDate}.pdf`);
  };

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-6">
        <div className="w-[50%] md:w-[40%] pl-2">Doctor</div>
        <div className="w-[30%] md:w-[40%] text-left">Date</div>
        <div className="w-[20%] text-right pr-2">Action</div>
      </div>

      {/* List Rows */}
      <div className="space-y-4 min-h-[300px]">
        {currentItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 group">

            {/* Doctor Info */}
            <div className="w-[50%] md:w-[40%] flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 ${item.color}`}>
                {item.initials}
              </div>
              <span className="font-bold text-gray-900 group-hover:text-[#4A7C59] transition-colors cursor-pointer">
                {item.doctor}
              </span>
            </div>

            {/* Date */}
            <div className="w-[30%] md:w-[40%] text-sm font-semibold text-gray-500">
              {item.date}
            </div>

            {/* Action */}
            <div className="w-[20%] text-right">
              <button
                onClick={() => handleDownloadPDF(item)}
                className="flex items-center justify-center gap-2 ml-auto text-sm font-bold bg-gray-100 text-gray-900 hover:text-white transition-colors rounded-full px-4 py-2 hover:bg-[#4A7C59] shadow-sm"
              >
                <Download size={14} /> <span className="hidden md:inline">View</span> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-[#EFEBE1] gap-4">

        {/* Dynamic Showing Text */}
        <p className="text-xs font-semibold text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, ALL_PRESCRIPTIONS.length)} of {ALL_PRESCRIPTIONS.length} prescriptions
        </p>

        {/* Numbered Buttons */}
        <div className="flex items-center gap-1 text-sm font-bold">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dynamic Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === pageNumber
                  ? 'bg-[#3A6447] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#EFEBE1]'
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrescriptionList;
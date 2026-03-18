import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-6">
        <div className="w-[50%] md:w-[40%] pl-2">Doctor</div>
        <div className="w-[30%] md:w-[40%] text-left">Date</div>
        <div className="w-[20%] text-right pr-2">Action</div>
      </div>

      {/* List Rows */}
      <div className="space-y-4 min-h-[300px]"> {/* min-h keeps UI from jumping when on the last page with fewer items */}
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
              <button className="text-sm font-bold bg-gray-100 text-gray-900 hover:text-[#4A7C59] transition-colors rounded-full px-3 py-1 hover:bg-gray-200">
                View PDF
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
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Download, X, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ITEMS_PER_PAGE = 4;

const RecentReportsList = ({ reportsData = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const dropdownRef = useRef(null);

  // Dynamically extract unique Doctors and Report Names for the dropdown
  const uniqueDoctors = [...new Set(reportsData.map(r => r.doctor))];
  const uniqueNames = [...new Set(reportsData.map(r => r.name))];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Filter Logic: Match activeFilter against Doctor or Report Name
  const filteredReports = reportsData.filter(report => {
    if (activeFilter === 'All') return true;
    return report.doctor === activeFilter || report.name === activeFilter || report.date === activeFilter;
  });

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 3. Download PDF Logic
  const handleDownloadPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(74, 124, 89);
    doc.text('AyurCare360', 14, 22);
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Clinical Health Report', 14, 34);
    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text(`Report Name: ${report.name}`, 14, 46);
    doc.text(`Category: ${report.desc}`, 14, 54);
    doc.text(`Physician: ${report.doctor}`, 14, 62);
    doc.text(`Date of Issue: ${report.date}`, 14, 70);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('This is a digitally generated summary of your archived clinical report.', 14, 90);

    const safeName = report.name.replace(/ /g, '_');
    doc.save(`HealthReport_${safeName}_${report.date}.pdf`);
  };

  const applyFilter = (filterValue) => {
    setActiveFilter(filterValue);
    setCurrentPage(1); // Reset to first page
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col transition-all">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
          <p className="text-xs font-medium text-gray-400 mt-1">Showing last 12 months of clinical data</p>
        </div>

        {/* Dropdown Filter System */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${activeFilter !== 'All'
                ? 'bg-[#4A7C59] text-white border-[#4A7C59] shadow-sm'
                : 'hover:bg-[#EFEBE1] border-transparent text-gray-600'
              }`}
          >
            <SlidersHorizontal size={18} />
            {activeFilter !== 'All' && (
              <span className="text-sm font-bold max-w-[120px] truncate">{activeFilter}</span>
            )}
            {activeFilter !== 'All' && (
              <div
                onClick={(e) => { e.stopPropagation(); applyFilter('All'); }}
                className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={14} />
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EFEBE1] z-20 py-2 animate-fade-in origin-top-right">

              <button
                onClick={() => applyFilter('All')}
                className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors hover:bg-[#FDF9EE] ${activeFilter === 'All' ? 'text-[#4A7C59]' : 'text-gray-700'}`}
              >
                All Reports
                {activeFilter === 'All' && <Check size={16} />}
              </button>

              {/* Doctors Section */}
              <div className="px-4 pt-3 pb-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-t border-[#EFEBE1] mt-1">
                Filter by Doctor
              </div>
              <div className="max-h-40 overflow-y-auto custom-scrollbar">
                {uniqueDoctors.map(doc => (
                  <button
                    key={doc}
                    onClick={() => applyFilter(doc)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center justify-between transition-colors hover:bg-[#FDF9EE] ${activeFilter === doc ? 'text-[#4A7C59] font-bold bg-[#E7F3EB]' : 'text-gray-700'}`}
                  >
                    {doc}
                    {activeFilter === doc && <Check size={14} />}
                  </button>
                ))}
              </div>

              {/* Report Types Section */}
              <div className="px-4 pt-3 pb-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-t border-[#EFEBE1] mt-1">
                Filter by Report Type
              </div>
              <div className="max-h-40 overflow-y-auto custom-scrollbar">
                {uniqueNames.map(name => (
                  <button
                    key={name}
                    onClick={() => applyFilter(name)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center justify-between transition-colors hover:bg-[#FDF9EE] ${activeFilter === name ? 'text-[#4A7C59] font-bold bg-[#E7F3EB]' : 'text-gray-700'}`}
                  >
                    {name}
                    {activeFilter === name && <Check size={14} />}
                  </button>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[45%] pl-2">Report Name</div>
        <div className="w-[25%]">Doctor</div>
        <div className="w-[15%]">Date</div>
        <div className="w-[15%] text-right pr-2">Action</div>
      </div>

      {/* List */}
      <div className="flex-1 space-y-2 mt-4 min-h-[280px]">
        {currentItems.length > 0 ? (
          currentItems.map((report) => {
            const Icon = report.icon;
            return (
              <div key={report.id} className="flex items-center py-3 group border-b border-transparent hover:border-[#EFEBE1] transition-all">

                <div className="w-[45%] flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${report.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{report.name}</p>
                    <p className="text-[11px] font-medium text-gray-500">{report.desc}</p>
                  </div>
                </div>

                <div className="w-[25%] text-xs font-semibold text-amber-800">
                  {report.doctor.split(' ').map((n, i) => i === 0 ? <React.Fragment key={i}>{n} </React.Fragment> : <span key={i}><br />{n}</span>)}
                </div>

                <div className="w-[15%] text-xs font-semibold text-gray-600">
                  {report.date.split(', ')[0]}<br />{report.date.split(', ')[1] || ''}
                </div>

                <div className="w-[15%] text-right">
                  <button
                    onClick={() => handleDownloadPDF(report)}
                    className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center gap-1.5 ml-auto transition-colors shadow-sm"
                  >
                    <Download size={14} /> <span className="hidden xl:inline">Download</span>
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-500 font-medium">
            No reports found for "{activeFilter}".
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredReports.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1]">
          <p className="text-xs font-semibold text-gray-500">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredReports.length)} of {filteredReports.length} archived reports
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecentReportsList;
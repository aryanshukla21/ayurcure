import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Activity, HeartPulse, Stethoscope, SlidersHorizontal, Download, X } from 'lucide-react';

// Removed 'status' field from dummy data
const REPORTS_DATA = [
  { id: 1, name: 'Blood Test Results', desc: 'Metabolic Panel', doctor: 'Dr. Ananya Sharma', date: 'Oct 15, 2023', icon: Activity, color: 'text-red-500 bg-red-50' },
  { id: 2, name: 'Chest X-Ray Digital', desc: 'Imaging Diagnostics', doctor: 'Dr. Rajesh Varma', date: 'Sep 28, 2023', icon: FileText, color: 'text-amber-600 bg-amber-50' },
  { id: 3, name: 'Annual Physical', desc: 'General Wellness', doctor: 'Dr. Sarah K.', date: 'Aug 12, 2023', icon: Stethoscope, color: 'text-orange-600 bg-orange-50' },
  { id: 4, name: 'Cardiac Stress Test', desc: 'Cardiology Dept', doctor: 'Dr. Ananya Sharma', date: 'Jul 05, 2023', icon: HeartPulse, color: 'text-blue-600 bg-blue-50' },
  { id: 5, name: 'Thyroid Profile', desc: 'Endocrinology', doctor: 'Dr. Priya Menon', date: 'Jun 20, 2023', icon: Activity, color: 'text-purple-600 bg-purple-50' },
  { id: 6, name: 'Vitamin D Check', desc: 'Nutrition', doctor: 'Dr. Sarah K.', date: 'May 11, 2023', icon: FileText, color: 'text-green-600 bg-green-50' },
  { id: 7, name: 'Liver Function', desc: 'Metabolic Panel', doctor: 'Dr. Rajesh Varma', date: 'Apr 02, 2023', icon: Activity, color: 'text-red-500 bg-red-50' },
  { id: 8, name: 'Allergy Panel', desc: 'Immunology', doctor: 'Dr. Ananya Sharma', date: 'Mar 15, 2023', icon: FileText, color: 'text-amber-600 bg-amber-50' },
];

const ITEMS_PER_PAGE = 4;

const RecentReportsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States (Removed status)
  const [filters, setFilters] = useState({
    name: '',
    doctor: '',
    date: ''
  });

  // Handle Input Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({ name: '', doctor: '', date: '' });
    setCurrentPage(1);
  };

  // Compute Filtered Data (Removed matchStatus)
  const filteredReports = REPORTS_DATA.filter(report => {
    const matchName = report.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchDoctor = report.doctor.toLowerCase().includes(filters.doctor.toLowerCase());
    const matchDate = report.date.toLowerCase().includes(filters.date.toLowerCase());

    return matchName && matchDoctor && matchDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const activeFiltersCount = Object.values(filters).filter(val => val !== '').length;

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            Recent Reports
            {activeFiltersCount > 0 && (
              <span className="bg-[#4A7C59] text-white text-[10px] px-2 py-0.5 rounded-full">
                {activeFiltersCount} Active Filters
              </span>
            )}
          </h3>
          <p className="text-xs font-medium text-gray-400 mt-1">Showing last 12 months of clinical data</p>
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-2.5 rounded-full transition-colors flex items-center gap-2 ${isFilterOpen ? 'bg-[#EAE5D9] text-[#4A7C59]' : 'hover:bg-[#EFEBE1] text-gray-600'}`}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {isFilterOpen && (
        <div className="mb-6 p-5 bg-[#FAF7F2] rounded-2xl border border-[#EFEBE1] flex flex-wrap gap-4 items-end animate-in fade-in slide-in-from-top-2">

          <div className="flex-1 min-w-[140px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Report Name</label>
            <input
              type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="e.g. Blood Test"
              className="w-full bg-white border border-[#EFEBE1] rounded-xl p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Doctor Name</label>
            <input
              type="text" name="doctor" value={filters.doctor} onChange={handleFilterChange} placeholder="e.g. Sharma"
              className="w-full bg-white border border-[#EFEBE1] rounded-xl p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Date (Month/Year)</label>
            <input
              type="text" name="date" value={filters.date} onChange={handleFilterChange} placeholder="e.g. Oct 2023"
              className="w-full bg-white border border-[#EFEBE1] rounded-xl p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          </div>

          {/* Status dropdown removed from here */}

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="h-[38px] px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      )}

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
                  <div className="pr-2">
                    <p className="text-sm font-bold text-gray-900 leading-tight mb-0.5">{report.name}</p>
                    <p className="text-[11px] font-medium text-gray-500">{report.desc}</p>
                  </div>
                </div>

                <div className="w-[25%] text-xs font-semibold text-amber-800">
                  {report.doctor.split(' ').map((n, i) => i === 0 ? <React.Fragment key={i}>{n} </React.Fragment> : <span key={i}><br />{n}</span>)}
                </div>

                <div className="w-[15%] text-xs font-semibold text-gray-600">
                  {report.date.split(', ')[0]}<br />{report.date.split(', ')[1]}
                </div>

                <div className="w-[15%] text-right">
                  <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center gap-1.5 ml-auto transition-colors shadow-sm">
                    <Download size={14} /> <span className="hidden xl:inline">Download</span>
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
            <FileText size={32} className="text-gray-300 mb-3" />
            <p className="text-sm font-bold text-gray-900">No reports found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1]">
        <p className="text-xs font-semibold text-gray-500">
          Showing {filteredReports.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredReports.length)} of {filteredReports.length} reports
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
            disabled={currentPage === totalPages || filteredReports.length === 0}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecentReportsList;
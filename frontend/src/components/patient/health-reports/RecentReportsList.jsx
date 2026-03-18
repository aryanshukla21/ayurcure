import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Activity, HeartPulse, Stethoscope, SlidersHorizontal, Download } from 'lucide-react';

// Dummy data for pagination
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

  const totalPages = Math.ceil(REPORTS_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = REPORTS_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
          <p className="text-xs font-medium text-gray-400 mt-1">Showing last 12 months of clinical data</p>
        </div>
        <button className="p-2 hover:bg-[#EFEBE1] rounded-full transition-colors">
          <SlidersHorizontal size={18} className="text-gray-600" />
        </button>
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
        {currentItems.map((report) => {
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
                {report.date.split(', ')[0]}<br />{report.date.split(', ')[1]}
              </div>

              <div className="w-[15%] text-right">
                <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center gap-1.5 ml-auto transition-colors shadow-sm">
                  <Download size={14} /> <span className="hidden xl:inline">Download</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1]">
        <p className="text-xs font-semibold text-gray-500">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, REPORTS_DATA.length)} of {REPORTS_DATA.length} archived reports
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

    </div>
  );
};

export default RecentReportsList;
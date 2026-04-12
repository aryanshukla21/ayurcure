import React, { useState, useMemo } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// Extended Dummy Data for Pagination
const INITIAL_APPOINTMENTS = [
  { id: 'APT-001', doctor: 'Dr. Anjali Sharma', spec: 'Ayurveda Specialist', date: 'Oct 24, 2023', time: '10:00 AM', status: 'COMPLETED', img: 'https://ui-avatars.com/api/?name=AS&background=FDF9EE&color=3A6447' },
  { id: 'APT-002', doctor: 'Dr. Rajesh Kumar', spec: 'Yoga Therapist', date: 'Nov 12, 2023', time: '02:30 PM', status: 'COMPLETED', img: 'https://ui-avatars.com/api/?name=RK&background=FDF9EE&color=D9774B' },
  { id: 'APT-003', doctor: 'Dr. Meera Nair', spec: 'Pancha-Karma Specialist', date: 'Dec 05, 2023', time: '11:15 AM', status: 'CANCELLED', img: 'https://ui-avatars.com/api/?name=MN&background=FDF9EE&color=8C6239' },
  { id: 'APT-004', doctor: 'Dr. David Thorne', spec: 'General Medicine', date: 'Jan 18, 2024', time: '09:00 AM', status: 'COMPLETED', img: 'https://ui-avatars.com/api/?name=DT&background=FDF9EE&color=3A6447' },
  { id: 'APT-005', doctor: 'Dr. Anjali Sharma', spec: 'Ayurveda Specialist', date: 'Feb 22, 2024', time: '04:00 PM', status: 'COMPLETED', img: 'https://ui-avatars.com/api/?name=AS&background=FDF9EE&color=3A6447' },
  { id: 'APT-006', doctor: 'Dr. Rajesh Kumar', spec: 'Yoga Therapist', date: 'Mar 10, 2024', time: '10:30 AM', status: 'UPCOMING', img: 'https://ui-avatars.com/api/?name=RK&background=FDF9EE&color=D9774B' },
  { id: 'APT-007', doctor: 'Dr. Meera Nair', spec: 'Pancha-Karma Specialist', date: 'Apr 02, 2024', time: '01:00 PM', status: 'UPCOMING', img: 'https://ui-avatars.com/api/?name=MN&background=FDF9EE&color=8C6239' },
];

const ITEMS_PER_PAGE = 4;

const AppointmentHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter Logic Only
  const processedData = useMemo(() => {
    let data = [...INITIAL_APPOINTMENTS];

    // 1. Filter
    if (filterStatus !== 'All') {
      data = data.filter(apt => apt.status === filterStatus.toUpperCase());
    }

    return data;
  }, [filterStatus]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  // Reset to page 1 when filters change
  const handleFilterChange = (e) => { setFilterStatus(e.target.value); setCurrentPage(1); };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-[#E7F3EB] text-[#3A6447]';
      case 'UPCOMING': return 'bg-[#FEF5D3] text-[#A67C00]';
      case 'CANCELLED': return 'bg-[#FDF1E8] text-[#D9774B]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Appointment History</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Past and upcoming sessions</p>
        </div>

        {/* Filter Only */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-40">
            <select
              value={filterStatus} onChange={handleFilterChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-2.5 pl-4 pr-10 text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[40%] pl-2">Doctor</div>
        <div className="w-[30%]">Date & Time</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[15%] text-right pr-2">Action</div>
      </div>

      <div className="flex-1 mt-2 space-y-1 min-h-[300px]">
        {currentItems.length > 0 ? currentItems.map((apt, i) => (
          <div key={i} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors px-2 -mx-2">
            <div className="w-[40%] flex items-center gap-3">
              <img src={apt.img} alt={apt.doctor} className="w-10 h-10 rounded-full border border-[#EFEBE1]" />
              <div>
                <p className="text-sm font-bold text-gray-900">{apt.doctor}</p>
                <p className="text-xs font-medium text-gray-500">{apt.spec}</p>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 mb-0.5">
                <Calendar size={14} className="text-[#3A6447]" /> {apt.date}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Clock size={14} className="text-[#D9774B]" /> {apt.time}
              </div>
            </div>
            <div className="w-[15%]">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${getStatusColor(apt.status)}`}>
                {apt.status}
              </span>
            </div>
            <div className="w-[15%] text-right pr-2">
              <button className="text-xs font-bold text-[#3A6447] hover:underline cursor-pointer">Details</button>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-sm font-bold text-gray-400">No appointments found.</div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {processedData.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, processedData.length)} of {processedData.length}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 text-sm font-bold">
            <button
              onClick={handlePrevPage} disabled={currentPage === 1}
              className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1} onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === index + 1 ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage} disabled={currentPage === totalPages}
              className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistoryTable;
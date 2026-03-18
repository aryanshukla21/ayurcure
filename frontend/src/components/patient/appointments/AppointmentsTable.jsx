import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// Notice all the new props here! They must match exactly what the parent passes.
const AppointmentsTable = ({ 
  appointments, 
  loading, 
  activeTab, 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage 
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Upcoming</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Completed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Cancelled</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#EFEBE1] flex justify-center items-center py-20 mb-8">
        <Loader2 className="w-10 h-10 text-[#4A7C59] animate-spin" />
      </div>
    );
  }

  // Calculate the range of items currently being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EFEBE1] overflow-hidden mb-8">
      
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-[#EFEBE1] bg-[#FAFAF8] text-xs font-bold text-gray-400 uppercase tracking-widest">
        <div className="col-span-4">Doctor</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Table Body */}
      {appointments.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium text-lg">
          No appointments found in this category.
        </div>
      ) : (
        <div className="divide-y divide-[#EFEBE1]">
          {appointments.map((apt) => (
            <div key={apt._id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-[#FAFAF8] transition-colors">
              
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#EAE5D9] flex items-center justify-center text-[#4A7C59] font-bold border border-[#EFEBE1] shrink-0">
                  {apt.doctorName.charAt(4)} 
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{apt.doctorName}</p>
                  <p className="text-sm text-gray-500 font-medium">{apt.specialty}</p>
                </div>
              </div>

              <div className="col-span-2 text-sm font-semibold text-gray-700">{apt.date}</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700">{apt.time}</div>
              <div className="col-span-2">{getStatusBadge(apt.status)}</div>

              <div className="col-span-2 text-right">
                {apt.status === 'cancelled' ? (
                   <button className="px-6 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                     Rebook
                   </button>
                ) : (
                   <button 
                     onClick={() => navigate(`/patient/appointments/${apt._id}`)}
                     className="px-6 py-2 text-sm font-bold text-white bg-[#4A7C59] rounded-full hover:bg-[#3d6649] transition-colors shadow-sm"
                   >
                     {apt.status === 'completed' ? 'View Summary' : 'View Appointment'}
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Pagination Footer - Only show if there are items */}
      {totalItems > 0 && (
        <div className="px-8 py-5 border-t border-[#EFEBE1] flex justify-between items-center bg-[#FAFAF8]">
          <span className="text-sm font-semibold text-gray-500">
            Showing {startItem}-{endItem} of {totalItems} appointments
          </span>
          
          <div className="flex gap-2">
            {/* Previous Button */}
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-colors shadow-sm ${
                  currentPage === page 
                    ? 'bg-[#4A7C59] text-white' 
                    : 'text-gray-600 hover:bg-gray-200 bg-transparent'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
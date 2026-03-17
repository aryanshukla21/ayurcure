import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate

const AppointmentsTable = ({ appointments = [], activeTab }) => {
    const navigate = useNavigate(); // <-- 2. Initialize navigate hook

    // --- Pagination State & Logic ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Set to 4 to match your requirement ("Showing 1 to 4...")

    // Reset to page 1 whenever the tab changes or a new search is made
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, appointments.length]);

    const safeAppointments = Array.isArray(appointments) ? appointments : [];
    const totalItems = safeAppointments.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Slice the data to only show the current page's items
    const paginatedAppointments = safeAppointments.slice(startIndex, endIndex);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'completed': return 'bg-gray-100 text-gray-700';
            case 'scheduled':
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="bg-[#f8efdc] rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className=" text-xs uppercase tracking-widest text-amber-700 border-b border-gray-100">
                            <th className="px-8 py-3 font-bold">Patient Name</th>
                            <th className="px-8 py-3 font-bold">Date</th>
                            <th className="px-8 py-3 font-bold">Time</th>
                            <th className="px-8 py-3 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedAppointments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-16 text-center">
                                    <CalendarIcon className="mx-auto text-gray-300 mb-4" size={48} />
                                    <p className="text-gray-500 text-lg font-medium">No appointments found.</p>
                                </td>
                            </tr>
                        ) : (
                            paginatedAppointments.map((apt, index) => {
                                const name = apt?.name || apt?.patient_name || 'Unknown Patient';
                                const initials = typeof name === 'string' ? name.substring(0, 2).toUpperCase() : 'P';
                                const dateStr = apt?.date || (apt?.start_time ? new Date(apt.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A');
                                const timeStr = apt?.time || (apt?.start_time ? new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A');
                                const statusStr = apt?.status || 'Scheduled';

                                return (
                                    <tr
                                        key={apt?.id || index}
                                        onClick={() => navigate(`/doctor/appointments/${apt?.id || index + 1}`)} // <-- 3. Click handler added
                                        className="hover:bg-gray-50 transition-colors group cursor-pointer" // <-- 4. cursor-pointer added
                                    >
                                        <td className="px-8 py-2">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#FDF9EE] flex items-center justify-center font-bold text-[#4A7C59] text-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200">
                                                    {initials}
                                                </div>
                                                <span className="font-bold text-gray-900 text-xs">{name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-2">
                                            <span className="text-gray-600 font-semibold text-xs">{dateStr}</span>
                                        </td>
                                        <td className="px-8 py-2">
                                            <span className="font-bold text-gray-800 text-xs">{timeStr}</span>
                                        </td>
                                        <td className="px-8 py-2">
                                            <span className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide ${getStatusStyle(statusStr)}`}>
                                                {statusStr}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>


            {/* --- Dynamic Pagination Footer --- */}
            {totalItems > 0 && (
                <div className="px-8 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-500">
                        Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to <span className="font-bold text-gray-900">{endIndex}</span> of <span className="font-bold text-gray-900">{totalItems}</span> appointments
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const pageNum = idx + 1;
                                // Simple logic to only show a few pages if there are many
                                if (totalPages > 5 && Math.abs(currentPage - pageNum) > 1 && pageNum !== 1 && pageNum !== totalPages) {
                                    if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                                    return null;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${currentPage === pageNum
                                            ? 'bg-[#4A7C59] text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsTable;
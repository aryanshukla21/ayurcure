import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const AppointmentsTable = ({ appointments = [], activeTab }) => {
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'completed': return 'bg-gray-100 text-gray-700';
            case 'scheduled':
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    // Ensure appointments is always treated as an array to prevent crashes
    const safeAppointments = Array.isArray(appointments) ? appointments : [];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="overflow-x-auto p-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#FDF9EE]/50 text-xs uppercase tracking-widest text-gray-500 rounded-2xl">
                            <th className="px-8 py-5 font-bold rounded-l-2xl">Patient Name</th>
                            <th className="px-8 py-5 font-bold">Date</th>
                            <th className="px-8 py-5 font-bold">Time</th>
                            <th className="px-8 py-5 font-bold rounded-r-2xl">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-transparent">
                        <tr><td colSpan="4" className="h-4"></td></tr>

                        {/* If no data, show the empty state cleanly INSIDE the table */}
                        {safeAppointments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-16 text-center">
                                    <CalendarIcon className="mx-auto text-gray-300 mb-4" size={48} />
                                    <p className="text-gray-500 text-lg font-medium">No appointments found for "{activeTab}".</p>
                                </td>
                            </tr>
                        ) : (
                            /* Map the data if it exists */
                            safeAppointments.map((apt, index) => {
                                // Safely extract strings so it never crashes on split()
                                const name = apt?.name || apt?.patient_name || 'Unknown Patient';
                                const initials = typeof name === 'string' ? name.substring(0, 2).toUpperCase() : 'P';
                                const dateStr = apt?.date || (apt?.start_time ? new Date(apt.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A');
                                const timeStr = apt?.time || (apt?.start_time ? new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A');
                                const statusStr = apt?.status || 'Scheduled';

                                return (
                                    <tr key={apt?.id || index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-5 rounded-l-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#FDF9EE] flex items-center justify-center font-bold text-[#4A7C59] text-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200">
                                                    {initials}
                                                </div>
                                                <span className="font-bold text-gray-900 text-base">{name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-gray-600 font-semibold text-base">{dateStr}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-800 text-base">{timeStr}</span>
                                        </td>
                                        <td className="px-8 py-5 rounded-r-2xl">
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide ${getStatusStyle(statusStr)}`}>
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
        </div>
    );
};

export default AppointmentsTable;
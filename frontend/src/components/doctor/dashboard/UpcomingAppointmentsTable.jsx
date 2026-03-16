import React from 'react';
import { Video, User } from 'lucide-react';

const UpcomingAppointmentsTable = ({ appointments }) => {
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'scheduled':
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-gray-900">Upcoming Appointments</h3>
                <button className="text-sm font-bold text-[#4A7C59] hover:text-[#3a6146] transition-colors">
                    View All Schedule
                </button>
            </div>

            <div className="overflow-x-auto flex-1 py-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* Table header background matches the new page color #efefe3 */}
                        <tr className="text-s uppercase tracking-wider text-gray-900 bg-[#FDF9EE]">
                            <th className="px-8 py-5 font-bold">Patient Name</th>
                            <th className="px-8 py-5 font-bold">Time</th>
                            <th className="px-8 py-5 font-bold">Consultation Type</th>
                            <th className="px-8 py-5 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-transparent">
                        <tr><td colSpan="4" className="h-4"></td></tr>

                        {appointments.map((apt, index) => (
                            <tr key={index} className="hover:bg-[#efefe3]/50 transition-colors group">
                                <td className="px-8 py-5 rounded-l-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-200">
                                            {apt.name ? apt.name.charAt(0) : apt.patient_name?.charAt(0) || 'P'}
                                        </div>
                                        <span className="font-bold text-gray-900 text-base">{apt.name || apt.patient_name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-gray-600 font-semibold text-base">{apt.time || new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        {apt.type === 'Video' || apt.mode === 'Video' ? <Video size={20} className="text-blue-500" /> : <User size={20} className="text-green-500" />}
                                        <span className="font-semibold text-base">{apt.type || apt.mode}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 rounded-r-2xl">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide ${getStatusStyle(apt.status)}`}>
                                        {apt.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {appointments.length === 0 && (
                    <div className="p-12 text-center text-gray-500 text-lg">No upcoming appointments.</div>
                )}
            </div>
        </div>
    );
};

export default UpcomingAppointmentsTable;
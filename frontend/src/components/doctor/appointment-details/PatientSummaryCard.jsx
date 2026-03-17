import React from 'react';
import { Video, User } from 'lucide-react';

const PatientSummaryCard = ({ appointment }) => {
    const name = appointment.name || 'Unknown Patient';
    const dateStr = new Date(appointment.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = new Date(appointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full flex flex-col md:flex-row items-center md:items-start gap-8 relative">

            {/* Left: Much Larger Patient Image */}
            <div className="w-36 h-36 rounded-full bg-[#FDF9EE] flex-shrink-0 overflow-hidden border-4 border-gray-50 shadow-sm">
                <img
                    src={`https://ui-avatars.com/api/?name=${name}&background=E5E7EB&color=4A7C59`}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right: All Details Aligned with the Name */}
            <div className="flex-1 w-full flex flex-col justify-center py-2">

                {/* Top Row: Name, ID, and Status Badge */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{name}</h2>
                        <p className="text-gray-500 font-bold tracking-wide">{appointment.patient_id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase ${getStatusStyle(appointment.status)}`}>
                        {appointment.status}
                    </span>
                </div>

                {/* Bottom Grid: Specs & Consultation Type perfectly aligned */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 py-6 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">Age / Gender</p>
                        <p className="text-gray-900 font-extrabold text-lg">{appointment.age} / {appointment.gender}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">Appointment Date</p>
                        <p className="text-gray-900 font-extrabold text-lg">{dateStr}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">Time</p>
                        <p className="text-gray-900 font-extrabold text-lg">{timeStr}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2 pt-4">Consultation Type</p>
                    <div className="flex items-center gap-2 text-gray-900 font-extrabold text-lg">
                        {appointment.mode === 'Video' ? <Video size={20} className="text-[#4A7C59]" /> : <User size={20} className="text-[#4A7C59]" />}
                        {appointment.mode}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PatientSummaryCard;
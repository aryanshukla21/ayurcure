import React from 'react';
import { Video, ArrowRight, CalendarX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpcomingAppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();

  if (!appointment) {
    return (
      <div className="bg-[#F3F0E9] rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
        <CalendarX className="text-gray-400 mb-3" size={32} />
        <h4 className="text-sm font-bold text-gray-900 mb-1">No Upcoming Sessions</h4>
        <p className="text-xs text-gray-500 mb-4">Schedule your next visit.</p>
        <button 
          onClick={() => navigate('/patient/appointments')}
          className="bg-[#2C5F44] text-white text-xs font-medium py-2 px-4 rounded-lg"
        >
          Book Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F0E9] rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAE5D9] rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>

      <div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Upcoming Session</h3>
          {appointment.type === 'video' && <Video size={16} className="text-[#2C5F44]" />}
        </div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <img 
            src={appointment.doctorProfileImage || "/api/placeholder/48/48"} 
            alt={appointment.doctorName} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900">{appointment.doctorName}</h4>
            <p className="text-xs text-gray-600">{appointment.specialty}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 relative z-10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Date</span>
            <span className="font-bold text-gray-900">
              {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Time</span>
            <span className="font-bold text-gray-900">{appointment.time}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate(`/patient/appointments/${appointment._id}`)}
        className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors relative z-10 text-sm"
      >
        View Appointment
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default UpcomingAppointmentCard;
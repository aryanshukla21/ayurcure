import React from 'react';
import { Calendar, Clock, Video, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpcomingAppointmentCard = ({ appointment, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-[#3A6447] rounded-[32px] p-8 h-full shadow-md animate-pulse flex flex-col justify-between min-h-[280px]">
        <div className="h-4 bg-white/20 rounded w-32 mb-6"></div>
        <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-white/20 rounded-2xl w-full mb-6"></div>
        <div className="h-12 bg-white/20 rounded-full w-full"></div>
      </div>
    );
  }

  // If no upcoming appointment is returned from the DB
  if (!appointment) {
    return (
      <div className="bg-[#3A6447] rounded-[32px] p-8 h-full text-white flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden min-h-[280px]">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        <Calendar size={48} className="text-white/40 mb-4" />
        <h3 className="text-xl font-bold mb-2">No Upcoming Sessions</h3>
        <p className="text-white/70 text-sm mb-6">Schedule a consultation to maintain your wellness routine.</p>
        <button
          onClick={() => navigate('/patient/book-appointment')}
          className="bg-[#EBCB8B] hover:bg-[#d4b476] text-gray-900 text-sm font-bold py-3 px-6 rounded-full w-full transition-colors"
        >
          Book Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#3A6447] rounded-[32px] p-8 h-full text-white flex flex-col justify-between shadow-md relative overflow-hidden group min-h-[280px]">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700"></div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#EBCB8B] flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#EBCB8B] rounded-full animate-pulse"></div>
            Next Session
          </span>
          {appointment.type === 'video' ? <Video size={16} className="text-white/70" /> : <MapPin size={16} className="text-white/70" />}
        </div>

        <h3 className="text-2xl font-extrabold mb-1">{appointment.doctorName}</h3>
        <p className="text-white/70 text-sm font-medium mb-6">{appointment.specialty}</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center border border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Calendar size={18} /></div>
            <div>
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Date</p>
              <p className="font-bold text-sm">{appointment.date}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Clock size={18} /></div>
            <div>
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Time</p>
              <p className="font-bold text-sm">{appointment.time}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/patient/appointments/${appointment._id || appointment.id}`)}
        className="mt-6 w-full bg-white hover:bg-gray-50 text-[#3A6447] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
      >
        Join Session <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default UpcomingAppointmentCard;
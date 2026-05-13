import React from 'react';
import { Video, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PatientActionSidebar = ({ actions, onCancelClick }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isJoinable = actions?.status === 'Scheduled' || actions?.status === 'InProgress';

  const handleJoinCall = () => {
    if (isJoinable) {
      navigate(`/patient/consultation/room/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EFEBE1]">
      <h3 className="text-sm font-extrabold text-gray-400 tracking-widest uppercase mb-6">Actions</h3>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleJoinCall}
          disabled={!isJoinable}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isJoinable ? 'bg-[#52735B] hover:bg-[#435e4a] text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Video size={18} />
          {isJoinable ? 'Join Consultation' : 'Call Unavailable'}
        </button>

        {/* Removed the Reschedule button entirely! */}

        <button
          onClick={onCancelClick}
          disabled={actions?.status === 'Cancelled' || actions?.status === 'Completed'}
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-red-100 text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle size={18} />
          {actions?.status === 'Cancelled' ? 'Already Cancelled' : 'Cancel Appointment'}
        </button>
      </div>
    </div>
  );
};

export default PatientActionSidebar;
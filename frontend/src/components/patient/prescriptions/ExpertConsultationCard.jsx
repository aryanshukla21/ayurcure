import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpertConsultationCard = ({ data, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-[#3A6447] rounded-[32px] p-6 sm:p-8 text-white h-full flex flex-col justify-center animate-pulse border border-[#2C4D36]">
        <div className="w-12 h-12 bg-white/20 rounded-xl mb-6"></div>
        <div className="h-6 bg-white/20 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-white/10 rounded w-full mb-6"></div>
        <div className="h-12 bg-white/20 rounded-full w-full mt-auto"></div>
      </div>
    );
  }

  const expertName = data?.expertName || 'our specialists';
  const waitTime = data?.estimatedWait || '5 mins';

  return (
    <div className="bg-[#3A6447] rounded-[32px] p-6 sm:p-8 text-white h-full flex flex-col justify-center shadow-md relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>

      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-white/10">
        <PhoneCall size={24} className="text-white" />
      </div>

      <h3 className="text-xl font-bold mb-2">Doubt on Dosage?</h3>
      <p className="text-sm text-white/80 font-medium leading-relaxed mb-6">
        Connect instantly with {expertName} to clarify your prescription details. Estimated wait: {waitTime}.
      </p>

      <button
        onClick={() => navigate('/patient/book-appointment')}
        className="w-full bg-white hover:bg-gray-50 text-[#3A6447] font-bold py-3.5 rounded-full transition-colors text-sm mt-auto shadow-sm"
      >
        Consult Now
      </button>
    </div>
  );
};

export default ExpertConsultationCard;
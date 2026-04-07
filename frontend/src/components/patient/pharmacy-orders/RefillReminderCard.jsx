import React from 'react';
import { PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefillReminderCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#EAE5D9] rounded-[24px] p-8 relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#DFD9CB] rounded-full opacity-50"></div>

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-5 shadow-sm text-[#9A6E44]">
          <PackageOpen size={20} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Refill Reminder</h3>
        <p className="text-sm text-gray-700 font-medium leading-relaxed mb-6 max-w-[280px]">
          Your 'Ashwagandha Churna' from Order #AY-97121 is estimated to run out in 5 days.
        </p>

        <button
          onClick={() => navigate('/patient/pharmacy-store')}
          className="bg-[#9A6E44] hover:bg-[#835A35] text-white text-[11px] font-extrabold uppercase tracking-widest py-3.5 px-6 rounded-full transition-colors shadow-sm w-fit"
        >
          Reorder Now
        </button>
      </div>
    </div>
  );
};

export default RefillReminderCard;
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const RefillReminderCard = () => {
  return (
    <div className="bg-[#FDF1E8] rounded-[32px] p-8 relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -right-6 -bottom-6 text-[#F9E0CC] opacity-50">
        <ShoppingBag size={120} strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Refill Reminder</h3>
        <p className="text-sm text-gray-700 font-medium leading-relaxed mb-6 max-w-[280px]">
          Your "Ashwagandha Extract" is running low. Reorder now to maintain your wellness streak.
        </p>
        <button className="text-sm font-bold text-gray-900 underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900 transition-all rounded-full outline-none focus:ring-2 focus:ring-gray-300 px-2 py-1 -ml-2">
          Reorder Item
        </button>
      </div>
    </div>
  );
};

export default RefillReminderCard;
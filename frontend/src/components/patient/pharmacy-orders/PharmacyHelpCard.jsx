import React from 'react';
import { Headset } from 'lucide-react';

const PharmacyHelpCard = () => {
  return (
    <div className="bg-[#F4F1EB] rounded-[32px] p-8 border border-[#EFEBE1] h-full flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
        <Headset size={20} className="text-[#D9774B]" />
        <h3 className="text-lg font-bold text-gray-900">Need Help with an Order?</h3>
      </div>

      <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
        Our Ayurvedic pharmacists are available for a quick consultation regarding your prescriptions.
      </p>

      <button className="bg-white hover:bg-gray-50 border border-[#EFEBE1] text-gray-900 font-bold text-sm py-3 px-6 rounded-full transition-colors shadow-sm w-fit">
        Chat with Pharmacy
      </button>
    </div>
  );
};

export default PharmacyHelpCard;
import React from 'react';
import { User, MapPin, Phone, Mail } from 'lucide-react';

const CustomerInfoCard = ({ customer }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#EFEBE1]">
        <div className="w-10 h-10 rounded-full bg-[#FDF1E8] flex items-center justify-center text-[#D9774B]">
          <User size={20} />
        </div>
        <div>
          <p className="text-[12px] font-bold text-green-700 uppercase tracking-widest mb-0.5">Customer</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{customer.name}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-gray-600 leading-relaxed">{customer.address}</p>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-gray-400 shrink-0" />
          <p className="text-sm font-bold text-gray-900">{customer.phone}</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <p className="text-sm font-medium text-gray-900 break-all">{customer.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
import React from 'react';
import { MapPin } from 'lucide-react';

const ContactInfoCard = ({ profile, isEditing, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="space-y-5">
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gray-100 rounded-2xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const safeProfile = profile || {};

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FEF5D3] p-2.5 rounded-xl text-[#A67C00]">
          <MapPin size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={safeProfile.email || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={safeProfile.phone || safeProfile.mobile || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Residential Address
          </label>
          <textarea
            rows="2"
            name="address"
            value={safeProfile.address || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
import React from 'react';
import { User, Camera } from 'lucide-react';

const AccountInfoCard = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-full">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-100 rounded-2xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const safeData = data || {};

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Account Information</h3>

      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#EFEBE1]">
        <div className="relative">
          <div className="w-20 h-20 bg-[#E7F3EB] rounded-full flex items-center justify-center text-[#4A7C59] text-2xl font-bold border-4 border-white shadow-sm overflow-hidden">
            {safeData.avatar ? (
              <img src={safeData.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} />
            )}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3A6447] text-white rounded-full border-2 border-white flex items-center justify-center shadow-sm hover:bg-[#2C4D36] transition-colors">
              <Camera size={14} />
            </button>
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900">{safeData.name || safeData.full_name || 'Patient User'}</h4>
          <p className="text-sm font-medium text-gray-500">Update your photo and personal details here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Full Name
          </label>
          <input
            type="text"
            value={safeData.name || safeData.full_name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Email Address
          </label>
          <input
            type="email"
            value={safeData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
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
            value={safeData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Timezone
          </label>
          <select
            value={safeData.timezone || 'Asia/Kolkata'}
            onChange={(e) => onChange('timezone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50 appearance-none"
          >
            <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
            <option value="America/New_York">EST (Eastern Standard Time)</option>
            <option value="Europe/London">GMT (Greenwich Mean Time)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;
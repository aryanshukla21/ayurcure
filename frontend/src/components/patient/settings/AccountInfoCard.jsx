import React from 'react';
import { User } from 'lucide-react';

const AccountInfoCard = ({ data, isEditing, onChange }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#EFEBE1]">
        <div className="w-10 h-10 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#2D5A27]">
          <User size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors"
            />
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.phone}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Preferred Language</label>
          {isEditing ? (
            <select
              value={data.language}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors appearance-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Sanskrit">Sanskrit</option>
            </select>
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.language}</p>
          )}
        </div>

        {/* Time Zone */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Time Zone</label>
          {isEditing ? (
            <select
              value={data.timeZone}
              onChange={(e) => onChange('timeZone', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors appearance-none cursor-pointer"
            >
              <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
              <option value="America/New_York (EST)">America/New_York (EST)</option>
              <option value="Europe/London (GMT)">Europe/London (GMT)</option>
            </select>
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.timeZone}</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AccountInfoCard;
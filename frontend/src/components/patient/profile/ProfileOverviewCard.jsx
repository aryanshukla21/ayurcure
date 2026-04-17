import React from 'react';
import { User, Edit2, Save, Download } from 'lucide-react';

const ProfileOverviewCard = ({ profile, isEditing, onEditToggle, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm animate-pulse flex flex-col justify-between h-full min-h-[200px]">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full shrink-0"></div>
          <div className="space-y-3 flex-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <div className="h-12 bg-gray-200 rounded-full w-32"></div>
          <div className="h-12 bg-gray-100 rounded-full w-32"></div>
        </div>
      </div>
    );
  }

  const safeProfile = profile || {};
  const name = safeProfile.name || safeProfile.full_name || 'Patient User';
  const patientId = safeProfile.patientId || safeProfile.id || 'AYUR-1001';

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm relative overflow-hidden group h-full flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FDF9EE] rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700"></div>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-[#E7F3EB] rounded-full flex items-center justify-center text-[#4A7C59] border-4 border-white shadow-sm text-3xl font-bold">
            {name.charAt(0)}
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#4A7C59] rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">{name}</h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">ID: {patientId}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={onEditToggle}
          className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ${isEditing
              ? 'bg-[#3A6447] hover:bg-[#2C4D36] text-white'
              : 'bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700'
            }`}
        >
          {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
        </button>

        <button className="px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 bg-[#FDF9EE] text-[#8B6A47] hover:bg-[#F4EBD9] transition-colors shadow-sm">
          <Download size={16} /> Download Data
        </button>
      </div>
    </div>
  );
};

export default ProfileOverviewCard;
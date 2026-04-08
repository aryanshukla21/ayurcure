import React from 'react';
import { Shield } from 'lucide-react';

const PrivacySettingsCard = ({ data, isEditing, onChange }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EFEBE1]">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Shield size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
      </div>

      <div className="flex flex-col gap-6">

        {/* Profile Visibility */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Profile Visibility</label>
          <p className="text-xs text-gray-500 font-medium mb-3">Control who can view your basic health profile summary.</p>

          {isEditing ? (
            <select
              value={data.profileVisibility}
              onChange={(e) => onChange('profileVisibility', e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#4A7C59] transition-colors appearance-none cursor-pointer"
            >
              <option value="Private">Private (Only Me)</option>
              <option value="Doctors Only">Assigned Doctors Only</option>
              <option value="Public">Public Clinic Network</option>
            </select>
          ) : (
            <p className="text-sm font-bold text-gray-900 p-3 bg-gray-50 rounded-xl border border-transparent cursor-not-allowed hover:bg-gray-100 transition-colors">{data.profileVisibility}</p>
          )}
        </div>

        <div className="h-px bg-[#EFEBE1] w-full my-2"></div>

        {/* Data Sharing (Toggle) */}
        <div className="flex items-center justify-between">
          <div className="pr-4">
            <h4 className="text-sm font-bold text-gray-900 mb-1">Clinical Data Sharing</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Allow anonymous data usage for Ayurvedic research.</p>
          </div>
          <button
            onClick={() => isEditing && onChange('dataSharing', !data.dataSharing)}
            disabled={!isEditing}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.dataSharing ? 'bg-[#4A7C59]' : 'bg-gray-200'
              } ${!isEditing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.dataSharing ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrivacySettingsCard;
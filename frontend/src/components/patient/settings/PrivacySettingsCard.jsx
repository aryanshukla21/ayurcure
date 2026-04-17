import React from 'react';
import { Shield, Eye, Database, Trash2 } from 'lucide-react';

const PrivacySettingsCard = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-full">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="space-y-4 mb-8">
          <div className="h-16 bg-gray-50 rounded-2xl w-full"></div>
          <div className="h-16 bg-gray-50 rounded-2xl w-full"></div>
        </div>
        <div className="h-12 bg-red-100 rounded-2xl w-full mt-auto"></div>
      </div>
    );
  }

  const safeData = data || {};

  const Toggle = ({ enabled, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={!isEditing}
      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 disabled:opacity-50 ${enabled ? 'bg-[#4A7C59]' : 'bg-gray-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  );

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#EFEBE1]">
        <div className="bg-[#FEF5D3] p-2.5 rounded-xl text-[#A67C00]">
          <Shield size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Privacy & Data</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Control your clinical data footprint.</p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-[#EFEBE1] transition-colors">
          <div className="flex items-center gap-4">
            <Eye size={18} className="text-gray-400" />
            <div>
              <h4 className="text-sm font-bold text-gray-900">Profile Visibility</h4>
              <p className="text-[10px] text-gray-500 font-medium">Allow practitioners to search your profile.</p>
            </div>
          </div>
          <Toggle enabled={safeData.profileVisibility !== false} onClick={() => onChange('profileVisibility', !(safeData.profileVisibility !== false))} />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-[#EFEBE1] transition-colors">
          <div className="flex items-center gap-4">
            <Database size={18} className="text-[#4A7C59]" />
            <div>
              <h4 className="text-sm font-bold text-gray-900">Anonymized Research</h4>
              <p className="text-[10px] text-gray-500 font-medium">Contribute data for Ayurvedic ML models.</p>
            </div>
          </div>
          <Toggle enabled={safeData.dataSharing} onClick={() => onChange('dataSharing', !safeData.dataSharing)} />
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-[#EFEBE1]">
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 rounded-2xl transition-colors text-sm border border-red-100">
          <Trash2 size={16} /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default PrivacySettingsCard;
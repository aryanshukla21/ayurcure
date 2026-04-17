import React from 'react';
import { AlertTriangle } from 'lucide-react';

const EmergencyContactCard = ({ emergency, isEditing, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="space-y-5">
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-12 bg-white rounded-2xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const safeEmergency = emergency || {};

  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="bg-red-100 p-2.5 rounded-xl text-red-500">
          <AlertTriangle size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Emergency Contact</h3>
      </div>

      <div className="space-y-5 relative z-10">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Contact Name
          </label>
          <input
            type="text"
            name="emergencyName"
            value={safeEmergency.emergencyName || safeEmergency.name || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Relationship
          </label>
          <input
            type="text"
            name="emergencyRelation"
            value={safeEmergency.emergencyRelation || safeEmergency.relation || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
            Contact Number
          </label>
          <input
            type="tel"
            name="emergencyPhone"
            value={safeEmergency.emergencyPhone || safeEmergency.phone || ''}
            onChange={onChange}
            disabled={!isEditing}
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all disabled:opacity-70 disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactCard;
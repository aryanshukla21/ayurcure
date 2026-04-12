import React from 'react';

const ConsultationSection = ({ formData, onChange, isEditing = true }) => {
  const inputBaseClass = `w-full mt-1 p-3.5 rounded-xl border text-sm font-bold transition-colors outline-none focus:ring-2 focus:ring-[#3A6447]/20 ${!isEditing ? 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed' : 'bg-[#FAF7F2] border-[#EFEBE1] text-gray-900'
    }`;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Consultation Logistics</h3>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultation Fee (₹)</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="e.g. 500"
            min="0"
            className={inputBaseClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={onChange}
              disabled={!isEditing}
              className={inputBaseClass}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={onChange}
              disabled={!isEditing}
              className={inputBaseClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSection;
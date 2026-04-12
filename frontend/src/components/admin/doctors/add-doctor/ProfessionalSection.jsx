import React from 'react';

const ProfessionalSection = ({ formData, onChange, isEditing = true }) => {
  const inputBaseClass = `w-full mt-1 p-3.5 rounded-xl border text-sm font-bold transition-colors outline-none focus:ring-2 focus:ring-[#3A6447]/20 ${!isEditing ? 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed appearance-none' : 'bg-[#FAF7F2] border-[#EFEBE1] text-gray-900'
    }`;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Professional Credentials</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialization</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={onChange}
            disabled={!isEditing}
            className={inputBaseClass}
          >
            <option value="">Select Specialization</option>
            <option value="Ayurvedic General Medicine">Ayurvedic General Medicine</option>
            <option value="Yoga Therapy">Yoga Therapy</option>
            <option value="Pancha-Karma Specialist">Pancha-Karma Specialist</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="e.g. AYU-2023-XXXX"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="e.g. BAMS, MD"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="e.g. 5"
            min="0"
            className={inputBaseClass}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSection;
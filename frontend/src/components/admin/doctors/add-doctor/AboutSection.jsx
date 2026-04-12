import React from 'react';

const AboutSection = ({ formData, onChange, isEditing = true }) => {
  const inputBaseClass = `w-full mt-1 p-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#3A6447]/20 resize-none ${!isEditing ? 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed' : 'bg-[#FAF7F2] border-[#EFEBE1] text-gray-900'
    }`;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">About the Doctor</h3>

      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biography & Philosophy</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={onChange}
          disabled={!isEditing}
          placeholder="Briefly describe the doctor's philosophy, specialties, and background..."
          rows="6"
          className={inputBaseClass}
        ></textarea>
      </div>
    </div>
  );
};

export default AboutSection;
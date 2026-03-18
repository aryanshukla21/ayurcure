import React from 'react';

const ReasonForVisitInput = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">
        Reason for Visit (Symptoms or Consultation Goal)
      </label>
      <textarea 
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl p-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent resize-none"
        placeholder="Please describe your symptoms, health history, or wellness goals for this session..."
      ></textarea>
    </div>
  );
};

export default ReasonForVisitInput;
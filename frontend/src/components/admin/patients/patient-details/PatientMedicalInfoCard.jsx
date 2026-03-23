import React from 'react';
import { ShieldPlus } from 'lucide-react';

const PatientMedicalInfoCard = ({ medicalInfo }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 md:p-10 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center gap-3 ">
        <ShieldPlus size={24} className="text-[#4A7C59]" strokeWidth={2.5} />
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Medical Info</h3>
      </div>

      {/* Conditions */}
      <div className="mb-8">
        <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest mb-4">
          Conditions
        </p>
        <div className="flex flex-wrap gap-3">
          {medicalInfo.conditions.map((condition, i) => (
            <span key={i} className="bg-white border border-[#EFEBE1] text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
              {condition}
            </span>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="mb-10">
        <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest mb-4">
          Allergies
        </p>
        <div className="flex flex-wrap gap-3">
          {medicalInfo.allergies.map((allergy, i) => (
            <span key={i} className="bg-[#FEE4E2]/60 text-[#D92D20] px-4 py-2 rounded-xl text-sm font-bold">
              {allergy}
            </span>
          ))}
        </div>
      </div>

      {/* Current Medications Box */}
      <div className="bg-[#EFEBE1]/60 rounded-[24px] p-6 border border-[#EFEBE1] mt-auto">
        <p className="text-[11px] font-bold text-[#6D5E7B] uppercase tracking-widest mb-4">
          Current Medications
        </p>
        <ul className="space-y-3">
          {medicalInfo.medications.map((med, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D5E7B] mt-2 shrink-0"></span>
              <span className="text-sm font-bold text-gray-900">
                {med.name} {med.dosage}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PatientMedicalInfoCard;
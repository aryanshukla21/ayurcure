import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const PatientProfileSummary = ({ profile }) => {
  // Default fallbacks to prevent crashes if data is missing
  const {
    name = "Patient Name",
    constitution = "Not Assessed",
    age = "-",
    gender = "-",
    bloodGroup = "Unknown",
    knownConditions = "None",
    location = "Unknown",
    lastCheckup = "No record",
    status = "ACTIVE CARE"
  } = profile;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EFEBE1] h-full flex flex-col justify-between">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-[#2C5F44] rounded-2xl flex items-center justify-center shrink-0">
          <div className="text-white text-center">
            <span className="text-2xl font-bold">{name.charAt(0)}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <p className="text-sm text-amber-800 font-medium">{constitution} Constitution</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              {status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Age / Gender</p>
              <p className="text-sm font-semibold text-gray-900">{age} / {gender}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Blood Group</p>
              <p className="text-sm font-semibold text-gray-900">{bloodGroup}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Known Conditions</p>
              <p className="text-sm font-semibold text-amber-700">{knownConditions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-gray-400" />
          {location}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-gray-400" />
          Last Checkup: {lastCheckup}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileSummary;
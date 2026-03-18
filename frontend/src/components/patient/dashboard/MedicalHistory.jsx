import React from 'react';
import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const MedicalHistory = ({ history }) => {
  const { pastDiagnoses = [], surgeries = [], chronicConditions = [], doctorsNote = "No notes available." } = history;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EFEBE1] border-t-green-600 border-t-4">
      <div className="flex items-center gap-2 mb-6 text-[#2C5F44]">
        <FileText size={20} />
        <h2 className="text-xl font-bold text-green-700">Medical History / About</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        {/* Past Diagnoses */}
        <div>
          <h3 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-3">Past Diagnoses</h3>
          <ul className="space-y-3">
            {pastDiagnoses.length > 0 ? pastDiagnoses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                {item.name} ({item.date})
              </li>
            )) : <li className="text-sm text-gray-400 italic">None</li>}
          </ul>
        </div>

        {/* Surgeries */}
        <div>
          <h3 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-3">Surgeries</h3>
          <ul className="space-y-3">
            {surgeries.length > 0 ? surgeries.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                {item.name} ({item.date})
              </li>
            )) : <li className="text-sm text-gray-400 italic">N/A</li>}
          </ul>
        </div>

        {/* Chronic Conditions */}
        <div>
          <h3 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-3">Chronic Conditions</h3>
          <ul className="space-y-3">
            {chronicConditions.length > 0 ? chronicConditions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                <AlertCircle size={16} className={item.severe ? "text-red-400 shrink-0 mt-0.5" : "text-[#A88B5D] shrink-0 mt-0.5"} />
                {item.name}
              </li>
            )) : <li className="text-sm text-gray-400 italic">None</li>}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-[#EAE5D9]">
        <p className="text-sm text-gray-600 italic">"{doctorsNote}"</p>
      </div>
    </div>
  );
};

export default MedicalHistory;
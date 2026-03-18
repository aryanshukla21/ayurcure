import React from 'react';
import { ClipboardList } from 'lucide-react';

const ConsultationSummaryCard = ({ summary }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFEBE1] h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <ClipboardList size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Consultation Summary</h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Diagnosis / Observation</p>
          <p className="text-sm font-bold text-gray-900">{summary?.diagnosis || 'Vata-Pitta Imbalance'}</p>
        </div>
        
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Doctor's Notes</p>
          <p className="text-sm text-gray-600 leading-relaxed bg-[#FAFAF8] p-5 rounded-2xl border border-[#EFEBE1] italic">
            "{summary?.notes || 'Patient reported improved digestion but still struggles with sleep continuity. Pulse indicates elevated Vata. Recommended to adjust evening routine and continue herbal support.'}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recorded Weight</p>
            <p className="text-sm font-bold text-gray-900">{summary?.vitals?.weight || '74.5 kg'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Blood Pressure</p>
            <p className="text-sm font-bold text-gray-900">{summary?.vitals?.bp || '120/80 mmHg'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSummaryCard;
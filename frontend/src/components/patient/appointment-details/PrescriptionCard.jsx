import React from 'react';
import { Pill, Download, Clock } from 'lucide-react';

const PrescriptionCard = ({ medications }) => {
  const defaultMeds = [
    { name: 'Ashwagandha Extract', dosage: '500mg', frequency: 'Twice daily', timing: 'After meals', duration: '30 Days' },
    { name: 'Triphala Guggulu', dosage: '2 Tablets', frequency: 'Once daily', timing: 'Before bed with warm water', duration: '15 Days' }
  ];

  const medsToRender = medications && medications.length > 0 ? medications : defaultMeds;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFEBE1] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#4A7C59] shrink-0">
            <Pill size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Prescription</h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#4A7C59] bg-[#FDF9EE] rounded-xl hover:bg-[#EAE5D9] transition-colors border border-[#EFEBE1]">
          <Download size={14} />
          Download PDF
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {medsToRender.map((med, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-[#EFEBE1] bg-[#FAFAF8] hover:border-[#4A7C59]/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-bold text-gray-900">{med.name}</h4>
              <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-[10px] font-bold rounded-lg shadow-sm">
                {med.duration}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                <Pill size={12} className="text-gray-400" />
                {med.dosage} • {med.frequency}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                <Clock size={12} className="text-gray-400" />
                {med.timing}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionCard;
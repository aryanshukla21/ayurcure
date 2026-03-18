import React from 'react';
import { AlignLeft, CheckCircle2 } from 'lucide-react';

const PreparationNotesCard = ({ notes, instructions }) => {
  return (
    <div className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#EFEBE1] h-full">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlignLeft size={20} className="text-[#4A7C59]" />
          <h3 className="text-lg font-bold text-gray-900">Your Symptoms & Notes</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed bg-white p-5 rounded-2xl border border-[#EFEBE1] italic">
          "{notes || 'No specific notes provided during booking.'}"
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Pre-Consultation Instructions</h3>
        <ul className="space-y-3">
          {instructions && instructions.length > 0 ? (
            instructions.map((instruction, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-[#4A7C59] shrink-0 mt-0.5" />
                {instruction}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 italic">No specific instructions provided.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PreparationNotesCard;
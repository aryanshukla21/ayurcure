import React from 'react';
import { Leaf, CheckCircle2, XCircle } from 'lucide-react';

const DietAndLifestyleCard = ({ plan }) => {
  const dos = plan?.dos || ['Drink warm water throughout the day', 'Practice 15 mins of Anulom Vilom', 'Eat meals at consistent times'];
  const donts = plan?.donts || ['Avoid raw salads after sunset', 'Reduce caffeine intake', 'Avoid screen time 1 hour before bed'];

  return (
    <div className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#EFEBE1] h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
          <Leaf size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Diet & Lifestyle Plan</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Do's */}
        <div>
          <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle2 size={14} /> Recommended
          </h4>
          <ul className="space-y-3">
            {dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div>
          <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <XCircle size={14} /> Avoid
          </h4>
          <ul className="space-y-3">
            {donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DietAndLifestyleCard;
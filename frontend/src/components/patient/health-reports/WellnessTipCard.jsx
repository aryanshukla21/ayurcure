// frontend/src/components/patient/health-reports/WellnessTipCard.jsx
import React from 'react';
import { Target } from 'lucide-react';

const WellnessTipCard = ({ goals, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#EAE5D9] rounded-[24px] p-6 border border-[#DFD9CB] animate-pulse">
        <div className="h-3 bg-gray-300 rounded w-32 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-2 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-2 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  // STRICT ARRAY CHECK: Prevents the "safeGoals.map is not a function" crash.
  // If the backend sends an object (or null/undefined), it forces it to be an empty array [].
  const safeGoals = Array.isArray(goals) ? goals : [];

  return (
    <div className="bg-[#EAE5D9] rounded-[24px] p-6 border border-[#DFD9CB]">
      <div className="flex items-center gap-2 mb-5">
        <Target size={16} className="text-[#79563E]" />
        <h3 className="text-[11px] font-bold text-[#79563E] uppercase tracking-widest">
          Prakriti Goals
        </h3>
      </div>

      <div className="space-y-5">
        {safeGoals.map((goal, index) => (
          <div key={goal.id || index}>
            <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-2">
              <span>{goal.title || 'Goal'}</span>
              <span>{goal.progress || 0}%</span>
            </div>
            {/* Progress Bar Track */}
            <div className="w-full bg-[#DFD9CB] rounded-full h-2">
              {/* Progress Bar Fill */}
              <div
                className="bg-[#79563E] h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${goal.progress || 0}%` }}
              ></div>
            </div>
          </div>
        ))}

        {safeGoals.length === 0 && (
          <p className="text-sm font-semibold text-gray-600 leading-relaxed">
            No specific goals tracked yet. Consult your doctor to set a routine.
          </p>
        )}
      </div>
    </div>
  );
};

export default WellnessTipCard;
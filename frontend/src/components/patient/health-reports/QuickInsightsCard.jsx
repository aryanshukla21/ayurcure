// frontend/src/components/patient/health-reports/QuickInsightsCard.jsx
import React from 'react';
import { Activity, Clock } from 'lucide-react';

const QuickInsightsCard = ({ insights, lastChanged }) => {
  const formattedDate = lastChanged?.last_updated
    ? new Date(lastChanged.last_updated).toLocaleDateString()
    : 'No records';

  return (
    <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#EBCB8B]/20 p-3 rounded-xl text-[#D4A373]">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Quick Insights</h3>
          <p className="text-xs text-gray-500 font-medium">Last 30 Days Average</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-[#FDF9EE] p-3 rounded-xl border border-[#EFEBE1]">
          <span className="text-sm font-bold text-gray-600">Sleep Average</span>
          <span className="text-sm font-extrabold text-gray-900">{insights?.average_sleep || 0} hrs/night</span>
        </div>
        <div className="flex justify-between items-center bg-[#FDF9EE] p-3 rounded-xl border border-[#EFEBE1]">
          <span className="text-sm font-bold text-gray-600">Hydration Status</span>
          <span className={`text-sm font-extrabold ${insights?.hydration_status === 'Optimal' ? 'text-[#4A7C59]' : 'text-amber-600'}`}>
            {insights?.hydration_status || 'Unknown'}
          </span>
        </div>
        <div className="flex justify-between items-center bg-[#FDF9EE] p-3 rounded-xl border border-[#EFEBE1]">
          <span className="text-sm font-bold text-gray-600">Stress Trend</span>
          <span className="text-sm font-extrabold text-gray-900">{insights?.stress_trend || 'Stable'}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#EFEBE1] flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <Clock size={14} /> Last Update: {formattedDate}
      </div>
    </div>
  );
};

export default QuickInsightsCard;
import React from 'react';
import { Users, TrendingUp, Activity, Clock } from 'lucide-react';

const PatientMetricsRow = ({ metrics, total }) => {
  const data = [
    { title: 'Total Patients', value: total || 0, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'New This Week', value: metrics?.newThisWeek || 0, icon: <TrendingUp size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pending Reviews', value: metrics?.pendingReviews || 0, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Average Age', value: metrics?.averageAge || 0, icon: <Activity size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
            <h3 className="text-2xl font-black text-gray-900">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PatientMetricsRow;
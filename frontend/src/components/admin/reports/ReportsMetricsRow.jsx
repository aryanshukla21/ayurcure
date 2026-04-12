import React from 'react';
import { Receipt, ShoppingCart, Users, Stethoscope, TrendingUp } from 'lucide-react';

const OVERALL_METRICS = [
  { label: 'Total Revenue', value: '₹4,82,900', trend: '+8.2%', icon: Receipt, color: 'text-[#3A6447]', bg: 'bg-[#E7F3EB]' },
  { label: 'Total Orders', value: '1,240', trend: '+14%', icon: ShoppingCart, color: 'text-[#D9774B]', bg: 'bg-[#FDF1E8]' },
  { label: 'Total Patients', value: '3,892', trend: '+5.4%', icon: Users, color: 'text-[#9333EA]', bg: 'bg-[#F3E8FF]' },
  { label: 'Total Doctors', value: '48', trend: '+2.1%', icon: Stethoscope, color: 'text-[#A67C00]', bg: 'bg-[#FEF5D3]' },
];

const LAST_30_METRICS = [
  { label: 'Revenue (30d)', value: '₹84,500', trend: '+12.5%', icon: Receipt, color: 'text-[#3A6447]', bg: 'bg-[#E7F3EB]' },
  { label: 'Orders (30d)', value: '312', trend: '+18%', icon: ShoppingCart, color: 'text-[#D9774B]', bg: 'bg-[#FDF1E8]' },
  { label: 'New Patients (30d)', value: '145', trend: '+3.2%', icon: Users, color: 'text-[#9333EA]', bg: 'bg-[#F3E8FF]' },
  { label: 'Active Doctors (30d)', value: '42', trend: '0%', icon: Stethoscope, color: 'text-[#A67C00]', bg: 'bg-[#FEF5D3]' },
];

const ReportsMetricsRow = ({ timeFilter }) => {
  const currentMetrics = timeFilter === 'overall' ? OVERALL_METRICS : LAST_30_METRICS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {currentMetrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color}`}>
              <metric.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold text-[#3A6447]`}>
              <TrendingUp size={14} />
              {metric.trend}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{metric.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsMetricsRow;
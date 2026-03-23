import React from 'react';
import { BriefcaseMedical, Users, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const STATS = [
  { label: 'Total Doctors', value: '142', trend: '+12%', isUp: true, icon: BriefcaseMedical, color: 'text-[#3A6447] bg-[#E7F3EB]' },
  { label: 'Total Patients', value: '1,840', trend: '+5.4%', isUp: true, icon: Users, color: 'text-[#D9774B] bg-[#FFF4EB]' },
  { label: 'Total Orders', value: '582', trend: '+8.2%', isUp: true, icon: ShoppingCart, color: 'text-[#9333EA] bg-[#F3E8FF]' },
  { label: 'Total Revenue', value: '$42k', trend: '-2.1%', isUp: false, icon: DollarSign, color: 'text-[#A67C00] bg-[#FEF5D3]' },
];

const DashboardStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {STATS.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-[#3A6447]' : 'text-[#D9774B]'}`}>
              {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {stat.trend}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatCards;
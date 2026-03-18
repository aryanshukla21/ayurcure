import React from 'react';
import { Filter, Calendar as CalendarIcon } from 'lucide-react';

const AppointmentsTabs = ({ activeTab, setActiveTab }) => {
  // Added 'all' as the first tab
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="flex justify-between items-center bg-white p-2 rounded-3xl shadow-sm border border-[#EFEBE1] mb-8">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
              ? 'bg-[#4A7C59] text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex space-x-3 pr-2">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-[#FDF9EE] rounded-xl hover:bg-[#EAE5D9] transition-colors border border-transparent hover:border-[#EFEBE1]">
          <Filter size={16} /> Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-[#FDF9EE] rounded-xl hover:bg-[#EAE5D9] transition-colors border border-transparent hover:border-[#EFEBE1]">
          <CalendarIcon size={16} /> This Month
        </button>
      </div>
    </div>
  );
};

export default AppointmentsTabs;
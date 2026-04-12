import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import ReportsMetricsRow from '../../components/admin/reports/ReportsMetricsRow';
import ReportsChartsSection from '../../components/admin/reports/ReportsChartsSection';
import RevenueStreamCard from '../../components/admin/reports/RevenueStreamCard';
import TopPerformersSection from '../../components/admin/reports/TopPerformersSection';

const AdminReportsPage = () => {
  // Toggle between 'overall' and 'last30'
  const [timeFilter, setTimeFilter] = useState('overall');

  const toggleFilter = () => {
    setTimeFilter(prev => prev === 'overall' ? 'last30' : 'overall');
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300 h-full flex flex-col">

      {/* Header Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
            Reports
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Analytics overview for the current fiscal period.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={toggleFilter}
            className="bg-white border border-[#EFEBE1] px-4 py-3.5 rounded-full flex items-center gap-2 text-sm font-bold text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Calendar size={16} className="text-gray-400" />
            {timeFilter === 'overall' ? 'Overall' : 'Last 30 Days'}
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center gap-2 transition-colors shadow-sm text-sm print:hidden"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* 1. Top Metrics - Pass the filter state */}
      <ReportsMetricsRow timeFilter={timeFilter} />

      {/* 2. Charts */}
      <ReportsChartsSection />

      {/* 3. Revenue Stream */}
      <RevenueStreamCard />

      {/* 4. Top Performers Lists */}
      <TopPerformersSection />

      {/* Spacer for bottom breathing room */}
      <div className="h-10"></div>
    </div>
  );
};

export default AdminReportsPage;
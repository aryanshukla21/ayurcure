import React from 'react';
import { Calendar } from 'lucide-react';
import DashboardStatCards from '../../components/admin/dashboard/DashboardStatCards';
import RecentDoctorsList from '../../components/admin/dashboard/RecentDoctorsList';
import RecentPatientsList from '../../components/admin/dashboard/RecentPatientsList';
import RecentOrdersTable from '../../components/admin/dashboard/RecentOrdersTable';

const AdminDashboardPage = () => {
  // Get dynamic current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto">

      {/* Header aligned parallel with Date */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clinic Overview</p>
          <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none">Dashboard</h1>
        </div>

        {/* Dynamic Date */}
        <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2.5 rounded-full border border-[#EFEBE1] shadow-sm w-fit h-fit mb-1">
          <Calendar size={16} />
          <span className="text-xs font-bold tracking-wide">Today: {currentDate}</span>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <DashboardStatCards />

      {/* Middle Row (Doctors & Patients) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RecentDoctorsList />
        <RecentPatientsList />
      </div>

      {/* Bottom Table */}
      <RecentOrdersTable />

    </div>
  );
};

export default AdminDashboardPage;
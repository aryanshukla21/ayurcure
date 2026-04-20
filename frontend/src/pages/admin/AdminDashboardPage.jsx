import React, { useState, useEffect } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import DashboardStatCards from '../../components/admin/dashboard/DashboardStatCards';
import RecentDoctorsList from '../../components/admin/dashboard/RecentDoctorsList';
import RecentPatientsList from '../../components/admin/dashboard/RecentPatientsList';
import RecentOrdersTable from '../../components/admin/dashboard/RecentOrdersTable';

const AdminDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    stats: { totalDoctors: 0, totalPatients: 0, totalOrders: 0, totalRevenue: 0 },
    recentDoctors: [],
    recentPatients: [],
    recentOrders: []
  });

  // Get dynamic current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats concurrently
        const [docRes, patRes, ordRes, revRes] = await Promise.all([
          adminApi.getTotalDoctors(),
          adminApi.getTotalPatients(),
          adminApi.getTotalOrders(),
          adminApi.getTotalRevenue()
        ]);

        // Fetch recent lists
        const [recentDocs, recentPats, recentOrds] = await Promise.all([
          adminApi.getRecentDoctors(),
          adminApi.getRecentPatients(),
          adminApi.getRecentOrders()
        ]);

        setData({
          stats: {
            totalDoctors: docRes.count || 0,
            totalPatients: patRes.count || 0,
            totalOrders: ordRes.count || 0,
            totalRevenue: revRes.revenue || 0
          },
          recentDoctors: recentDocs.doctors || [],
          recentPatients: recentPats.patients || [],
          recentOrders: recentOrds.orders || []
        });
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300">

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
      <DashboardStatCards stats={data.stats} />

      {/* Middle Row (Doctors & Patients) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RecentDoctorsList doctors={data.recentDoctors} />
        <RecentPatientsList patients={data.recentPatients} />
      </div>

      {/* Bottom Table */}
      <RecentOrdersTable orders={data.recentOrders} />

    </div>
  );
};

export default AdminDashboardPage;
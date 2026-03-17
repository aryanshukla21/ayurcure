import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, Video, TrendingUp } from 'lucide-react';
import { doctorApi } from '../../api/doctorApi';

import DashboardHeader from '../../components/doctor/dashboard/DashboardHeader';
import StatCard from '../../components/doctor/dashboard/StatCard';
import UpcomingAppointmentsTable from '../../components/doctor/dashboard/UpcomingAppointmentsTable';
import EarningsSummaryCard from '../../components/doctor/dashboard/EarningsSummaryCard';

const DoctorDashboard = () => {
    // ... [Keep your existing State and UseEffect code exactly as it is] ...
    const [isLoading, setIsLoading] = useState(false); // Make sure you keep your fetch logic here
    const dashboardData = {
        stats: { totalPatients: 1280, appointmentsToday: 14, upcomingConsultations: 8 },
        upcomingAppointments: [
            { id: 1, name: 'Sarah Chen', time: '09:30 AM', type: 'Video', status: 'Confirmed' },
            { id: 2, name: 'James Miller', time: '11:00 AM', type: 'Physical', status: 'Confirmed' },
            { id: 3, name: 'Laura White', time: '02:15 PM', type: 'Video', status: 'Confirmed' },
            { id: 4, name: 'Robert King', time: '04:45 PM', type: 'Physical', status: 'Cancelled' },
        ],
        earnings: { total: 12450, monthly: 4200 }
    };
    const { stats, upcomingAppointments, earnings } = dashboardData;

    return (
        // {/* Set explicitly to the off-white background and added large padding */ }
        < div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full" >

            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 text-xs">
                    Welcome back. You have <span className="font-bold text-gray-700">{stats.appointmentsToday} consultations</span> scheduled for today.
                </p>
            </div>

            {/* Added gap-8 to space out the top cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <StatCard
                    title="Total Patients"
                    value={stats.totalPatients.toLocaleString()}
                    icon={<Users size={16} />}
                    iconBgColor="bg-blue-50"
                    iconTextColor="text-blue-600"
                    bottomContent={<><TrendingUp size={18} className="mr-1.5 text-green-600" /> <span className="text-green-600">+12% from last month</span></>}
                />
                <StatCard
                    title="Appointments Today"
                    value={stats.appointmentsToday}
                    icon={<Calendar size={16} />}
                    iconBgColor="bg-orange-50"
                    iconTextColor="text-orange-500"
                    bottomContent={<><Clock size={18} className="mr-1.5 text-gray-500" /> <span className="text-gray-500">Next in 45 minutes</span></>}
                />
                <StatCard
                    title="Upcoming Consultations"
                    value={stats.upcomingConsultations}
                    icon={<Video size={16} />}
                    iconBgColor="bg-purple-50"
                    iconTextColor="text-purple-600"
                />
            </div>

            {/* Added gap-8 for the bottom section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2">
                <UpcomingAppointmentsTable appointments={upcomingAppointments} />
                <EarningsSummaryCard earnings={earnings} />
            </div>
        </div >
    );
};

export default DoctorDashboard;
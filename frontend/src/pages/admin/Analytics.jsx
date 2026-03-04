import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export const Analytics = () => {
  const recentBookings = [
    { patient: "Mahesh Kumar", email: "mahesh@example.com", doctor: "Dr. Aarav Sharma", date: "Oct 24, 2023", time: "10:30 AM", service: "Panchakarma", status: "Confirmed" },
    { patient: "Sunita Lakshmi", email: "sunita@example.com", doctor: "Dr. Priya Singh", date: "Oct 24, 2023", time: "12:15 PM", service: "Initial Consult", status: "Pending" },
    { patient: "Rohan Das", email: "rohan.d@example.com", doctor: "Dr. Aarav Sharma", date: "Oct 23, 2023", time: "04:00 PM", service: "Follow-up", status: "Completed" },
  ];

  return (
    <DashboardLayout activeTab="Analytics">
      <div className="space-y-8">
        
        {/* Top Header & Search */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 px-4 w-1/3 bg-gray-50 rounded-xl">
            <span className="text-gray-400">🔍</span>
            <input type="text" placeholder="Search analytics, doctors, or orders..." className="w-full bg-transparent p-3 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100">🔔</button>
            <div className="w-10 h-10 rounded-full bg-ayur-green-light border-2 border-ayur-green flex items-center justify-center font-bold text-ayur-green">A</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-500 font-medium">Total Bookings</p>
              <span className="p-2 bg-orange-50 text-ayur-orange rounded-lg">📅</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">1,284</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +12.5% <span className="text-gray-400 font-normal">vs last month</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-500 font-medium">Active Patients</p>
              <span className="p-2 bg-blue-50 text-blue-500 rounded-lg">👥</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">856</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +5.2% <span className="text-gray-400 font-normal">vs last month</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-500 font-medium">Total Revenue</p>
              <span className="p-2 bg-green-50 text-ayur-green rounded-lg">💰</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">$42,500</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +18.3% <span className="text-gray-400 font-normal">vs last month</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-500 font-medium">Avg. Rating</p>
              <span className="p-2 bg-yellow-50 text-yellow-500 rounded-lg">⭐</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">4.8</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +0.2% <span className="text-gray-400 font-normal">vs last month</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area Mock */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Revenue Growth</h3>
                <p className="text-sm text-gray-500">Monthly overview of consultations and sales</p>
              </div>
              <select className="bg-gray-50 border border-gray-200 text-sm p-2 rounded-lg outline-none">
                <option>Last 7 Months</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
               {/* Mock bars for chart */}
               {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                 <div key={i} className="w-full bg-ayur-orange/20 rounded-t-lg relative group hover:bg-ayur-orange transition-colors" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          {/* Doctor Availability */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Doctor Availability</h3>
            <div className="space-y-6">
              {['Dr. Aarav Sharma', 'Dr. Priya Singh', 'Dr. Anika Mehta'].map((doc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{doc}</h4>
                      <p className="text-xs text-gray-400">Ayurvedic Specialist</p>
                    </div>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-ayur-green-light text-ayur-green font-bold rounded-xl hover:bg-ayur-green hover:text-white transition-colors">
              Manage Schedules
            </button>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
            <button className="text-ayur-orange font-bold text-sm">View All Bookings</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-4 font-bold">Patient</th>
                <th className="pb-4 font-bold">Doctor</th>
                <th className="pb-4 font-bold">Date & Time</th>
                <th className="pb-4 font-bold">Service</th>
                <th className="pb-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentBookings.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{b.patient}</p>
                    <p className="text-xs text-gray-500">{b.email}</p>
                  </td>
                  <td className="py-4 text-gray-600">{b.doctor}</td>
                  <td className="py-4 text-gray-600">
                    <p>{b.date}</p>
                    <p className="text-xs">{b.time}</p>
                  </td>
                  <td className="py-4 text-gray-600">{b.service}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';

export const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Past Consultations');

  const appointments = [
    { doctor: "Dr. Anjali Sharma", spec: "Ayurvedic Specialist", date: "Oct 12, 2023", time: "10:30 AM", status: "COMPLETED", hasSummary: true },
    { doctor: "Dr. Vikram Seth", spec: "Panchakarma Expert", date: "Sep 25, 2023", time: "02:00 PM", status: "COMPLETED", hasSummary: true },
    { doctor: "Dr. Sneha Rao", spec: "Nutritionist", date: "Aug 30, 2023", time: "11:00 AM", status: "CANCELLED", hasSummary: false },
    { doctor: "Dr. Rajesh Iyer", spec: "Yoga Therapist", date: "Jul 15, 2023", time: "08:00 AM", status: "COMPLETED", hasSummary: true },
  ];

  return (
    <DashboardLayout activeTab="Appointments">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Appointments</h2>
        <p className="text-gray-500 mt-2">Keep track of your journey towards holistic wellness.</p>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-100 mb-8">
          <button 
            className={`pb-4 font-bold text-lg transition-colors ${activeTab === 'Upcoming' ? 'border-b-2 border-ayur-orange text-ayur-orange' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('Upcoming')}
          >
            Upcoming (2)
          </button>
          <button 
            className={`pb-4 font-bold text-lg transition-colors ${activeTab === 'Past Consultations' ? 'border-b-2 border-ayur-orange text-ayur-orange' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('Past Consultations')}
          >
            Past Consultations
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 px-4 w-1/2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-400">🔍</span>
            <input type="text" placeholder="Search by doctor or specialty..." className="w-full bg-transparent p-3 outline-none text-sm" />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2"><span>⚙️</span> Filter</Button>
            <Button variant="outline" className="flex items-center gap-2"><span>📥</span> Export</Button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-4 font-bold">Doctor & Specialty</th>
              <th className="pb-4 font-bold">Consultation Date</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.map((apt, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-ayur-green-light"></div>
                  <div>
                    <p className="font-bold text-gray-800">{apt.doctor}</p>
                    <p className="text-xs text-gray-500">{apt.spec}</p>
                  </div>
                </td>
                <td className="py-5 text-gray-600">
                  <p className="font-bold text-gray-800">{apt.date}</p>
                  <p className="text-xs">{apt.time}</p>
                </td>
                <td className="py-5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${apt.status === 'COMPLETED' ? 'text-ayur-green' : 'text-red-500'}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="py-5 text-right pr-4">
                  <div className="flex items-center justify-end gap-6">
                    {apt.hasSummary ? (
                      <button className="font-bold text-gray-600 hover:text-ayur-green">View Summary</button>
                    ) : (
                      <span className="text-gray-300 font-bold">No Summary</span>
                    )}
                    <button className="font-bold text-ayur-orange hover:text-orange-600">Rebook</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6 flex gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Need a follow-up?</h4>
              <p className="text-sm text-gray-600">It's recommended to have a follow-up consultation every 3 months for chronic conditions.</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 text-white flex gap-4">
            <span className="text-2xl">📄</span>
            <div>
              <h4 className="font-bold mb-1">Download All Records</h4>
              <p className="text-sm text-gray-400 mb-3">Generate a comprehensive medical report of all your past consultations.</p>
              <button className="text-ayur-orange font-bold text-sm">Generate Report →</button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
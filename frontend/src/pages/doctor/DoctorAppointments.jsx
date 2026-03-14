import React, { useState, useEffect } from 'react';
import { Search, Bell, Video, FileText, Download, Filter, Edit2, MoreHorizontal } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { doctorApi } from '../../api/doctorApi';

const DoctorAppointments = () => {
    const [profile, setProfile] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appointmentsRes] = await Promise.all([
                    doctorApi.getProfile(),
                    doctorApi.getAllAppointments()
                ]);
                setProfile(profileRes.profile);
                setAppointments(appointmentsRes.appointments);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center font-sans text-[16px] text-[#4A7C59]">Loading schedule...</div>;
    }

    // --- Derived Data Calculations ---
    const now = new Date();

    // Calculate Next Appointment
    const futureApps = appointments
        .filter(app => new Date(app.start_time || app.scheduled_at) >= now && app.status !== 'Cancelled')
        .sort((a, b) => new Date(a.start_time || a.scheduled_at) - new Date(b.start_time || b.scheduled_at));
    const nextAppointment = futureApps[0];

    let startsInText = "";
    if (nextAppointment) {
        const diffMins = Math.floor((new Date(nextAppointment.start_time || nextAppointment.scheduled_at) - now) / 60000);
        if (diffMins < 60) {
            startsInText = `Starting in ${diffMins} minutes`;
        } else {
            startsInText = `Starting in ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
        }
    }

    // Calculate Today's Appointments Count for the Chart Card
    const todaysCount = appointments.filter(app =>
        new Date(app.start_time || app.scheduled_at).toDateString() === now.toDateString()
    ).length;

    // Filter Logic for the Ledger
    const filteredAppointments = appointments.filter(app => {
        const appDate = new Date(app.start_time || app.scheduled_at);
        if (activeTab === 'Today') return appDate.toDateString() === now.toDateString();
        if (activeTab === 'Upcoming') return appDate >= now;
        if (activeTab === 'Past') return appDate < now;
        return true; // 'All'
    });

    return (
        <div className="flex h-screen bg-[#FAF8F5] font-sans text-gray-800">
            <Sidebar activePath="appointments" />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-[72px] px-8 flex items-center justify-between bg-[#FAF8F5] border-b border-gray-200 shrink-0">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full w-96 shadow-sm">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search patient records..." className="ml-2 outline-none bg-transparent w-full font-sans text-[14px] md:text-[16px] font-normal" />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-gray-500 hover:text-gray-700 relative">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* Page Title & Tabs */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="text-[14px] font-semibold text-gray-400 tracking-[0.5px] uppercase mb-1">PORTAL / APPOINTMENTS</p>
                            <h2>Patient Care Schedule</h2>
                            <p className="text-[16px] font-normal leading-[1.6] text-gray-600 mt-1">Manage your consultations and professional availability.</p>
                        </div>

                        {/* Custom Tab Navigation */}
                        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                            {['All', 'Today', 'Upcoming', 'Past'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 text-[14px] font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-[#FAF8F5] text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Overview Cards Row */}
                    <div className="grid grid-cols-3 gap-6 mb-8">

                        {/* 1. Next Appointment Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                            <p className="text-[14px] font-semibold text-gray-400 tracking-[0.5px] uppercase mb-4">Next Appointment</p>
                            {nextAppointment ? (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-[24px] text-gray-800 mb-1">{nextAppointment.patient_name}</h3>
                                        <p className="text-[14px] text-gray-500 font-medium">{startsInText}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 bg-[#6D597A] hover:bg-[#5b4a66] text-white py-2.5 rounded-lg text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                                            Join Telehealth
                                        </button>
                                        <button className="p-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                                            <FileText size={18} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-[14px] text-gray-500">No upcoming appointments today.</p>
                                </div>
                            )}
                        </div>

                        {/* 2. Daily Volume Chart Card */}
                        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#efe9dc] shadow-sm flex flex-col justify-between">
                            <p className="text-[14px] font-semibold text-gray-400 tracking-[0.5px] uppercase mb-4">Daily Volume</p>

                            {/* Pure CSS Bar Chart mimicking the design */}
                            <div className="flex items-end gap-2 h-[80px] mb-4 w-full">
                                {/* Mocking the week's data layout. The active day uses exact 'todaysCount' */}
                                {[40, 70, 50, 100, 60, 40].map((height, idx) => (
                                    <div key={idx} className="flex-1 bg-[#e4e1d9] rounded-t-md" style={{ height: `${height}%` }}></div>
                                ))}
                                <div className="flex-1 bg-[#4A7C59] rounded-t-md shadow-sm relative group" style={{ height: '80%' }}>
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {todaysCount}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <h3 className="text-[24px] text-gray-800 leading-none">{todaysCount} Cases</h3>
                                <span className="text-[14px] font-semibold text-green-600 flex items-center">
                                    ↑ 15%
                                </span>
                            </div>
                        </div>

                        {/* 3. Patient Wait Time Card */}
                        <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#efe9dc] shadow-sm flex flex-col justify-between">
                            <p className="text-[14px] font-semibold text-gray-400 tracking-[0.5px] uppercase mb-4">Patient Wait Time</p>
                            <div className="flex-1 flex flex-col justify-center items-center text-center">
                                <h3 className="text-[36px] font-serif text-gray-800 mb-2">~8m</h3>
                                <p className="text-[14px] text-gray-500 font-medium">Optimal range maintained</p>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Ledger Table */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3>Appointment Ledger</h3>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                    <Filter size={16} /> Filter By Type
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                    <Download size={16} /> Export
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[14px] font-semibold text-gray-400 border-b border-gray-100 bg-[#FAF8F5]">
                                        <th className="p-4 uppercase tracking-[0.5px] rounded-tl-lg">Patient Name</th>
                                        <th className="p-4 uppercase tracking-[0.5px]">Schedule</th>
                                        <th className="p-4 uppercase tracking-[0.5px]">Consultation</th>
                                        <th className="p-4 uppercase tracking-[0.5px]">Status</th>
                                        <th className="p-4 uppercase tracking-[0.5px] text-center rounded-tr-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((app) => (
                                        <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group h-[72px]">
                                            <td className="p-4 flex items-center gap-3 h-full">
                                                <div className="w-10 h-10 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center font-semibold text-[16px]">
                                                    {app.patient_name ? app.patient_name.charAt(0) : 'P'}
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-[16px] text-gray-800 block">{app.patient_name || 'Patient Name'}</span>
                                                    <span className="text-[14px] text-gray-400 font-medium">#{app.id.substring(0, 6).toUpperCase()}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-[16px] font-medium text-gray-800 block">
                                                    {new Date(app.start_time || app.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="text-[14px] text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                                                    <Clock size={14} /> {new Date(app.start_time || app.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {/* Styled tags matching the UI */}
                                                <span className={`text-[12px] font-bold px-3 py-1.5 rounded-md uppercase tracking-[0.5px] ${app.mode === 'Video' ? 'bg-[#EEF2F6] text-[#55779B]' : 'bg-[#F2F2F2] text-[#666666]'
                                                    }`}>
                                                    {app.mode === 'Video' ? 'TELEHEALTH' : 'IN-PERSON'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {/* Status Indicator Badges */}
                                                <span className="flex items-center gap-2 text-[14px] font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-full w-max shadow-sm">
                                                    <span className={`w-2 h-2 rounded-full ${app.status === 'Scheduled' || app.status === 'Confirmed' ? 'bg-[#4A7C59]' :
                                                        app.status === 'Completed' ? 'bg-gray-400' : 'bg-red-400'
                                                        }`}></span>
                                                    {app.status || 'Confirmed'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-3 text-gray-400">
                                                    <button className="hover:text-[#4A7C59] transition-colors"><Edit2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredAppointments.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-[16px] text-gray-500">
                                                No appointments found for the selected filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

// Simple Clock Icon fallback just for this file layout
const Clock = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

export default DoctorAppointments;
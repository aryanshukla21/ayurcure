import React, { useState, useEffect } from 'react';
import { Search, Bell, Video, UserCheck, Star, Award, Activity, Pill, Users, Calendar, FileText, X } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/doctor/StatCard';
import PrescriptionItem from '../../components/doctor/PrescriptionItem';
import { doctorApi } from '../../api/doctorApi';

const DoctorDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [appointmentsRes, dashRes] = await Promise.all([
                    doctorApi.getAllAppointments(),
                    doctorApi.getDashboardData()
                ]);

                setAppointments(appointmentsRes.appointments);
                setDashboardData(dashRes);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Fetch individual appointment details when a row is clicked
    const handleRowClick = async (appointmentId) => {
        setIsModalOpen(true);
        setModalLoading(true);
        try {
            const res = await doctorApi.getAppointment(appointmentId);
            setSelectedAppointment(res.appointment);
        } catch (err) {
            console.error("Failed to fetch appointment details:", err);
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    if (loading || !dashboardData) {
        return <div className="flex h-screen items-center justify-center font-sans text-[16px] text-[#4A7C59]">Loading clinical space...</div>;
    }

    // Filter today's appointments (using start_time as defined in your SQL schema)
    const todayAppointments = appointments.filter(app => {
        const appDate = app.start_time || app.scheduled_at;
        return new Date(appDate).toDateString() === new Date().toDateString();
    });

    const { stats, recentPrescriptions, recentReviews, insight, doctorName, specialization } = dashboardData;
    const review = recentReviews.length > 0 ? recentReviews[0] : null;

    // Helper to format "X hours ago"
    const timeAgo = (dateString) => {
        const diff = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
        if (diff < 1) return 'Just now';
        if (diff < 24) return `${diff} hours ago`;
        return `${Math.floor(diff / 24)} days ago`;
    };

    return (
        <div className="flex h-screen bg-[#FAF8F5] font-sans text-gray-800">
            <Sidebar activePath="dashboard" />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-[72px] px-8 flex items-center justify-between bg-[#FAF8F5] border-b border-gray-200 shrink-0">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full w-96 shadow-sm">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search patients, reports..." className="ml-2 outline-none bg-transparent w-full font-sans text-[14px] md:text-[16px] font-normal" />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-gray-500 hover:text-gray-700 relative">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6 border-gray-300">
                            <div className="text-right">
                                {/* Doctor Meta Info */}
                                <p className="text-[14px] font-semibold">{doctorName}</p>
                                <p className="text-[14px] font-normal text-gray-500">{specialization || 'Ayurvedic Specialist'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-white flex items-center justify-center font-semibold text-[16px]">
                                {doctorName ? doctorName.charAt(0).toUpperCase() : 'D'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            {/* H2 (Section Heading) */}
                            <h2>Good Morning, Dr. {doctorName.split(' ').pop()}</h2>
                            {/* Standard Body Paragraph */}
                            <p className="text-[16px] font-normal leading-[1.6] text-gray-600 mt-2">Your practice is flourishing today. You have {todayAppointments.length} consultations scheduled.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <StatCard icon={<Users className="text-blue-500" />} label="ACTIVE PATIENTS" value={stats.activePatients} />
                        <StatCard icon={<Calendar className="text-orange-500" />} label="APPOINTMENTS TODAY" value={todayAppointments.length} badge="Today" />
                        <StatCard icon={<FileText className="text-purple-500" />} label="NEW REPORTS" value={stats.newReports} badgeColor="text-green-600 bg-green-50" />
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 flex flex-col gap-8">

                            {/* Upcoming Appointments Table */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    {/* H3 (Sub Heading) */}
                                    <h3>Upcoming Appointments</h3>
                                    <button className="text-[14px] font-semibold text-gray-500 hover:text-[#4A7C59] tracking-[0.3px]">View Schedule</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-[14px] font-medium text-gray-400 border-b border-gray-100">
                                                <th className="pb-3 uppercase tracking-[0.3px]">Patient Name</th>
                                                <th className="pb-3 uppercase tracking-[0.3px]">Time</th>
                                                <th className="pb-3 uppercase tracking-[0.3px]">Type</th>
                                                <th className="pb-3 uppercase tracking-[0.3px]">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.slice(0, 4).map((app) => (
                                                <tr
                                                    key={app.id}
                                                    onClick={() => handleRowClick(app.id)}
                                                    className="border-b border-gray-50 last:border-0 h-[64px] cursor-pointer hover:bg-green-50 transition-colors"
                                                >
                                                    <td className="py-2 flex items-center gap-3 h-full">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
                                                            {app.patient_name ? app.patient_name.charAt(0) : 'P'}
                                                        </div>
                                                        <span className="font-semibold text-[16px] text-gray-800">{app.patient_name || 'Patient'}</span>
                                                    </td>
                                                    <td className="py-2 text-[14px] text-gray-600 font-medium">
                                                        {new Date(app.start_time || app.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td className="py-2">
                                                        <div className="flex items-center gap-1.5 text-[14px] text-gray-600 font-medium">
                                                            {app.mode === 'Video' ? <Video size={16} /> : <UserCheck size={16} />}
                                                            <span>{app.mode || 'In-Person'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2">
                                                        <span className={`text-[14px] font-semibold px-3 py-1 rounded-md uppercase tracking-[0.3px] ${app.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                                                            {app.status || 'CONFIRMED'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {appointments.length === 0 && (
                                                <tr><td colSpan="4" className="py-6 text-center text-[16px] font-normal text-gray-500">No upcoming appointments</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* DYNAMIC Patient Feedback */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6">
                                <div className="flex-1">
                                    {/* H4 (Card Title) */}
                                    <h4>Patient Feedback</h4>
                                    {review ? (
                                        <>
                                            <p className="text-gray-600 italic text-[16px] font-normal leading-[1.6] mb-4 mt-3">"{review.review_text}"</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-yellow-400">
                                                    {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                                </div>
                                                <span className="text-[14px] font-medium text-gray-500">— {review.patient_name}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500 text-[14px] font-normal mt-3">No recent reviews available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 flex flex-col gap-6">
                            {/* DYNAMIC Medical Insights */}
                            <div className="bg-[#4A7C59] p-6 rounded-xl text-white shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Activity size={20} />
                                    {/* H4 (Card Title) */}
                                    <h4>Medical Insights</h4>
                                </div>
                                <p className="text-[14px] font-normal text-green-50 leading-[1.6] mb-5">{insight}</p>
                                <button className="bg-white text-[#4A7C59] text-[14px] font-semibold px-4 py-2 rounded uppercase tracking-[0.3px] hover:bg-green-50 transition-colors">
                                    Analyze All
                                </button>
                            </div>

                            {/* DYNAMIC Recent Prescriptions */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                                <div className="flex justify-between items-center mb-5">
                                    {/* H4 (Card Title) */}
                                    <h4>Recent Prescriptions</h4>
                                    <Pill size={18} className="text-gray-400" />
                                </div>
                                <div className="flex flex-col gap-4 mb-4">
                                    {recentPrescriptions.length > 0 ? (
                                        recentPrescriptions.map((script) => (
                                            <PrescriptionItem
                                                key={script.id}
                                                name={script.medicine_name || 'Standard Ayurvedic Formula'}
                                                meta={`${script.patient_name} • ${timeAgo(script.created_at)}`}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-[14px] font-normal text-gray-500 text-center py-4">No recent prescriptions issued.</p>
                                    )}
                                </div>
                                {recentPrescriptions.length > 0 && (
                                    <button className="text-[14px] font-semibold tracking-[0.3px] text-gray-500 hover:text-[#4A7C59] w-full text-center mt-2">
                                        View All History
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ==================================================== */}
            {/* APPOINTMENT DETAILS MODAL */}
            {/* ==================================================== */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-[#FAF8F5]">
                            {/* H3 (Sub Heading) */}
                            <h3>Consultation Details</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            {modalLoading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A7C59]"></div>
                                </div>
                            ) : selectedAppointment ? (
                                <div className="flex flex-col gap-6">
                                    {/* Patient Header */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center text-[20px] font-semibold">
                                            {selectedAppointment.patient_name?.charAt(0)}
                                        </div>
                                        <div>
                                            {/* H4 mapped as explicit classes for Patient Name */}
                                            <h4 className="text-[20px] font-semibold text-gray-800">{selectedAppointment.patient_name}</h4>
                                            <p className="text-[14px] font-normal text-gray-500 mt-1">
                                                {selectedAppointment.age ? `${selectedAppointment.age} yrs` : 'Age N/A'} • {selectedAppointment.gender || 'Gender N/A'}
                                                {selectedAppointment.prakriti_type && ` • ${selectedAppointment.prakriti_type} Prakriti`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Date & Mode Blocks */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-[14px] text-gray-400 uppercase tracking-[0.3px] font-semibold mb-1">Time</p>
                                            <p className="text-[16px] font-semibold text-gray-800">
                                                {new Date(selectedAppointment.start_time || selectedAppointment.scheduled_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-[14px] text-gray-400 uppercase tracking-[0.3px] font-semibold mb-1">Mode</p>
                                            <div className="flex items-center gap-2 text-[16px] font-semibold text-[#4A7C59]">
                                                {selectedAppointment.mode === 'Video' ? <Video size={16} /> : <UserCheck size={16} />}
                                                {selectedAppointment.mode || 'In-Person'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medical Details */}
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="text-[14px] text-gray-400 uppercase tracking-[0.3px] font-semibold mb-2">Chief Complaint</p>
                                            <p className="text-[16px] font-normal text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-[1.6]">
                                                {selectedAppointment.chief_complaint || 'No chief complaint recorded prior to visit.'}
                                            </p>
                                        </div>

                                        {selectedAppointment.pre_consultation_symptoms && (
                                            <div>
                                                <p className="text-[14px] text-gray-400 uppercase tracking-[0.3px] font-semibold mb-2">Pre-visit Symptoms</p>
                                                <p className="text-[16px] font-normal text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-[1.6]">
                                                    {selectedAppointment.pre_consultation_symptoms}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-[16px] font-normal text-gray-500 py-6">Could not load appointment details.</p>
                            )}
                        </div>

                        <div className="p-5 border-t border-gray-100 bg-[#FAF8F5] flex justify-end gap-3">
                            {/* Standard Button Font */}
                            <button onClick={closeModal} className="px-5 py-2.5 text-[14px] md:text-[16px] font-semibold tracking-[0.3px] text-gray-600 hover:text-gray-800 transition-colors">
                                Cancel
                            </button>
                            {selectedAppointment && (
                                <button className="btn-primary">
                                    Join Consultation
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DoctorDashboard;
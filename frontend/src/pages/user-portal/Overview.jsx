import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Button } from '../../components/common/Button';
import {
  getUpcomingAppointments,
  getDoctorSlots,
  rescheduleAppointment,
  markAppointmentComplete
} from '../../api/appointmentApi';
import {
  getHealthStats,
  getDailyRoutine,
  getCurrentRegimen,
  getWellnessTip
} from '../../api/patientApi';

export const Overview = () => {
  const navigate = useNavigate();

  // States
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [regimen, setRegimen] = useState([]);
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [aptsRes, statsRes, routineRes, regimenRes, tipRes] = await Promise.all([
          getUpcomingAppointments(),
          getHealthStats(),
          getDailyRoutine(),
          getCurrentRegimen(),
          getWellnessTip()
        ]);

        setAppointments(aptsRes.data || []);
        setStats(statsRes.data || null);
        setRoutine(routineRes.data || null);
        setRegimen(regimenRes.data || []);
        setTip(tipRes.data || null);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOverviewData();
  }, []);

  // --- Appointment Logic ---
  const handleJoinSession = async (apt) => {
    const now = new Date();
    const start = new Date(apt.start_time);
    const end = new Date(apt.end_time);

    if (now < start) {
      const diffMs = start - now;
      const diffMins = Math.ceil(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      alert(`⏳ Session hasn't started yet. ${hours > 0 ? `${hours}h ` : ''}${mins}m left until your appointment.`);
    } else if (now > end) {
      try {
        await markAppointmentComplete(apt.id);
        setAppointments(prev => prev.filter(a => a.id !== apt.id));
        alert('✅ This session has ended and is now marked as complete.');
      } catch (err) {
        console.error("Failed to mark complete", err);
      }
    } else {
      // It's time!
      window.open(apt.meet_link || '#', '_blank');
    }
  };

  const openRescheduleModal = async (apt) => {
    setSelectedAppointment(apt);
    setShowRescheduleModal(true);
    try {
      const res = await getDoctorSlots(apt.doctor_id);
      setAvailableSlots(res.data || []);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    }
  };

  const handleConfirmReschedule = async () => {
    if (!selectedSlot) return alert("Please select a new slot.");
    try {
      await rescheduleAppointment(selectedAppointment.id, { new_slot_id: selectedSlot.id });
      alert("Appointment rescheduled successfully!");
      setShowRescheduleModal(false);
      setSelectedSlot(null);

      // Refresh appointments
      const res = await getUpcomingAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      alert("Failed to reschedule. Slot might be taken.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Default Stats if null
  const healthStats = stats || { weight: 0, sleep_hours: 0, dosha_balance: 0, bp: '0/0' };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* Upcoming Appointments */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <Link to="/dashboard/appointments" className="text-ayur-green text-sm font-bold hover:underline">
                  View All
                </Link>
              </div>

              {appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming appointments.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map(apt => (
                    <div key={apt.id} className="p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">👨‍⚕️</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Dr. {apt.doctor_name}</h3>
                          <p className="text-sm text-gray-500">{new Date(apt.start_time).toLocaleString()} • {apt.mode}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">{apt.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none py-2 text-sm" onClick={() => openRescheduleModal(apt)}>Reschedule</Button>
                        <Button variant="primary" className="flex-1 md:flex-none py-2 text-sm" onClick={() => handleJoinSession(apt)}>Join Session</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent Health Stats */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Health Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Weight</p>
                  <p className="text-2xl font-bold text-gray-900">{healthStats.weight} kg</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Sleep</p>
                  <p className="text-2xl font-bold text-gray-900">{healthStats.sleep_hours} hrs</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Blood Pressure</p>
                  <p className="text-2xl font-bold text-gray-900">{healthStats.bp}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Dosha Balance</p>
                  <p className="text-2xl font-bold text-ayur-green mb-2">{healthStats.dosha_balance}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-ayur-green h-1.5 rounded-full transition-all duration-1000" style={{ width: `${healthStats.dosha_balance}%` }}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Regimen */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Regimen</h2>
              {regimen.length === 0 ? (
                <p className="text-gray-500 text-sm">No active regimen prescriptions.</p>
              ) : (
                <div className="space-y-3">
                  {regimen.map(med => (
                    <div key={med.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">{med.medicine_name}</h4>
                        <p className="text-sm text-gray-500">{med.dosage} • {med.timing}</p>
                      </div>
                      <span className="text-xs font-bold text-ayur-orange bg-orange-50 px-2 py-1 rounded-md">{med.duration} left</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            {/* Daily Dincharya */}
            <section className="bg-[#2D5A27] text-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Daily Dincharya</h2>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3 items-start">
                  <span className="text-ayur-orange text-xl">🌅</span>
                  <div>
                    <p className="font-bold text-sm text-green-50">Morning</p>
                    <p className="text-sm opacity-90">{routine?.morning || "No routine set"}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-ayur-orange text-xl">☀️</span>
                  <div>
                    <p className="font-bold text-sm text-green-50">Afternoon</p>
                    <p className="text-sm opacity-90">{routine?.afternoon || "No routine set"}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-white text-ayur-green border-none hover:bg-gray-50" onClick={() => navigate('/dashboard/routine')}>
                View Full Routine
              </Button>
            </section>

            {/* Wellness Tip (Dynamic) */}
            <section className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
              <div className="flex gap-2 items-center mb-3">
                <span className="text-xl">💡</span>
                <h3 className="font-bold text-ayur-orange">Wellness Tip of the Day</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                "{tip?.content || "Drink warm water in the morning to balance digestion."}"
              </p>
            </section>

            {/* Recent Activity (Untouched) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <ul className="space-y-4 relative border-l-2 border-gray-100 ml-3">
                <li className="pl-4 relative">
                  <div className="w-3 h-3 bg-ayur-green rounded-full absolute -left-[7px] top-1.5"></div>
                  <p className="text-sm font-bold text-gray-900">Purchased Ashwagandha</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </li>
                <li className="pl-4 relative">
                  <div className="w-3 h-3 bg-gray-300 rounded-full absolute -left-[7px] top-1.5"></div>
                  <p className="text-sm font-bold text-gray-900">Completed Consultation</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </li>
              </ul>
            </section>
          </div>

        </div>
      </main>

      {/* RESCHEDULE MODAL */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Reschedule Appointment</h2>
            <p className="text-sm text-gray-500 mb-6">Select a new available slot for Dr. {selectedAppointment?.doctor_name}</p>

            <div className="max-h-60 overflow-y-auto space-y-2 mb-6 pr-2">
              {availableSlots.length === 0 ? (
                <p className="text-sm text-red-500 text-center py-4">No future slots available for this doctor.</p>
              ) : (
                availableSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${selectedSlot?.id === slot.id ? 'border-ayur-green bg-green-50' : 'border-gray-200 hover:border-ayur-green'}`}
                  >
                    <p className="font-bold text-gray-900">{new Date(slot.start_time).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}</p>
                  </button>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowRescheduleModal(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" disabled={!selectedSlot} onClick={handleConfirmReschedule}>Confirm Slot</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
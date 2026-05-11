// frontend/src/pages/patient/BookAppointmentPage.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Components
import DoctorSelectionCard from '../../components/patient/book-appointment/DoctorSelectionCard';
import AllPractitionersModal from '../../components/patient/book-appointment/AllPractitionersModal';
import AppointmentSuccessModal from '../../components/patient/book-appointment/AppointmentSuccessModal';

// Import APIs
import { appointmentApi } from '../../api/appointmentApi';

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split('T')[0];

  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]); // Will now hold objects: { id, timeStr }
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(null); // FIXED: Store the whole slot object
  const [reason, setReason] = useState('');

  const [isPractitionersModalOpen, setIsPractitionersModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 1. Fetch Doctors on Mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await appointmentApi.getAllPractitioners();
        const fetchedDoctors = response.practitioners || response || [];
        setDoctors(fetchedDoctors);

        if (fetchedDoctors.length > 0) {
          const initialDocId = fetchedDoctors[0].doctor_id || fetchedDoctors[0].id || fetchedDoctors[0]._id;
          setSelectedDoctorId(initialDocId);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Unable to load practitioners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // 2. Fetch Dynamic Time Slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDoctorId || !selectedDate) {
        setTimeSlots([]);
        return;
      }
      try {
        setLoadingSlots(true);
        const slots = await appointmentApi.getAvailableSlots(selectedDoctorId, selectedDate);

        if (slots && slots.length > 0) {
          // FIXED: Map to an object containing the precise database ID
          const formattedSlots = slots.map(slot => {
            const dateObj = new Date(slot.start_time);
            return {
              id: slot.slot_id,
              timeStr: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
          });
          setTimeSlots(formattedSlots);
        } else {
          setTimeSlots([]);
        }
        setSelectedSlot(null); // Reset selection
      } catch (err) {
        console.error("Failed to fetch available slots:", err);
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedDoctorId, selectedDate]);

  const selectedDoctor = doctors.find(doc => (doc.doctor_id || doc.id || doc._id) === selectedDoctorId) || null;
  const baseFee = selectedDoctor?.consultation_fee || selectedDoctor?.fee ? parseFloat(selectedDoctor?.consultation_fee || selectedDoctor?.fee) : 50.00;
  const taxAmount = baseFee > 0 ? (baseFee * 0.18) : 0;
  const totalAmount = (baseFee + taxAmount).toFixed(2);

  const handleConfirmAppointment = async () => {
    if (!selectedDoctorId || !selectedSlot || !reason.trim()) {
      alert("Please select a practitioner, available time slot, and provide a reason for the visit.");
      return;
    }

    try {
      setIsSubmitting(true);
      const appointmentPayload = {
        doctorId: selectedDoctorId,
        slotId: selectedSlot.id, // FIXED: Sending the exact Database ID
        reason: reason,
        amount: parseFloat(totalAmount)
      };

      await appointmentApi.createAppointment(appointmentPayload);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Booking failed:", err);
      // Detailed error alert from backend concurrency check
      alert(err.response?.data?.error || "Failed to confirm appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]"><Loader2 className="w-10 h-10 text-[#4A7C59] animate-spin" /></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]"><div className="text-red-600 bg-red-50 px-6 py-4 rounded-xl border border-red-200 font-medium">{error}</div></div>;

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">
      <AllPractitionersModal isOpen={isPractitionersModalOpen} onClose={() => setIsPractitionersModalOpen(false)} onSelectDoctor={(id) => { setSelectedDoctorId(id); setIsPractitionersModalOpen(false); }} doctors={doctors} />

      {isSuccessModalOpen && selectedDoctor && (
        <AppointmentSuccessModal
          isOpen={isSuccessModalOpen}
          appointmentDetails={{
            doctorName: selectedDoctor.full_name || selectedDoctor.name || `Practitioner`,
            date: new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: selectedSlot?.timeStr
          }}
          onViewAppointment={() => { setIsSuccessModalOpen(false); navigate('/patient/appointments', { replace: true }); }}
          onGoToDashboard={() => { setIsSuccessModalOpen(false); navigate('/patient/dashboard', { replace: true }); }}
        />
      )}

      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">Book Appointment</h1>
        <p className="text-gray-500 font-medium text-base">Select your practitioner and schedule a session that fits your wellness journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 space-y-10 overflow-hidden">
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Doctor Selection</h2>
              <button onClick={() => setIsPractitionersModalOpen(true)} className="text-[#4A7C59] font-semibold text-sm hover:underline cursor-pointer">View All Practitioners</button>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
              {doctors.map(doctor => {
                const docId = doctor.doctor_id || doctor.id || doctor._id;
                return (
                  <div key={docId} className="snap-start shrink-0">
                    <DoctorSelectionCard doctor={doctor} isSelected={selectedDoctorId === docId} onSelect={(id) => setSelectedDoctorId(selectedDoctorId === id ? null : id)} />
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reason for Visit</h2>
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Symptoms or Consultation Goal</label>
              <textarea rows="4" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl p-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none transition-colors" placeholder="Please describe your symptoms..." />
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>

            <div className="flex items-center justify-between mb-4 border border-[#EFEBE1] rounded-xl px-4 py-2 bg-[#FAF7F2]">
              <input type="date" value={selectedDate} min={todayStr} onChange={(e) => setSelectedDate(e.target.value)} className="text-sm font-bold text-gray-700 bg-transparent outline-none cursor-pointer w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10 min-h-[100px]">
              {!selectedDoctorId ? (
                <div className="col-span-2 flex items-center justify-center text-sm text-gray-500 text-center font-medium">Please select a practitioner to view available slots.</div>
              ) : loadingSlots ? (
                <div className="col-span-2 flex items-center justify-center"><Loader2 size={24} className="text-[#4A7C59] animate-spin" /></div>
              ) : timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${selectedSlot?.id === slot.id ? 'bg-[#3A6447] text-white shadow-md' : 'bg-[#FDF9EE] text-gray-700 hover:bg-[#F4F1EB]'}`}
                  >
                    {slot.timeStr}
                  </button>
                ))
              ) : (
                <div className="col-span-2 flex items-center justify-center text-sm text-red-500 bg-red-50 rounded-xl p-3 text-center font-medium border border-red-100">No slots available for this date.</div>
              )}
            </div>

            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5">Appointment Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-600"><span>Consultation</span><span className="text-gray-900 font-bold">₹{baseFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm font-medium text-gray-600"><span>Tax & Fees (18%)</span><span className="text-gray-900 font-bold">₹{taxAmount.toFixed(2)}</span></div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#EFEBE1] mb-8">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-gray-900">₹{totalAmount}</span>
            </div>

            <button
              onClick={handleConfirmAppointment}
              disabled={isSubmitting || !selectedDoctorId || !selectedSlot || !reason.trim()}
              className={`w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors ${isSubmitting || !selectedDoctorId || !selectedSlot || !reason.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3A6447] hover:bg-[#2C4D36]'}`}
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
              {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
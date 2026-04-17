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

  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState(['10:00 AM', '11:00 AM', '12:30 PM', '02:00 PM']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const today = new Date();
  const formattedDisplayDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedPayloadDate = today.toISOString().split('T')[0];

  const [isPractitionersModalOpen, setIsPractitionersModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // Using granular API endpoint
        const response = await appointmentApi.getAllPractitioners();
        const fetchedDoctors = response.practitioners || response || [];
        setDoctors(fetchedDoctors);

        if (fetchedDoctors.length > 0) {
          setSelectedDoctorId(fetchedDoctors[0].id || fetchedDoctors[0]._id);
        }
        if (timeSlots.length > 0) {
          setSelectedTime(timeSlots[0]);
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

  const selectedDoctor = doctors.find(doc => (doc.id || doc._id) === selectedDoctorId) || null;
  const baseFee = selectedDoctor?.fee ? parseFloat(selectedDoctor.fee) : 50.00;
  const taxAmount = baseFee > 0 ? 4.50 : 0;
  const totalAmount = (baseFee + taxAmount).toFixed(2);

  const handleConfirmAppointment = async () => {
    if (!selectedDoctorId || !selectedTime || !reason.trim()) {
      alert("Please select a practitioner, time slot, and provide a reason for visit.");
      return;
    }

    try {
      setIsSubmitting(true);
      const appointmentPayload = {
        doctorId: selectedDoctorId,
        date: formattedPayloadDate,
        time: selectedTime,
        reason: reason,
        amount: parseFloat(totalAmount)
      };

      await appointmentApi.createAppointment(appointmentPayload);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to confirm appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]"><Loader2 className="w-10 h-10 text-green-700 animate-spin" /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]"><div className="text-red-600 bg-red-50 px-6 py-4 rounded-xl border border-red-200 font-medium">{error}</div></div>;
  }

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">
      <AllPractitionersModal
        isOpen={isPractitionersModalOpen}
        onClose={() => setIsPractitionersModalOpen(false)}
        onSelectDoctor={(id) => {
          setSelectedDoctorId(id);
          setIsPractitionersModalOpen(false);
        }}
        doctors={doctors}
      />

      {isSuccessModalOpen && selectedDoctor && (
        <AppointmentSuccessModal
          isOpen={isSuccessModalOpen}
          appointmentDetails={{
            doctorName: selectedDoctor.name || `Dr. ${selectedDoctor.full_name}`,
            date: formattedDisplayDate,
            time: selectedTime
          }}
          onViewAppointment={() => {
            setIsSuccessModalOpen(false);
            navigate('/patient/appointments', { replace: true });
          }}
          onGoToDashboard={() => {
            setIsSuccessModalOpen(false);
            navigate('/patient/dashboard', { replace: true });
          }}
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
              <button onClick={() => setIsPractitionersModalOpen(true)} className="text-[#4A7C59] font-semibold text-sm hover:underline cursor-pointer">
                View All Practitioners
              </button>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
              {doctors.map(doctor => {
                const docId = doctor.id || doctor._id;
                return (
                  <div key={docId} className="snap-start shrink-0">
                    <DoctorSelectionCard doctor={doctor} isSelected={selectedDoctorId === docId} onSelect={() => setSelectedDoctorId(docId)} />
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reason for Visit</h2>
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Symptoms or Consultation Goal</label>
              <textarea
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl p-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none transition-colors"
                placeholder="Please describe your symptoms..."
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Today, {formattedDisplayDate.split(',')[0]}</span>
              <Calendar size={16} className="text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${selectedTime === time ? 'bg-[#3A6447] text-white shadow-md' : 'bg-[#FDF9EE] text-gray-700 hover:bg-[#F4F1EB]'}`}
                >
                  {time}
                </button>
              ))}
            </div>

            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5">Appointment Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Consultation</span>
                <span className="text-gray-900 font-bold">₹{baseFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Tax & Fees</span>
                <span className="text-gray-900 font-bold">₹{taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#EFEBE1] mb-8">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-gray-900">₹{totalAmount}</span>
            </div>

            <button
              onClick={handleConfirmAppointment}
              disabled={isSubmitting || !selectedDoctorId}
              className={`w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors ${isSubmitting || !selectedDoctorId ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3A6447] hover:bg-[#2C4D36]'}`}
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
              {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
            </button>
          </div>

          <div className="bg-[#79563E] rounded-[24px] p-6 relative overflow-hidden text-white shadow-sm">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <h4 className="text-lg font-bold mb-2 relative z-10">Prakriti Analysis</h4>
            <p className="text-sm text-white/80 leading-relaxed mb-4 relative z-10 pr-4">Book a session to discover your unique constitution.</p>
            <div className="flex items-center gap-2 text-[#E8C8A0] text-xs font-bold uppercase tracking-wider relative z-10 cursor-pointer hover:text-white transition-colors">
              <MessageSquare size={14} /> Live Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
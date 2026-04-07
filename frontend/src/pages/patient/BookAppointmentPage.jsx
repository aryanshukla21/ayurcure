import React, { useState } from 'react';
import { Calendar, CheckCircle2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import the modular components we built
import DoctorSelectionCard from '../../components/patient/book-appointment/DoctorSelectionCard';
import AllPractitionersModal from '../../components/patient/book-appointment/AllPractitionersModal';
import AppointmentSuccessModal from '../../components/patient/book-appointment/AppointmentSuccessModal';

// Dummy data for all doctors
const DOCTORS = [
  { id: '1', name: 'Ananya Iyer', specialty: 'Ayurvedic Practitioner', rating: '4.9', reviews: '124', fee: '50', experience: '12+ Years Exp', tag: 'English, Hindi' },
  { id: '2', name: 'Rohan Gupta', specialty: 'Panchakarma Expert', rating: '4.8', reviews: '89', fee: '65', experience: '8+ Years Exp', tag: 'Holistic Care' },
  { id: '3', name: 'Meera Kapur', specialty: 'Yoga Therapist', rating: '4.7', reviews: '210', fee: '45', experience: '15+ Years Exp', tag: 'Meditation' },
  { id: '4', name: 'Vikram Sethi', specialty: 'Ayurvedic Practitioner', rating: '4.6', reviews: '76', fee: '55', experience: '10+ Years Exp', tag: 'Herbal Med' },
  { id: '5', name: 'Shanti Deshmukh', specialty: 'Senior Wellness Lead', rating: '5.0', reviews: '150', fee: '80', experience: '25+ Years Exp', tag: 'Expert' },
  { id: '6', name: 'Arjun Varma', specialty: 'Lifestyle Consultant', rating: '4.9', reviews: '95', fee: '50', experience: '6+ Years Exp', tag: 'Dietetics' }
];

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:30 PM', '02:00 PM'];

const BookAppointmentPage = () => {
  const navigate = useNavigate();

  // ----- Form State -----
  const [selectedDoctorId, setSelectedDoctorId] = useState('1');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [reason, setReason] = useState('');

  // ----- Modal States -----
  const [isPractitionersModalOpen, setIsPractitionersModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // ----- Calculations -----
  const selectedDoctor = DOCTORS.find(doc => doc.id === selectedDoctorId) || DOCTORS[0];
  const taxAmount = 4.50;
  const totalAmount = (parseFloat(selectedDoctor.fee) + taxAmount).toFixed(2);

  // ----- Handlers -----
  const handleConfirmAppointment = () => {
    // In a real app, you would make an API call to save the booking here
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">

      {/* --- MODALS --- */}

      {/* 1. View All Practitioners Modal */}
      <AllPractitionersModal
        isOpen={isPractitionersModalOpen}
        onClose={() => setIsPractitionersModalOpen(false)}
        onSelectDoctor={setSelectedDoctorId}
        doctors={DOCTORS}
      />

      {/* 2. Success Modal */}
      <AppointmentSuccessModal
        isOpen={isSuccessModalOpen}
        appointmentDetails={{
          doctorName: selectedDoctor.name,
          date: 'Oct 24, 2023', // Static for now, can be dynamic
          time: selectedTime
        }}
        onViewAppointment={() => {
          setIsSuccessModalOpen(false);
          // Use replace: true so the booking page is replaced by the appointment page in the history stack
          navigate('/patient/appointments/1', { replace: true });
        }}
        onGoToDashboard={() => {
          setIsSuccessModalOpen(false);
          // 1. Replace the current booking page with the specific appointment page in history
          navigate('/patient/appointments/1', { replace: true });

          // 2. Immediately push the dashboard page onto the stack.
          // Now if the user clicks back from the dashboard, they land on the appointment details.
          setTimeout(() => {
            navigate('/patient/dashboard');
          }, 0);
        }}
      />

      {/* --- MAIN PAGE CONTENT --- */}

      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">Book Appointment</h1>
        <p className="text-gray-500 font-medium text-base">Select your practitioner and schedule a session that fits your wellness journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10 overflow-hidden">

          {/* Doctor Selection Panel */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Doctor Selection</h2>
              <button
                onClick={() => setIsPractitionersModalOpen(true)}
                className="text-[#4A7C59] font-semibold text-sm hover:underline cursor-pointer"
              >
                View All Practitioners
              </button>
            </div>

            {/* Horizontal Scroll List */}
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {DOCTORS.map(doctor => (
                <div key={doctor.id} className="snap-start">
                  <DoctorSelectionCard
                    doctor={doctor}
                    isSelected={selectedDoctorId === doctor.id}
                    onSelect={setSelectedDoctorId}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Reason for Visit Panel */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reason for Visit</h2>
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                Reason for Visit (Symptoms or Consultation Goal)
              </label>
              <textarea
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl p-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none transition-colors"
                placeholder="Please describe your symptoms, health history, or wellness goals for this session..."
              />
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1">

          {/* Appointment Summary Box */}
          <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-6">

            {/* Time Slots */}
            <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600">Today, Oct 24</span>
              <Calendar size={16} className="text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${selectedTime === time
                      ? 'bg-[#3A6447] text-white shadow-md'
                      : 'bg-[#FDF9EE] text-gray-700 hover:bg-[#F4F1EB]'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Price Breakdown */}
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5">Appointment Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Consultation</span>
                <span className="text-gray-900 font-bold">${parseFloat(selectedDoctor.fee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Tax & Fees</span>
                <span className="text-gray-900 font-bold">${taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#EFEBE1] mb-8">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-gray-900">${totalAmount}</span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmAppointment}
              className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <CheckCircle2 size={18} /> Confirm Appointment
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-4 px-4 leading-relaxed">
              By confirming, you agree to our cancellation policy.
            </p>
          </div>

          {/* Prakriti Promo Box */}
          <div className="bg-[#79563E] rounded-[24px] p-6 relative overflow-hidden text-white shadow-sm">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <h4 className="text-lg font-bold mb-2 relative z-10">Prakriti Analysis</h4>
            <p className="text-sm text-white/80 leading-relaxed mb-4 relative z-10 pr-4">Book a session with Dr. Iyer to discover your unique constitution.</p>
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
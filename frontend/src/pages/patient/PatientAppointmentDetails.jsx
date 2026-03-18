import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';

// Import All Components
import AppointmentSummaryCard from '../../components/patient/appointment-details/AppointmentSummaryCard';
import PatientActionSidebar from '../../components/patient/appointment-details/PatientActionSidebar';
import PreparationNotesCard from '../../components/patient/appointment-details/PreparationNotesCard';
import DoctorInfoCard from '../../components/patient/appointment-details/DoctorInfoCard';
import DocumentsList from '../../components/patient/appointment-details/DocumentsList';

// Import the new Completed Components
import ConsultationSummaryCard from '../../components/patient/appointment-details/ConsultationSummaryCard';
import PrescriptionCard from '../../components/patient/appointment-details/PrescriptionCard';
import DietAndLifestyleCard from '../../components/patient/appointment-details/DietAndLifestyleCard';

// Import the Cancellation Modals
import CancelAppointmentModal from '../../components/patient/appointment-details/CancelAppointmentModal';
import CancelSuccessModal from '../../components/patient/appointment-details/CancelSuccessModal';

// STATIC DATA
const getDynamicFallbackData = (idStr) => {
    const id = idStr || '1';
    const tableRecords = {
        '1': { doctorName: 'Dr. Ananya Iyer', specialty: 'Ayurvedic Practitioner', date: 'Oct 24, 2023', time: '10:30 AM', status: 'upcoming', type: 'video' },
        '2': { doctorName: 'Dr. Vikram Singh', specialty: 'Pulse Diagnosis Expert', date: 'Oct 28, 2023', time: '02:15 PM', status: 'upcoming', type: 'in-person' },
        '3': { doctorName: 'Dr. Meera Kapur', specialty: 'Diet & Lifestyle Coach', date: 'Oct 15, 2023', time: '09:00 AM', status: 'completed', type: 'video' },
        '4': { doctorName: 'Dr. Rahul Varma', specialty: 'Yoga Therapist', date: 'Oct 12, 2023', time: '11:00 AM', status: 'cancelled', type: 'video' }
    };

    const record = tableRecords[id] || tableRecords['1'];

    return {
        id: id,
        appointmentId: `#APT-${8000 + parseInt(id)}`,
        doctorName: record.doctorName,
        specialty: record.specialty,
        date: record.date,
        time: record.time,
        status: record.status, 
        type: record.type,
        clinic: "Ayurcare Wellness Center, Virtual",
        patientNotes: "I have been experiencing recurring digestive discomfort and mild insomnia...",
        preVisitInstructions: ["Join the call 5 minutes early", "Keep your previous medical reports handy"],
        doctorInfo: { experience: "12+ Years", languages: "English, Hindi", rating: "4.9/5" },
        documents: [
            { name: 'Booking_Confirmation.pdf', date: record.date, size: '120 KB' },
            ...(record.status === 'completed' ? [{ name: `Prescription_${record.doctorName.replace(/\s+/g, '_')}.pdf`, date: record.date, size: '1.4 MB' }] : [])
        ]
    };
};

const PatientAppointmentDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [appointment, setAppointment] = useState(null);

    // Modal States
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isCancelSuccessOpen, setIsCancelSuccessOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true); 
        setTimeout(() => {
            setAppointment(getDynamicFallbackData(id));
            setIsLoading(false);
        }, 300);
    }, [id]);

    // Handler for Confirming Cancellation
    const handleConfirmCancellation = () => {
        setIsCancelModalOpen(false);
        setIsCancelSuccessOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <Loader2 className="w-12 h-12 text-[#4A7C59] animate-spin" />
            </div>
        );
    }

    if (!appointment) return <div className="p-10 text-gray-500 bg-[#FDF9EE] h-full">Appointment not found.</div>;

    const isCompleted = appointment.status === 'completed';

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full relative">

            {/* MODALS */}
            <CancelAppointmentModal 
                isOpen={isCancelModalOpen}
                appointment={appointment}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleConfirmCancellation}
            />

            <CancelSuccessModal 
                isOpen={isCancelSuccessOpen}
                onGoDashboard={() => {
                    setIsCancelSuccessOpen(false);
                    navigate('/patient/dashboard');
                }}
                onScheduleNew={() => {
                    setIsCancelSuccessOpen(false);
                    navigate('/patient/book-appointment');
                }}
            />

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    {isCompleted ? 'Consultation Summary' : 'Appointment Details'}
                </h1>
                <div className="flex items-center text-gray-500 text-sm font-bold tracking-wide">
                    <Link to="/patient/appointments" className="hover:text-[#4A7C59] transition-colors">Appointments</Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="text-gray-900">{appointment.doctorName}</span>
                </div>
            </div>

            {/* Dynamic Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

                <div className="lg:col-span-2">
                    <AppointmentSummaryCard appointment={appointment} />
                </div>
                
                {/* ACTION SIDEBAR */}
                <div className="lg:col-span-1">
                    <PatientActionSidebar 
                        appointment={appointment} 
                        onCancelClick={() => setIsCancelModalOpen(true)} // <-- Passed down here
                    />
                </div>

                {/* CONDITIONAL RENDERING BASED ON STATUS */}
                {isCompleted ? (
                    <>
                        <div className="lg:col-span-1">
                            <ConsultationSummaryCard summary={appointment.summary} />
                        </div>
                        <div className="lg:col-span-2">
                            <PrescriptionCard medications={appointment.medications} />
                        </div>
                        <div className="lg:col-span-3">
                            <DietAndLifestyleCard plan={appointment.dietPlan} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="lg:col-span-2">
                            <PreparationNotesCard notes={appointment.patientNotes} instructions={appointment.preVisitInstructions} />
                        </div>
                        <div className="lg:col-span-1">
                            <DoctorInfoCard info={appointment.doctorInfo} />
                        </div>
                    </>
                )}

                <div className="lg:col-span-3">
                    <DocumentsList documents={appointment.documents} />
                </div>

            </div>
        </div>
    );
};

export default PatientAppointmentDetails;
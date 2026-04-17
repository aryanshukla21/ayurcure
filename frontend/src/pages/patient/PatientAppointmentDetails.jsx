import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';
import { appointmentApi } from '../../api/appointmentApi';

// Import Components
import AppointmentSummaryCard from '../../components/patient/appointment-details/AppointmentSummaryCard';
import PatientActionSidebar from '../../components/patient/appointment-details/PatientActionSidebar';
import PreparationNotesCard from '../../components/patient/appointment-details/PreparationNotesCard';
import DoctorInfoCard from '../../components/patient/appointment-details/DoctorInfoCard';
import DocumentsList from '../../components/patient/appointment-details/DocumentsList';
import CancelAppointmentModal from '../../components/patient/appointment-details/CancelAppointmentModal';
import CancelSuccessModal from '../../components/patient/appointment-details/CancelSuccessModal';

const PatientAppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Granular States
    const [summary, setSummary] = useState(null);
    const [actions, setActions] = useState(null);
    const [symptoms, setSymptoms] = useState(null);
    const [practitioner, setPractitioner] = useState(null);
    const [documents, setDocuments] = useState([]);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isCancelSuccessOpen, setIsCancelSuccessOpen] = useState(false);

    useEffect(() => {
        if (!id) return;

        // Independent parallel fetches
        appointmentApi.getActions(id).then(setActions).catch(console.error);
        appointmentApi.getSymptoms(id).then(setSymptoms).catch(console.error);
        appointmentApi.getPractitionerInfo(id).then(setPractitioner).catch(console.error);
        appointmentApi.getDocuments(id).then(setDocuments).catch(console.error);

        // Assuming your backend returns a base summary in one of the calls or a dedicated one
        // For this example, we'll construct the summary from the actions/practitioner data 
        // once they load, or you can add a specific getSummary(id) endpoint.
    }, [id]);

    const handleConfirmCancellation = async () => {
        try {
            await appointmentApi.updateStatus(id, { status: 'Cancelled' });
            setIsCancelModalOpen(false);
            setIsCancelSuccessOpen(true);
        } catch (error) {
            alert("Failed to cancel appointment. Please try again.");
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full relative">
            <CancelAppointmentModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={handleConfirmCancellation} />
            <CancelSuccessModal isOpen={isCancelSuccessOpen} onGoDashboard={() => navigate('/patient/dashboard')} onScheduleNew={() => navigate('/patient/book-appointment')} />

            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Appointment Details</h1>
                <div className="flex items-center text-gray-500 text-sm font-bold tracking-wide">
                    <Link to="/patient/appointments" className="hover:text-[#4A7C59] transition-colors">Appointments</Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="text-gray-900">{practitioner?.doctorName || 'Loading...'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Summary Card */}
                <div className="lg:col-span-2">
                    {practitioner ? <AppointmentSummaryCard practitioner={practitioner} /> : <div className="h-40 bg-white rounded-3xl animate-pulse"></div>}
                </div>

                {/* Action Sidebar */}
                <div className="lg:col-span-1">
                    {actions ? <PatientActionSidebar actions={actions} onCancelClick={() => setIsCancelModalOpen(true)} /> : <div className="h-64 bg-white rounded-3xl animate-pulse"></div>}
                </div>

                {/* Notes & Instructions */}
                <div className="lg:col-span-2">
                    {symptoms ? <PreparationNotesCard notes={symptoms.patientNotes} instructions={symptoms.preVisitInstructions} /> : <div className="h-48 bg-white rounded-3xl animate-pulse"></div>}
                </div>

                {/* Doctor Info */}
                <div className="lg:col-span-1">
                    {practitioner ? <DoctorInfoCard info={practitioner.doctorInfo} /> : <div className="h-48 bg-white rounded-3xl animate-pulse"></div>}
                </div>

                {/* Documents */}
                <div className="lg:col-span-3">
                    <DocumentsList documents={documents} />
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentDetails;
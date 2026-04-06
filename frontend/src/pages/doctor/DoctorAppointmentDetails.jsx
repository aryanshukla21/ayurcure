import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { doctorApi } from '../../api/doctorApi';

// Import our components
import PatientSummaryCard from '../../components/doctor/appointment-details/PatientSummaryCard';
import ActionSidebar from '../../components/doctor/appointment-details/ActionSidebar';
import SymptomsCard from '../../components/doctor/appointment-details/SymptomsCard';
import MedicalInfoCard from '../../components/doctor/appointment-details/MedicalInfoCard';
import ReportsList from '../../components/doctor/appointment-details/ReportsList';

// DYNAMIC STATIC DATA GENERATOR
const getDynamicFallbackData = (idStr) => {
    const id = parseInt(idStr) || 1;

    const tableRecords = {
        1: { name: 'Rohan Sharma', time: '2023-10-24T10:30:00', mode: 'Video', status: 'Confirmed', gender: 'Male' },
        2: { name: 'Anjali Patel', time: '2023-10-24T11:15:00', mode: 'Physical', status: 'Confirmed', gender: 'Female' },
        3: { name: 'Meera Kapoor', time: '2023-10-24T13:00:00', mode: 'Video', status: 'Completed', gender: 'Female' },
        4: { name: 'Arjun Singh', time: '2023-10-25T09:00:00', mode: 'Physical', status: 'Cancelled', gender: 'Male' }
    };

    const record = tableRecords[id] || {
        name: `Patient #${id}`,
        time: new Date().toISOString(),
        mode: id % 2 === 0 ? 'Physical' : 'Video',
        status: 'Confirmed',
        gender: 'Unknown'
    };

    return {
        id: id,
        name: record.name,
        patient_id: `#PAT-${1000 + id}`,
        age: 28 + (id % 12),
        gender: record.gender,
        start_time: record.time,
        mode: record.mode,
        status: record.status,
        pre_consultation_symptoms: "Experiencing recurring digestive discomfort and mild insomnia over the last two weeks. Also reporting occasional joint stiffness in the mornings. Looking for a holistic Ayurvedic approach to rebalance digestion and improve sleep quality.",
        medical_info: {
            allergies: id % 2 === 0 ? 'Dairy, Dust' : 'Peanuts, Penicillin',
            conditions: id === 2 ? 'Pitta Imbalance' : 'Mild Hypertension (Managed)',
            medications: id % 2 === 0 ? 'Ashwagandha Vati' : 'Vitamin D3 Supplement'
        },
        reports: [
            { name: 'Blood_Work_Oct23.pdf', date: 'Oct 15, 2023', size: '2.4 MB' },
            { name: 'Metabolic_Profile.pdf', date: 'Oct 10, 2023', size: '1.2 MB' },
            { name: 'Previous_RX_History.pdf', date: 'Sep 25, 2023', size: '4.8 MB' }
        ]
    };
};

const DoctorAppointmentDetails = () => {
    const { id } = useParams();

    // Grab the global search query from DoctorLayout
    const { searchQuery = '' } = useOutletContext() || {};

    const [isLoading, setIsLoading] = useState(true);
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await doctorApi.getAppointment(id);
                if (res && res.appointment) {
                    setAppointment({
                        ...res.appointment,
                        medical_info: {
                            allergies: res.appointment.allergies || 'None',
                            conditions: res.appointment.health_history || 'None',
                            medications: 'None'
                        },
                        reports: []
                    });
                } else {
                    setAppointment(getDynamicFallbackData(id));
                }
            } catch (error) {
                setAppointment(getDynamicFallbackData(id));
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59]"></div>
            </div>
        );
    }

    if (!appointment) return <div className="p-10 text-gray-500">Appointment not found.</div>;

    // Filter the reports array based on the global search bar!
    const filteredReports = (appointment.reports || []).filter(report =>
        (report.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">

            {/* Header / Breadcrumb */}
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Appointment Details</h1>
                <div className="flex items-center text-gray-500 text-sm font-bold tracking-wide">
                    <Link to="/doctor/appointments" className="hover:text-[#4A7C59] transition-colors">Appointments</Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="text-gray-900">{appointment.name}</span>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">
                    <PatientSummaryCard appointment={appointment} />
                </div>

                <div className="lg:col-span-1">
                    <ActionSidebar appointment={appointment} />
                </div>

                <div className="lg:col-span-2">
                    <SymptomsCard symptoms={appointment.pre_consultation_symptoms} />
                </div>

                <div className="lg:col-span-1">
                    <MedicalInfoCard info={appointment.medical_info} />
                </div>

                <div className="lg:col-span-3">
                    {/* Pass the dynamically filtered array down to the component */}
                    <ReportsList reports={filteredReports} />
                </div>

            </div>
        </div>
    );
}

export default DoctorAppointmentDetails;
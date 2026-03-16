import React, { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';

import AppointmentsHeader from '../../components/doctor/appointments/AppointmentsHeader';
import AppointmentsTabs from '../../components/doctor/appointments/AppointmentsTabs';
import AppointmentsTable from '../../components/doctor/appointments/AppointmentsTable';

// Helper function to generate 28 static appointments for testing
const generateStaticData = () => {
    const statuses = ['Confirmed', 'Completed', 'Cancelled', 'Scheduled'];
    const names = ['Rohan Sharma', 'Anjali Patel', 'Meera Kapoor', 'Arjun Singh', 'Priya Desai', 'Vikram Malhotra', 'Neha Gupta', 'Rahul Verma'];

    const data = [];
    for (let i = 1; i <= 28; i++) {
        data.push({
            id: i,
            name: names[i % names.length] + (i > 8 ? ` (Visit ${Math.ceil(i / 8)})` : ''),
            date: `Oct ${10 + (i % 20)}, 2023`,
            time: `10:${(i % 6) * 10 || '00'} AM`,
            status: statuses[i % 4]
        });
    }
    return data;
};

const DoctorAppointments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Upcoming'); // Default tab
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments, setAppointments] = useState([]);

    const tabsArray = ['All', 'Today', 'Upcoming', 'Completed', 'Cancelled'];

    // Generate the 28 static items
    const staticData = generateStaticData();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await doctorApi.getAllAppointments();
                if (res && res.appointments && Array.isArray(res.appointments) && res.appointments.length > 0) {
                    setAppointments(res.appointments);
                } else {
                    setAppointments(staticData); // Fallback to 28 items if backend is empty
                }
            } catch (error) {
                // Fallback to 28 items if not logged in (403 Forbidden)
                setAppointments(staticData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const filteredAppointments = (appointments || []).filter(apt => {
        const status = apt.status?.toLowerCase() || '';
        const patientName = (apt.name || apt.patient_name || '').toLowerCase();
        const matchesSearch = patientName.includes(searchTerm.toLowerCase());

        let matchesTab = false;
        if (activeTab === 'All') matchesTab = true; // Added an 'All' tab so you can see all 28 easily
        else if (activeTab === 'Completed') matchesTab = status === 'completed';
        else if (activeTab === 'Cancelled') matchesTab = status === 'cancelled';
        else if (activeTab === 'Today') matchesTab = status === 'confirmed' || status === 'scheduled';
        else matchesTab = status === 'confirmed' || status === 'scheduled'; // Default Upcoming

        return matchesSearch && matchesTab;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">

            <AppointmentsHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <AppointmentsTabs
                tabs={tabsArray}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <AppointmentsTable
                appointments={filteredAppointments}
                activeTab={activeTab}
            />

        </div>
    );
};

export default DoctorAppointments;
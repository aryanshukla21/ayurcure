import React, { useState, useEffect } from 'react';
import AppointmentsHeader from '../../components/patient/appointments/AppointmentsHeader';
import AppointmentsTabs from '../../components/patient/appointments/AppointmentsTabs';
import AppointmentsTable from '../../components/patient/appointments/AppointmentsTable';
import AppointmentInsights from '../../components/patient/appointments/AppointmentInsights';

const staticAppointments = [
  { _id: '1', doctorName: 'Dr. Ananya Iyer', specialty: 'Ayurvedic Practitioner', date: 'Oct 24, 2023', time: '10:30 AM', status: 'upcoming' },
  { _id: '2', doctorName: 'Dr. Vikram Singh', specialty: 'Pulse Diagnosis Expert', date: 'Oct 28, 2023', time: '02:15 PM', status: 'upcoming' },
  { _id: '5', doctorName: 'Dr. Rohan Gupta', specialty: 'Panchakarma Expert', date: 'Nov 02, 2023', time: '11:00 AM', status: 'upcoming' },
  { _id: '6', doctorName: 'Dr. Neha Sharma', specialty: 'Ayurvedic Consultant', date: 'Nov 05, 2023', time: '04:00 PM', status: 'upcoming' },
  { _id: '3', doctorName: 'Dr. Meera Kapur', specialty: 'Diet & Lifestyle Coach', date: 'Oct 15, 2023', time: '09:00 AM', status: 'completed' },
  { _id: '7', doctorName: 'Dr. Ananya Iyer', specialty: 'Ayurvedic Practitioner', date: 'Sep 22, 2023', time: '10:00 AM', status: 'completed' },
  { _id: '4', doctorName: 'Dr. Rahul Varma', specialty: 'Yoga Therapist', date: 'Oct 12, 2023', time: '11:00 AM', status: 'cancelled' },
];

const PatientAppointments = () => {
  // 1. SET DEFAULT TAB TO 'all'
  const [activeTab, setActiveTab] = useState('all'); 
  const [allFilteredAppointments, setAllFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Changed to 4 so it displays nicely in the 'All' view

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // 2. UPDATE FILTERING LOGIC: If 'all', return everything. Otherwise, filter by status.
      const filteredData = activeTab === 'all' 
        ? staticAppointments 
        : staticAppointments.filter(apt => apt.status === activeTab);
      
      setAllFilteredAppointments(filteredData);
      setCurrentPage(1); // Reset to page 1 when switching tabs
      setLoading(false);
    }, 300); 

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Pagination Math
  const totalItems = allFilteredAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Slice the array for the current page
  const paginatedAppointments = allFilteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
      
      <AppointmentsHeader />

      <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 text-sm px-5 py-4 rounded-xl shadow-sm font-medium">
        <strong>UI Testing Mode:</strong> Displaying static UI data with functional pagination. Default tab is now set to "All".
      </div>

      <AppointmentsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AppointmentsTable 
        appointments={paginatedAppointments} 
        loading={loading} 
        activeTab={activeTab}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      <AppointmentInsights />

    </div>
  );
};

export default PatientAppointments;
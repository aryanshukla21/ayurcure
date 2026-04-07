import React, { useState, useEffect } from 'react';
import AppointmentsHeader from '../../components/patient/appointments/AppointmentsHeader';
import AppointmentsTabs from '../../components/patient/appointments/AppointmentsTabs';
import AppointmentsTable from '../../components/patient/appointments/AppointmentsTable';
import AppointmentInsights from '../../components/patient/appointments/AppointmentInsights';

// Updated dates to 2026 so the "This Month" filter works dynamically based on the current date!
const staticAppointments = [
  { _id: '1', doctorName: 'Dr. Ananya Iyer', specialty: 'Ayurvedic Practitioner', date: 'Apr 24, 2026', time: '10:30 AM', status: 'upcoming' },
  { _id: '2', doctorName: 'Dr. Vikram Singh', specialty: 'Pulse Diagnosis Expert', date: 'Apr 28, 2026', time: '02:15 PM', status: 'upcoming' },
  { _id: '5', doctorName: 'Dr. Rohan Gupta', specialty: 'Panchakarma Expert', date: 'May 02, 2026', time: '11:00 AM', status: 'upcoming' },
  { _id: '6', doctorName: 'Dr. Neha Sharma', specialty: 'Ayurvedic Consultant', date: 'May 05, 2026', time: '04:00 PM', status: 'upcoming' },
  { _id: '3', doctorName: 'Dr. Meera Kapur', specialty: 'Diet & Lifestyle Coach', date: 'Apr 10, 2026', time: '09:00 AM', status: 'completed' },
  { _id: '7', doctorName: 'Dr. Ananya Iyer', specialty: 'Ayurvedic Practitioner', date: 'Mar 22, 2026', time: '10:00 AM', status: 'completed' },
  { _id: '4', doctorName: 'Dr. Rahul Varma', specialty: 'Yoga Therapist', date: 'Apr 12, 2026', time: '11:00 AM', status: 'cancelled' },
];

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [allFilteredAppointments, setAllFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Filter States
  const [isThisMonth, setIsThisMonth] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Combined Filtering Logic
      const filteredData = staticAppointments.filter(apt => {
        // 1. Tab Status Filter
        if (activeTab !== 'all' && apt.status !== activeTab) return false;

        // 2. "This Month" Filter
        if (isThisMonth) {
          const aptDate = new Date(apt.date);
          if (aptDate.getMonth() !== currentMonth || aptDate.getFullYear() !== currentYear) {
            return false;
          }
        }

        // 3. Text Search Filter (Doctor Name or Specialty)
        if (filterText.trim() !== '') {
          const query = filterText.toLowerCase();
          if (
            !apt.doctorName.toLowerCase().includes(query) &&
            !apt.specialty.toLowerCase().includes(query)
          ) {
            return false;
          }
        }

        return true;
      });

      setAllFilteredAppointments(filteredData);
      setCurrentPage(1); // Reset to page 1 whenever filters change
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab, isThisMonth, filterText]); // Re-run effect when any filter state changes

  // Pagination Math
  const totalItems = allFilteredAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedAppointments = allFilteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">

      <AppointmentsHeader />

      <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 text-sm px-5 py-4 rounded-xl shadow-sm font-medium">
        <strong>UI Testing Mode:</strong> Displaying static UI data with functional pagination and advanced filtering.
      </div>

      <AppointmentsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isThisMonth={isThisMonth}
        setIsThisMonth={setIsThisMonth}
        filterText={filterText}
        setFilterText={setFilterText}
      />

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
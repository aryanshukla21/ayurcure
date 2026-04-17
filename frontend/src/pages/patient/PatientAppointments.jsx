import React, { useState, useEffect } from 'react';
import AppointmentsHeader from '../../components/patient/appointments/AppointmentsHeader';
import AppointmentsTabs from '../../components/patient/appointments/AppointmentsTabs';
import AppointmentsTable from '../../components/patient/appointments/AppointmentsTable';
import AppointmentInsights from '../../components/patient/appointments/AppointmentInsights';
import { appointmentApi } from '../../api/appointmentApi';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [allFilteredAppointments, setAllFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isThisMonth, setIsThisMonth] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Using the granular api design
        const response = await appointmentApi.getAll();
        setAppointmentsData(response.appointments || response || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!appointmentsData || appointmentsData.length === 0) {
      setAllFilteredAppointments([]);
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filteredData = appointmentsData.filter(apt => {
      // 1. Status
      if (activeTab !== 'all' && apt.status?.toLowerCase() !== activeTab) return false;
      // 2. Month
      if (isThisMonth && (apt.date || apt.scheduled_at)) {
        const aptDate = new Date(apt.date || apt.scheduled_at);
        if (aptDate.getMonth() !== currentMonth || aptDate.getFullYear() !== currentYear) return false;
      }
      // 3. Search
      if (filterText.trim() !== '') {
        const query = filterText.toLowerCase();
        const docName = (apt.doctorName || '').toLowerCase();
        const spec = (apt.specialty || apt.specialization || '').toLowerCase();
        if (!docName.includes(query) && !spec.includes(query)) return false;
      }
      return true;
    });

    setAllFilteredAppointments(filteredData);
    setCurrentPage(1);
  }, [activeTab, isThisMonth, filterText, appointmentsData]);

  const totalItems = allFilteredAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedAppointments = allFilteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
      <AppointmentsHeader />
      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-medium">{error}</div>}

      <AppointmentsTabs
        activeTab={activeTab} setActiveTab={setActiveTab}
        isThisMonth={isThisMonth} setIsThisMonth={setIsThisMonth}
        filterText={filterText} setFilterText={setFilterText}
      />

      <AppointmentsTable
        appointments={paginatedAppointments} loading={loading}
        activeTab={activeTab} currentPage={currentPage} totalPages={totalPages}
        onPageChange={setCurrentPage} totalItems={totalItems} itemsPerPage={itemsPerPage}
      />

      <AppointmentInsights />
    </div>
  );
};

export default PatientAppointments;
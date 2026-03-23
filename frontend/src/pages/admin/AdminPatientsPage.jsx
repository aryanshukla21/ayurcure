import React from 'react';
import PatientsTable from '../../components/admin/patients/PatientsTable';
import PatientMetricsRow from '../../components/admin/patients/PatientMetricsRow';

const AdminPatientsPage = () => {
  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
          Patients
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Manage and review patient records for your facility.
        </p>
      </div>

      {/* Main Table Area */}
      <div className="flex-1">
        <PatientsTable />
      </div>

      {/* Bottom Metrics Cards */}
      <PatientMetricsRow />

    </div>
  );
};

export default AdminPatientsPage;
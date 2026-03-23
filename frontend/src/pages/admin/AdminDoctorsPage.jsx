import React from 'react';
import DoctorsTable from '../../components/admin/doctors/DoctorsTable';
import DoctorMetricsRow from '../../components/admin/doctors/DoctorMetricsRow';

const AdminDoctorsPage = () => {
  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
          Doctors
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Manage your medical practitioners and their clinical records.
        </p>
      </div>

      {/* Main Table Area */}
      <div className="flex-1">
        <DoctorsTable />
      </div>

      {/* Bottom Metrics Cards */}
      <DoctorMetricsRow />

    </div>
  );
};

export default AdminDoctorsPage;
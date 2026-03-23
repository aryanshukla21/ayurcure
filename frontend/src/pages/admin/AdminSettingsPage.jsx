import React from 'react';
import AdminMetricsRow from '../../components/admin/settings/AdminMetricsRow';
import AdminsTable from '../../components/admin/settings/AdminsTable';

const AdminSettingsPage = () => {
  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300 flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
          Staff Management
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Manage system administrators, permissions, and security settings.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <AdminMetricsRow />

      {/* Main Table Area */}
      <div className="flex-1">
        <AdminsTable />
      </div>

    </div>
  );
};

export default AdminSettingsPage;
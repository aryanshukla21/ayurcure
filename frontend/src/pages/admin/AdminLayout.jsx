import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/layout/AdminSidebar';
import AdminTopbar from '../../components/admin/layout/AdminTopbar';

const AdminLayout = () => {
  return (
    <div className="bg-[#FDF9EE] min-h-screen flex font-sans">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area (Offset by sidebar width) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <AdminTopbar />
        
        {/* Page Content Injection */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
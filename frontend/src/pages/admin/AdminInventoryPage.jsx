import React from 'react';
import InventoryTable from '../../components/admin/inventory/InventoryTable';

const AdminInventoryPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Inventory Management
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Manage your apothecary products, track stock levels, and update pricing.
        </p>
      </div>

      {/* Main Table Component */}
      <InventoryTable />

    </div>
  );
};

export default AdminInventoryPage;
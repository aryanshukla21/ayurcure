import React from 'react';
import OrdersTable from '../../components/admin/orders/OrdersTable';
import OrderMetricsRow from '../../components/admin/orders/OrderMetricsRow';

const AdminOrdersPage = () => {
  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[32px] font-extrabold text-green-700 tracking-tight leading-none mb-2">
          Orders
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Manage pharmacy dispensations, equipment orders, and payment statuses.
        </p>
      </div>

      {/* Main Table Area */}
      <div className="flex-1">
        <OrdersTable />
      </div>

      {/* Bottom Metrics Cards */}
      <OrderMetricsRow />

    </div>
  );
};

export default AdminOrdersPage;
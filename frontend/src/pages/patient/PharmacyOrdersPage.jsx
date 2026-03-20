import React from 'react';
import OrderMetricsRow from '../../components/patient/pharmacy-orders/OrderMetricsRow';
import OrderHistoryList from '../../components/patient/pharmacy-orders/OrderHistoryList';
import RefillReminderCard from '../../components/patient/pharmacy-orders/RefillReminderCard';
import PharmacyHelpCard from '../../components/patient/pharmacy-orders/PharmacyHelpCard';

const PharmacyOrdersPage = () => {
  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">
          Pharmacy Orders
        </h1>
        <p className="text-gray-500 font-medium text-base max-w-2xl leading-relaxed">
          Track your wellness essentials. Monitor the status of your Ayurvedic prescriptions and over-the-counter supplements delivered to your doorstep.
        </p>
      </div>

      {/* Top Metrics Row */}
      <OrderMetricsRow />

      {/* Main Order History Table */}
      <div className="mb-8 flex-1">
        <OrderHistoryList />
      </div>

      {/* Bottom Promo / Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RefillReminderCard />
        <PharmacyHelpCard />
      </div>

    </div>
  );
};

export default PharmacyOrdersPage;
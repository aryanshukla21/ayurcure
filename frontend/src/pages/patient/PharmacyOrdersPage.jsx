import React, { useState, useEffect } from 'react';
import { ecommerceApi } from '../../api/ecommerceApi';
import OrderMetricsRow from '../../components/patient/pharmacy-orders/OrderMetricsRow';
import OrderHistoryList from '../../components/patient/pharmacy-orders/OrderHistoryList';
import RefillReminderCard from '../../components/patient/pharmacy-orders/RefillReminderCard';
import PharmacyHelpCard from '../../components/patient/pharmacy-orders/PharmacyHelpCard';

const PharmacyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({ inProgress: 0, shippedToday: 0, totalSpent: 0 });

  useEffect(() => {
    // Fetch History Table
    ecommerceApi.getOrderHistory()
      .then(data => setOrders(data.orders || data))
      .catch(console.error);

    // Fetch Metrics Aggregations
    Promise.all([
      ecommerceApi.getInProgressOrders(),
      ecommerceApi.getShippedToday(),
      ecommerceApi.getTotalSpent()
    ]).then(([inProg, shipped, spent]) => {
      setMetrics({
        inProgress: inProg.count || 0,
        shippedToday: shipped.count || 0,
        totalSpent: spent.total || 0
      });
    }).catch(console.error);
  }, []);

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Pharmacy Orders</h1>
      </div>

      <OrderMetricsRow metrics={metrics} />

      <div className="mb-8 flex-1">
        <OrderHistoryList orders={orders} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RefillReminderCard />
        <PharmacyHelpCard />
      </div>
    </div>
  );
};

export default PharmacyOrdersPage;
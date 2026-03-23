import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';

import OrderSummaryHeader from '../../components/admin/orders/order-details/OrderSummaryHeader';
import CustomerInfoCard from '../../components/admin/orders/order-details/CustomerInfoCard';
import ItemsOrderedTable from '../../components/admin/orders/order-details/ItemsOrderedTable';
import PaymentSummaryCard from '../../components/admin/orders/order-details/PaymentSummaryCard';
import OrderTimeline from '../../components/admin/orders/order-details/OrderTimeline';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Simulate API fetch using the exact PDF data
    setTimeout(() => {
      setOrderData({
        id: id ? `#${id}` : '#AYU-9821',
        date: 'Oct 24, 2023',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
        customer: {
          name: 'Aditi Sharma',
          address: '123 Lotus Lane,\nBangalore, 500001',
          phone: '+91 98765 43210',
          email: 'aditi.s@example.com'
        },
        items: [
          { name: 'Herbal Tea', qty: 2, price: '250', subtotal: '500' },
          { name: 'Amla Juice', qty: 1, price: '450', subtotal: '450' }
        ],
        summary: {
          productTotal: '950',
          delivery: '50',
          finalAmount: '1,000'
        },
        timeline: [
          { type: 'delivered', title: 'Order Delivered', timestamp: 'Oct 26, 2023 at 2:15 PM' },
          { type: 'shipped', title: 'Shipped from Bangalore Hub', timestamp: 'Oct 25, 2023 at 10:30 AM' },
          { type: 'payment', title: 'Payment Confirmed', timestamp: 'Oct 24, 2023 at 11:45 AM' }
        ]
      });
      setIsLoading(false);
    }, 400);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      
      {/* Breadcrumbs & Title */}
      <div className="mb-8">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/orders" className="hover:text-[#3A6447] transition-colors">Orders</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Details</span>
        </div>
        <h1 className="text-3xl md:text-[32px] font-extrabold text-green-700 tracking-tight leading-none mb-2">
          Order Details
        </h1>
        <p className="text-sm font-medium text-amber-800">
          Viewing specific details for order {orderData.id}
        </p>
      </div>

      {/* Top Header Card */}
      <OrderSummaryHeader order={orderData} />

      {/* Main Grid: 2/3 Left (Items & Timeline) | 1/3 Right (Customer & Payment) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ItemsOrderedTable items={orderData.items} />
          <OrderTimeline timeline={orderData.timeline} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <CustomerInfoCard customer={orderData.customer} />
          <PaymentSummaryCard summary={orderData.summary} />
        </div>

      </div>

    </div>
  );
};

export default AdminOrderDetailsPage;
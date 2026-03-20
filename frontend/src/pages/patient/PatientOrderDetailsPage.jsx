import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2, Download } from 'lucide-react';

import OrderSummaryHeaderCard from '../../components/patient/order-details/OrderSummaryHeaderCard';
import OrderedProductsCard from '../../components/patient/order-details/OrderedProductsCard';
import OrderInfoSidePanel from '../../components/patient/order-details/OrderInfoSidePanel';

// Dummy Data Fetch
const MOCK_ORDER_DATA = {
  'AC-98321': {
    id: '#AC-98321',
    placedDate: 'Oct 24, 2023',
    estimatedDelivery: 'Oct 28, 2023',
    products: [
      {
        name: 'Ashwagandha Premium Capsules',
        variant: 'Ayurvedic Rejuvenation • 60 Caps',
        qty: 2,
        sku: 'AY-ASH-01',
        price: '$34.99',
        originalPrice: '$39.99',
        image: 'https://cdn.icon-icons.com/icons2/3358/PNG/512/cosmetic_crema_skincare_product_icon_210459.png'
      },
      {
        name: 'Triphala Churna',
        variant: 'Digestive Support • 250g',
        qty: 1,
        sku: 'AY-TRI-05',
        price: '$15.00',
        image: 'https://cdn.icon-icons.com/icons2/3358/PNG/512/cosmetic_skincare_product_balsamo_icon_210451.png'
      }
    ]
  }
};

const PatientOrderDetailsPage = () => {
  const { id } = useParams(); // <-- Get the specific order ID from URL
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulating API fetch. Use hardcoded 'AC-98321' if param is not present or mismatches for this demo
    setTimeout(() => {
      setOrder(MOCK_ORDER_DATA[id] || MOCK_ORDER_DATA['AC-98321']);
      setIsLoading(false);
    }, 400);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
        <Loader2 className="w-12 h-12 text-[#4A7C59] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">

      {/* Header & Breadcrumbs & Action Button */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Link to="/patient/pharmacy-orders" className="hover:text-[#4A7C59] transition-colors">Pharmacy</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/patient/pharmacy-orders" className="hover:text-[#4A7C59] transition-colors">Orders</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900">Details</span>
          </div>
          <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 tracking-tight">Order Details</h1>
        </div>

        {/* Action Button - Rounded Full Green */}
        <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center gap-2 shadow-sm transition-colors text-sm w-fit">
          <Download size={18} /> Download Invoice
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Cream Cards) */}
        <div className="lg:col-span-2">
          <OrderSummaryHeaderCard
            orderId={order.id}
            orderDate={order.placedDate}
            estimatedDelivery={order.estimatedDelivery}
          />
          <OrderedProductsCard products={order.products} />
        </div>

        {/* Right Column (Green Cards Panel) */}
        <div className="lg:col-span-1">
          <OrderInfoSidePanel />
        </div>

      </div>

    </div>
  );
};

export default PatientOrderDetailsPage;
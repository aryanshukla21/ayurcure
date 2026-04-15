import React from 'react';
import { Truck, MapPin, Mail, Phone, CreditCard, Sparkles } from 'lucide-react';

const OrderInfoSidePanel = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* 1. Delivery Address Card */}
      <div className="bg-[#3A6447] text-white rounded-[24px] p-6 shadow-sm border border-[#2C4D36]">
        <div className="flex items-center gap-3 mb-6">
          <Truck size={20} />
          <h3 className="text-lg font-bold">Delivery Address</h3>
        </div>

        {/* Address Box */}
        <div className="bg-[#FAF7F2] text-gray-800 rounded-xl p-5 mb-6">
          <h4 className="text-sm font-bold mb-1.5">Home Address</h4>
          <p className="text-xs font-medium leading-relaxed max-w-[200px]">
            Flat 402, Lotus Residency, Mumbai, Maharashtra 400001
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-8 text-white/90">
          <div className="flex items-center gap-2.5 text-xs font-medium">
            <Phone size={14} /> +91 98765 43210
          </div>
          <div className="flex items-center gap-2.5 text-xs font-medium">
            <Mail size={14} /> patient@ayurcare.com
          </div>
        </div>

        {/* Action Button - Rounded Full Outline */}
        <button className="w-full bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-sm">
          Track Shipment
        </button>
      </div>

      {/* 2. Payment Summary Card */}
      <div className="bg-[#3A6447] text-white rounded-[24px] p-6 shadow-sm border border-[#2C4D36]">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={20} />
          <h3 className="text-lg font-bold">Payment Summary</h3>
        </div>

        {/* Breakdown - Changed $ to ₹ */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm font-medium text-white/80">
            <span>Product Total</span>
            <span className="text-white font-bold">₹49.99</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-white/80">
            <span>Delivery Charges</span>
            <span className="text-white font-bold">₹4.50</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-white/80">
            <span>Tax (GST 5%)</span>
            <span className="text-white font-bold">₹0.00</span>
          </div>
        </div>

        {/* Total Amount Box - Changed $ to ₹ */}
        <div className="flex justify-between items-center py-5 border-t border-b border-white/10 mb-8">
          <p className="text-sm font-medium text-white/90 leading-tight">Total<br />Amount Paid</p>
          <div className="bg-white rounded-xl py-3.5 px-6 flex items-center justify-center shadow-inner">
            <span className="text-3xl font-extrabold text-[#3A6447] tracking-tight">₹54.49</span>
          </div>
        </div>

        {/* Paid Via line */}
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-white/90 uppercase tracking-widest pt-2">
          <CreditCard size={14} />
          PAID VIA CREDIT CARD (**** 4242)
        </div>
      </div>

      {/* 3. Wellness Tip Card */}
      <div className="bg-[#FDF9EE] text-black rounded-[24px] p-6 shadow-lg  border-[#2C4D36]">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles size={20} />
          <h3 className="text-base font-bold">Wellness Tip</h3>
        </div>
        <p className="text-sm text-black/80 font-medium leading-relaxed">
          Consume Ashwagandha with warm milk at bedtime for optimal stress relief and recovery.
        </p>
      </div>

    </div>
  );
};

export default OrderInfoSidePanel;
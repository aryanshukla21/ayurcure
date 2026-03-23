import React from 'react';
import { AlertCircle } from 'lucide-react';

const PaymentSummaryCard = ({ summary }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-green-700 mb-6">Payment Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Product Total</span>
          <span className="text-gray-900 font-bold">₹{summary.productTotal}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Delivery Charges</span>
          <span className="text-gray-900 font-bold">₹{summary.delivery}</span>
        </div>
      </div>

      <div className="flex justify-between items-center py-6 border-t border-[#EFEBE1] mb-6">
        <span className="text-sm font-bold text-gray-900">Final Amount</span>
        <span className="text-2xl font-extrabold text-[#3A6447]">₹{summary.finalAmount}</span>
      </div>

      {/* Gateway Notice Box */}
      <div className="bg-[#FEF5D3]/50 border border-[#FEF5D3] rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={16} className="text-[#A67C00] shrink-0 mt-0.5" />
        <p className="text-[11px] font-bold text-[#A67C00] leading-relaxed">
          Payment verified via Razorpay Gateway. Tax compliance verified for Karnataka state.
        </p>
      </div>
    </div>
  );
};

export default PaymentSummaryCard;
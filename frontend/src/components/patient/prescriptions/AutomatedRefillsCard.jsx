import React from 'react';
import { RefreshCw, PackageCheck } from 'lucide-react';

const AutomatedRefillsCard = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#FAF7F2] border border-[#EFEBE1] rounded-[32px] p-6 sm:p-8 h-full animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded-full shrink-0"></div>
        </div>
      </div>
    );
  }

  const activeRefills = data?.activeRefills || 0;
  const nextDelivery = data?.nextDeliveryDate || 'Not scheduled';
  const hasRefills = activeRefills > 0;

  return (
    <div className="bg-[#FAF7F2] border border-[#EFEBE1] rounded-[32px] p-6 sm:p-8 h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-white p-2.5 rounded-xl text-[#8B6A47] shadow-sm">
          <RefreshCw size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Automated Refills</h3>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EFEBE1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-1">
            {hasRefills ? `${activeRefills} Active Subscriptions` : 'No Active Subscriptions'}
          </p>
          <div className="flex items-center gap-2">
            <PackageCheck size={18} className="text-[#4A7C59]" />
            <span className="text-gray-900 font-bold">
              {hasRefills ? `Next Delivery: ${nextDelivery}` : 'Set up automatic delivery'}
            </span>
          </div>
        </div>
        <button className="bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-full text-sm transition-colors shadow-sm whitespace-nowrap">
          {hasRefills ? 'Manage Refills' : 'Setup Now'}
        </button>
      </div>
    </div>
  );
};

export default AutomatedRefillsCard;
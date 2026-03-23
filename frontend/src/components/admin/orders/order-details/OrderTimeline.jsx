import React from 'react';
import { CheckCircle2, Truck, CreditCard } from 'lucide-react';

const OrderTimeline = ({ timeline }) => {
  const icons = {
    delivered: <CheckCircle2 size={20} className="text-[#3A6447]" />,
    shipped: <Truck size={20} className="text-[#D9774B]" />,
    payment: <CreditCard size={20} className="text-gray-500" />
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <p className="text-[12px] font-bold text-amber-700 uppercase tracking-widest mb-6">Order Timeline</p>
      
      <div className="relative pl-4 border-l-2 border-[#EFEBE1] space-y-8 pb-4">
        {timeline.map((event, i) => (
          <div key={i} className="relative">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[27px] top-0 bg-white py-1">
               {icons[event.type]}
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
              <p className="text-xs font-medium text-gray-500 mt-1">{event.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;
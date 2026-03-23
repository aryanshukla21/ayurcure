import React from 'react';

const TOP_PRODUCTS = [
  { name: 'Ashwagandha Gold Capsules', category: 'HERBAL SUPPLEMENT', revenue: '₹84,200', sales: '240 units sold' },
  { name: 'Organic Brahmi Tea', category: 'BEVERAGE', revenue: '₹52,100', sales: '210 units sold' },
  { name: 'Triphala Powder 500g', category: 'DIGESTIVE CARE', revenue: '₹38,400', sales: '185 units sold' },
];

const TOP_CONSULTANTS = [
  { name: 'Dr. Amit Sharma', spec: 'BASIC CARE', consults: '124 Consultations', rating: '4.9/5 Rating' },
  { name: 'Dr. Priya Varma', spec: 'PANCHAKARMA', consults: '112 Consultations', rating: '4.8/5 Rating' },
  { name: 'Dr. Rohan Gupta', spec: 'YOGA THERAPY', consults: '94 Consultations', rating: '4.9/5 Rating' },
];

const TopPerformersSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Top Performing Products */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Top Performing Products</h3>
          <button className="text-xs font-bold text-[#3A6447] hover:text-[#2C4D36] transition-colors">View Inventory</button>
        </div>

        <div className="space-y-4">
          {TOP_PRODUCTS.map((prod, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#EFEBE1]">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 w-6">0{i + 1}</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{prod.name}</h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{prod.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#3A6447]">{prod.revenue}</p>
                <p className="text-[10px] font-medium text-gray-500 mt-0.5">{prod.sales}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Consultants */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Top Consultants</h3>
          <button className="text-xs font-bold text-[#3A6447] hover:text-[#2C4D36] transition-colors">Manage Doctors</button>
        </div>

        <div className="space-y-4">
          {TOP_CONSULTANTS.map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#EFEBE1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447] font-bold text-sm shrink-0">
                  {doc.name.split(' ')[1][0]}{doc.name.split(' ')[2][0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{doc.name}</h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{doc.spec}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{doc.consults}</p>
                <p className="text-[10px] font-medium text-[#D49A44] mt-0.5">{doc.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TopPerformersSection;
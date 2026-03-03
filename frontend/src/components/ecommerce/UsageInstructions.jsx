import React from 'react';

export const UsageInstructions = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
    <div>
      <h4 className="text-xs font-black uppercase tracking-widest text-ayur-green mb-4">Dosage</h4>
      <p className="text-sm text-gray-600 font-medium">1-2 Capsules twice daily after meals with warm water or milk[cite: 559, 560].</p>
    </div>
    <div>
      <h4 className="text-xs font-black uppercase tracking-widest text-ayur-green mb-4">Dietary Tip</h4>
      <p className="text-sm text-gray-600 font-medium">Pairs well with a Sattvic diet rich in almonds and walnuts[cite: 561, 562].</p>
    </div>
  </div>
);
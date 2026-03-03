import React from 'react';

export const SymptomsForm = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800">Tell us how you're feeling</h3>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Concern *</label>
      <input 
        type="text" 
        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange focus:border-transparent outline-none"
        placeholder="e.g. Chronic back pain, persistent migraines"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Symptoms</label>
      <select className="w-full p-4 rounded-xl border border-gray-200 outline-none appearance-none bg-white">
        <option>Select duration</option>
        <option>Less than a week</option>
        <option>1-4 weeks</option>
        <option>More than a month</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Medical Reports (Optional)</label>
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 hover:border-ayur-orange hover:bg-orange-50 transition-all cursor-pointer">
        <span className="text-2xl mb-2 block">📄</span>
        Click to upload or drag and drop
      </div>
    </div>
  </div>
);
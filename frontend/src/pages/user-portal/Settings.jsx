import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const interests = ["Meditation", "Ayurvedic Diet", "Yoga Therapy", "Stress Management", "Sleep Hygiene"];

  return (
    <DashboardLayout activeTab="Profile">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-500 mt-2">Manage your personal information and health preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Personal Information</h3>
          <p className="text-sm text-gray-500 mb-8">Basic details about your identity</p>

          <div className="flex items-center gap-6 mb-10">
            <div className="w-24 h-24 rounded-full bg-ayur-green-light relative flex items-center justify-center text-3xl">
              👤
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-ayur-orange text-white rounded-full flex items-center justify-center border-2 border-white hover:scale-110 transition-transform">
                📷
              </button>
            </div>
            <div>
              <p className="font-bold text-gray-800 mb-2">Profile Photo</p>
              <p className="text-xs text-gray-400 mb-3">PNG or JPEG. Max size 2MB</p>
              <div className="flex gap-4">
                <button className="text-sm font-bold text-ayur-green">Change</button>
                <button className="text-sm font-bold text-red-500">Remove</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Full Name</label>
              <input type="text" defaultValue="Aria Sharma" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none font-medium text-gray-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Email Address</label>
              <input type="email" defaultValue="aria.sharma@example.com" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none font-medium text-gray-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Phone Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none font-medium text-gray-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Dosha Type</label>
              <select className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none font-medium text-gray-800 bg-white">
                <option value="vata">Vata</option>
                <option value="pitta" selected>Pitta</option>
                <option value="kapha">Kapha</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>

        {/* Health Interests Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Health Interests</h3>
          <p className="text-sm text-gray-500 mb-8">Topics you want to receive personalized advice on</p>
          
          <div className="flex flex-wrap gap-4">
            {interests.map((interest) => (
              <button 
                key={interest} 
                className="px-5 py-3 rounded-full border-2 border-gray-100 text-sm font-bold text-gray-600 hover:border-ayur-orange hover:text-ayur-orange transition-colors flex items-center gap-2"
              >
                <span>✨</span> {interest}
              </button>
            ))}
            <button className="px-5 py-3 rounded-full border border-dashed border-gray-300 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              + Add More
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

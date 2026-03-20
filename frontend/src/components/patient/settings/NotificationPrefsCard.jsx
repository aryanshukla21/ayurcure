import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-[#3A6447]' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

const NotificationPrefsCard = () => {
  const [prefs, setPrefs] = useState({ appointments: true, orders: true });

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <Bell size={20} className="text-[#D9774B]" />
        <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Appointment reminders</h4>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Get notified 24 hours before your session</p>
          </div>
          <ToggleSwitch checked={prefs.appointments} onChange={() => setPrefs({ ...prefs, appointments: !prefs.appointments })} />
        </div>

        <div className="w-full h-[1px] bg-[#EFEBE1]"></div>

        <div className="flex justify-between items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Order updates</h4>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Pharmacy dispatch and delivery alerts</p>
          </div>
          <ToggleSwitch checked={prefs.orders} onChange={() => setPrefs({ ...prefs, orders: !prefs.orders })} />
        </div>
      </div>
    </div>
  );
};

export default NotificationPrefsCard;
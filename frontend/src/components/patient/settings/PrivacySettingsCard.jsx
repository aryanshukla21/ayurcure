import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-[#3A6447]' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

const PrivacySettingsCard = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="bg-[#FDF9EE] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <Lock size={20} className="text-[#3A6447]" />
        <h3 className="text-xl font-bold text-gray-900">Privacy Settings</h3>
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="text-sm font-bold text-gray-900">Profile visibility</h4>
          <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed max-w-[240px]">
            Allow authorized practitioners to view your basic wellness profile before an appointment.
          </p>
        </div>
        <ToggleSwitch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
      </div>
    </div>
  );
};

export default PrivacySettingsCard;
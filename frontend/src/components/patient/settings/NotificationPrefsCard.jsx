import React from 'react';
import { Bell, Mail, Smartphone, MessageCircle } from 'lucide-react';

const NotificationPrefsCard = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-full">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-50 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const safeData = data || {};

  // Toggle switch UI component
  const Toggle = ({ enabled, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={!isEditing}
      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 disabled:opacity-50 ${enabled ? 'bg-[#4A7C59]' : 'bg-gray-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  );

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#EFEBE1]">
        <div className="bg-[#E7F3EB] p-2.5 rounded-xl text-[#4A7C59]">
          <Bell size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Manage how we communicate with you.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFEBE1] transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg text-gray-400 shadow-sm"><Mail size={16} /></div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Email Alerts</h4>
              <p className="text-[11px] text-gray-500 font-medium">Prescriptions, reports & appointment summaries.</p>
            </div>
          </div>
          <Toggle enabled={safeData.emailAlerts !== false} onClick={() => onChange('emailAlerts', !(safeData.emailAlerts !== false))} />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFEBE1] transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg text-gray-400 shadow-sm"><Smartphone size={16} /></div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">SMS Reminders</h4>
              <p className="text-[11px] text-gray-500 font-medium">Upcoming sessions and refill alerts.</p>
            </div>
          </div>
          <Toggle enabled={safeData.smsAlerts !== false} onClick={() => onChange('smsAlerts', !(safeData.smsAlerts !== false))} />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFEBE1] transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg text-green-500 shadow-sm"><MessageCircle size={16} /></div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">WhatsApp Updates</h4>
              <p className="text-[11px] text-gray-500 font-medium">Get instant delivery tracking and doctor notes.</p>
            </div>
          </div>
          <Toggle enabled={safeData.whatsappAlerts} onClick={() => onChange('whatsappAlerts', !safeData.whatsappAlerts)} />
        </div>
      </div>
    </div>
  );
};

export default NotificationPrefsCard;
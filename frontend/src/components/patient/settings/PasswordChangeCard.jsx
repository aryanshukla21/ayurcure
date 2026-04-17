import React, { useState } from 'react';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { patientApi } from '../../../api/patientApi';

const PasswordChangeCard = ({ isLoading }) => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  if (isLoading) {
    return (
      <div className="bg-[#FAF7F2] rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-full">
        <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
        <div className="space-y-4 mb-6">
          <div className="h-12 bg-white rounded-2xl w-full"></div>
          <div className="h-12 bg-white rounded-2xl w-full"></div>
          <div className="h-12 bg-white rounded-2xl w-full"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-full w-full"></div>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setStatus({ loading: false, success: false, error: "New passwords don't match." });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      await patientApi.changePassword({ current: passwords.current, new: passwords.new });
      setStatus({ loading: false, success: true, error: '' });
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 3000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: "Failed to update password." });
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white p-2.5 rounded-xl text-[#8B6A47] shadow-sm">
          <KeyRound size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Security</h3>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col flex-1">
        <div className="space-y-4 mb-6">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            required
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            required
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            required
            className="w-full px-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all"
          />
        </div>

        {status.error && <p className="text-xs text-red-500 font-bold mb-4">{status.error}</p>}

        <button
          type="submit"
          disabled={status.loading}
          className="w-full mt-auto bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          {status.success ? <><CheckCircle2 size={16} className="text-[#4A7C59]" /> Updated</> : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeCard;
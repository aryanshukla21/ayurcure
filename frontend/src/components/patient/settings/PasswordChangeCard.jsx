import React, { useState } from 'react';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { patientApi } from '../../../api/patientApi';

const PasswordChangeCard = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    setMessage('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus('error');
      setMessage('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('New password must be at least 8 characters long.');
      return;
    }

    try {
      setStatus('loading');

      // STRICT PAYLOAD MATCH: Must match 'currentPassword' and 'newPassword' exactly
      const response = await patientApi.changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword
      });

      setStatus('success');
      setMessage(response.message || 'Password updated successfully!');

      // Clear inputs on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);
    } catch (err) {
      console.error("Error updating password:", err);
      setStatus('error');
      // Safely grab the error message sent from the backend
      setMessage(err.response?.data?.error || 'Failed to update password. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-50 p-2.5 rounded-xl text-red-500">
          <Lock size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            placeholder="Enter current password"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {/* Status Messages */}
        {status === 'error' && (
          <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{message}</p>
        )}
        {status === 'success' && (
          <p className="text-xs font-bold text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
            <CheckCircle2 size={16} /> {message}
          </p>
        )}

        <div className="pt-2">
          <button
            onClick={handleUpdate}
            disabled={status === 'loading'}
            className={`px-8 py-3 rounded-xl font-bold text-sm text-white transition-colors flex items-center gap-2 shadow-md ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3A6447] hover:bg-[#2C4D36]'}`}
          >
            {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
            {status === 'loading' ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeCard;
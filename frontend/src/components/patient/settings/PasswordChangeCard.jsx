import React, { useState } from 'react';
import { ShieldCheck, X, Check, Edit2 } from 'lucide-react';

const INITIAL_PASSWORDS = {
  current: '••••••••',
  new: '••••••••',
  confirm: '••••••••'
};

const PasswordChangeCard = () => {
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleCancel = () => {
    setPasswords(INITIAL_PASSWORDS);
    setIsEditing(false);
  };

  const handleUpdate = () => {
    console.log("Password successfully updated");
    setPasswords(INITIAL_PASSWORDS);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col transition-all">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck size={20} className="text-gray-500" />
        <h3 className="text-xl font-bold text-gray-900">Password Change</h3>
      </div>

      <div className="flex flex-col gap-5 mb-8 flex-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none transition-colors ${isEditing
                ? 'bg-white border-[#EFEBE1] focus:ring-2 focus:ring-[#8C6239] cursor-text'
                : 'bg-transparent border-transparent cursor-not-allowed'
              }`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Password</label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none transition-colors ${isEditing
                ? 'bg-white border-[#EFEBE1] focus:ring-2 focus:ring-[#8C6239] cursor-text'
                : 'bg-transparent border-transparent cursor-not-allowed'
              }`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none transition-colors ${isEditing
                ? 'bg-white border-[#EFEBE1] focus:ring-2 focus:ring-[#8C6239] cursor-text'
                : 'bg-transparent border-transparent cursor-not-allowed'
              }`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-auto">
        {isEditing ? (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={handleCancel}
              className="flex-1 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-4 rounded-full transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 bg-[#8C6239] hover:bg-[#734F2D] text-white font-bold py-3.5 px-4 rounded-full transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <Check size={16} /> Update
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="w-full bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-8 rounded-full transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <Edit2 size={16} /> Edit Password
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordChangeCard;
import React from 'react';

const PersonalInfoSection = ({ formData, onChange, isEditing = true }) => {
  const inputBaseClass = `w-full mt-1 p-3.5 rounded-xl border text-sm font-bold transition-colors outline-none focus:ring-2 focus:ring-[#3A6447]/20 ${!isEditing ? 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed' : 'bg-[#FAF7F2] border-[#EFEBE1] text-gray-900'
    }`;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="Dr. Full Name"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="doctor@ayurcare.com"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="+91 XXXXX XXXXX"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Emergency Contact</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="+91 XXXXX XXXXX"
            className={inputBaseClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clinic / Residential Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="Full Address"
            className={inputBaseClass}
          />
        </div>

        {/* Only show password field if editing/adding */}
        {isEditing && (
          <div className="md:col-span-2 pt-4 border-t border-[#EFEBE1]">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Set Password (Optional if Edit)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              disabled={!isEditing}
              placeholder="Leave blank to keep current password"
              className={inputBaseClass}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
import React from 'react';
import { UserSquare2 } from 'lucide-react';

const PersonalDetailsCard = ({ profile, isEditing, onChange }) => (
  <div className="bg-white rounded-[32px] p-8 shadow-sm h-full flex flex-col">
    <UserSquare2 size={20} className="text-[#4A7C59] mb-6" />
    <h3 className="text-sm font-bold text-gray-900 mb-6">Personal Details</h3>
    <div className="space-y-5 flex-1">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
        {isEditing ? <input type="text" name="name" value={profile.name} onChange={onChange} className="w-full bg-[#FAF7F2] p-2 rounded-lg text-sm font-bold outline-none" /> : <p className="text-sm font-bold text-gray-900">{profile.name}</p>}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date of Birth</p>
        {isEditing ? <input type="text" name="dob" value={profile.dob} onChange={onChange} className="w-full bg-[#FAF7F2] p-2 rounded-lg text-sm font-bold outline-none" /> : <p className="text-sm font-bold text-gray-900">{profile.dob}</p>}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gender</p>
        {isEditing ? <input type="text" name="gender" value={profile.gender} onChange={onChange} className="w-full bg-[#FAF7F2] p-2 rounded-lg text-sm font-bold outline-none" /> : <p className="text-sm font-bold text-gray-900">{profile.gender}</p>}
      </div>
    </div>
  </div>
);
export default PersonalDetailsCard;
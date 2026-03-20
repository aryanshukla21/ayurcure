import React from 'react';
import { Contact2 } from 'lucide-react';

const EmergencyContactCard = ({ emergency, isEditing, onChange }) => (
  <div className="bg-white rounded-[32px] p-8 shadow-sm h-full flex flex-col">
    <Contact2 size={20} className="text-[#D9774B] mb-6" />
    <h3 className="text-sm font-bold text-gray-900 mb-6">Emergency Contact</h3>
    <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EFEBE1]">
      {isEditing ? (
        <div className="space-y-3">
          <input type="text" name="emergencyName" value={emergency.name} onChange={onChange} placeholder="Name" className="w-full bg-white p-2 rounded-lg text-sm font-bold outline-none" />
          <input type="text" name="emergencyRelation" value={emergency.relation} onChange={onChange} placeholder="Relation" className="w-full bg-white p-2 rounded-lg text-sm font-medium outline-none" />
          <input type="text" name="emergencyPhone" value={emergency.phone} onChange={onChange} placeholder="Phone" className="w-full bg-white p-2 rounded-lg text-sm font-bold outline-none" />
        </div>
      ) : (
        <>
          <h4 className="text-sm font-bold text-gray-900">{emergency.name}</h4>
          <p className="text-xs font-medium text-gray-500 mb-3">{emergency.relation}</p>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            {emergency.phone}
          </div>
        </>
      )}
    </div>
  </div>
);
export default EmergencyContactCard;
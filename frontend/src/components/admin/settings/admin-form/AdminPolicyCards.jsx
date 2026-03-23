import React from 'react';
import { Smartphone, History, Key } from 'lucide-react';

const AdminPolicyCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#EFEBE1]">
      
      {/* 2FA Enforcement */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="text-[#8C6239] mb-4">
          <Smartphone size={20} />
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-2">2FA Enforcement</h4>
        <p className="text-xs font-medium text-gray-500 leading-relaxed">
          New admins are prompted to set up 2-Factor Authentication on their first login.
        </p>
      </div>

      {/* Audit Logs */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="text-[#D49A44] mb-4">
          <History size={20} />
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-2">Audit Logs</h4>
        <p className="text-xs font-medium text-gray-500 leading-relaxed">
          Every action performed by this admin will be recorded in the system master audit trail.
        </p>
      </div>

      {/* Role-Based Access */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="text-[#D9774B] mb-4">
          <Key size={20} />
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-2">Role-Based Access</h4>
        <p className="text-xs font-medium text-gray-500 leading-relaxed">
          Modify specific permissions for this role in the Permissions Matrix tab.
        </p>
      </div>

    </div>
  );
};

export default AdminPolicyCards;
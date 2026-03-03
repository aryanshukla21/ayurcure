import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';

export const UserManagement = () => {
  const users = [
    { name: "Dr. Ananya Sharma", email: "ananya@ayurcure.com", role: "Doctor", status: "Active" },
    { name: "Rahul Verma", email: "rahul.v@gmail.com", role: "Patient", status: "Active" },
    { name: "Dr. Rajesh Iyer", email: "iyer.health@ayurcure.com", role: "Doctor", status: "Inactive" },
    { name: "Priya Singh", email: "priya88@outlook.com", role: "Patient", status: "Active" },
  ];

  return (
    <DashboardLayout activeTab="User Management">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 px-4 w-1/2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-400">🔍</span>
            <input type="text" placeholder="Search by name, email or role..." className="w-full bg-transparent p-3 outline-none text-sm" />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <span>⚙️</span> Filter
            </Button>
            <Button variant="primary" className="flex items-center gap-2">
              <span>+</span> Add New User
            </Button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-4 font-bold">Name</th>
              <th className="pb-4 font-bold">Email</th>
              <th className="pb-4 font-bold">Role</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((u, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-5 font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ayur-orange/20 text-ayur-orange flex items-center justify-center text-xs">
                    {u.name.charAt(0)}
                  </div>
                  {u.name}
                </td>
                <td className="py-5 text-gray-500">{u.email}</td>
                <td className="py-5">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${u.role === 'Doctor' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="text-gray-600">{u.status}</span>
                  </div>
                </td>
                <td className="py-5 text-right pr-4 text-gray-400">
                  <button className="mr-3 hover:text-ayur-green">✏️</button>
                  <button className="hover:text-red-500">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
          <p>Showing 1 to 4 of 1,248 results</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-ayur-orange text-white font-bold">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">3</button>
            <span>...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100">312</button>
            <button className="px-2 hover:text-gray-800">→</button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
import React from 'react';

export const DashboardLayout = ({ children, activeTab }) => {
  const menuItems = [
    { name: 'Overview', icon: '📊' },
    { name: 'Appointments', icon: '📅' },
    { name: 'Prescriptions', icon: '💊' },
    { name: 'Orders', icon: '🛍️' },
    { name: 'Profile', icon: '👤' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-8 text-2xl font-bold text-ayur-green">AyurCure</div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                activeTab === item.name 
                ? 'bg-ayur-green text-white shadow-lg shadow-ayur-green/20' 
                : 'text-gray-500 hover:bg-ayur-green-light'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-xl cursor-pointer text-red-500 transition-colors">
            <span>🚪</span>
            <span className="font-medium">Log Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome back, Alex</h2>
            <p className="text-gray-500 mt-1">Your holistic health journey is 85% complete this week.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100 relative">
              🔔 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-ayur-green text-white px-5 py-2 rounded-xl font-medium shadow-md shadow-ayur-green/10">
              + New Consultation
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
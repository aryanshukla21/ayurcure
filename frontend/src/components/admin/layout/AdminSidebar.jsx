import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Stethoscope, ShoppingCart, FileText, BarChart3, Settings, ShieldCheck } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
    { name: 'Patients', path: '/admin/patients', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#3A6447] min-h-screen text-white flex flex-col fixed left-0 top-0 bottom-0 z-50">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-white text-[#3A6447] rounded-lg flex items-center justify-center font-bold text-xl">A</div>
        <div>
          <h1 className="text-lg font-bold leading-tight">Ayurcare360</h1>
          <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Health Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all
              ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-white/70 hover:bg-white/10 hover:text-white'}
            `}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-6 mt-auto">
        <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-0.5">System Status</p>
            <p className="text-xs font-bold text-white">All systems normal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
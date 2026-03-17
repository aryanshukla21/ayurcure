import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, DollarSign, User, Settings, LogOut } from 'lucide-react';

const DoctorSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem('role');
        // You can also clear other items like tokens here if stored in localStorage

        // Redirect to login page or home
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
        { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
        { name: 'Earnings', path: '/doctor/earnings', icon: DollarSign },
        { name: 'Profile', path: '/doctor/profile', icon: User },
        { name: 'Settings', path: '/doctor/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-[#4A7C59] text-white flex flex-col h-full shadow-lg z-20">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-[#4A7C59] rounded-full flex items-center justify-center font-bold text-xl">🌿</div>
                <span className="text-xl font-bold tracking-wide">Ayurcare360</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-white text-[#4A7C59] font-semibold shadow-sm'
                                : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Profile Snippet & Logout */}
            <div className="p-4 mt-auto border-t border-white/10 bg-black/5">

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-red-100 bg-red-500/10 hover:bg-red-500/20 hover:text-white rounded-xl transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default DoctorSidebar;
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileText, ShoppingCart, DollarSign, User, Settings, UserPlus, Pill } from 'lucide-react';

const NavItem = ({ icon, label, active, to }) => (
    <Link
        to={to}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] md:text-[16px] transition-colors ${active ? 'bg-[#3d6649] font-semibold text-white' : 'text-green-50 hover:bg-[#3d6649]/50'}`}
    >
        {icon}
        <span>{label}</span>
    </Link>
);

const Sidebar = ({ activePath }) => {
    return (
        <aside className="w-[260px] bg-[#4A7C59] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0">
            <div>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#4A7C59] font-bold text-[16px]">A</div>
                    <span className="text-[20px] font-semibold tracking-[0.3px]">AyurCare360</span>
                </div>
                <nav className="mt-4 flex flex-col gap-1 px-4">
                    <NavItem icon={<Users size={20} />} label="Dashboard" active={activePath === 'dashboard'} to="/doctor/dashboard" />
                    {/* <NavItem icon={<UserPlus size={20} />} label="Patients" active={activePath === 'patients'} to="/doctor/patients" /> */}
                    <NavItem icon={<Calendar size={20} />} label="Appointments" active={activePath === 'appointments'} to="/doctor/appointments" />
                    {/* <NavItem icon={<Pill size={20} />} label="Prescriptions" active={activePath === 'prescriptions'} to="/doctor/prescriptions" /> */}
                    {/* <NavItem icon={<FileText size={20} />} label="Health Reports" active={activePath === 'reports'} to="/doctor/reports" /> */}
                    {/* <NavItem icon={<ShoppingCart size={20} />} label="Orders" active={activePath === 'orders'} to="/doctor/orders" /> */}
                    <NavItem icon={<DollarSign size={20} />} label="Payouts" active={activePath === 'payouts'} to="/doctor/payouts" />
                </nav>
            </div>
            <div className="p-4 flex flex-col gap-1">
                <NavItem icon={<User size={20} />} label="Profile" active={activePath === 'profile'} to="/doctor/profile" />
                <NavItem icon={<Settings size={20} />} label="Settings" active={activePath === 'settings'} to="/doctor/settings" />
            </div>
        </aside>
    );
};

export default Sidebar;
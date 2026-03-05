import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '⊞', path: '/dashboard' },
        { name: 'Appointments', icon: '📅', path: '/appointments', active: true },
        { name: 'Consultations', icon: '🏥', path: '/consultations' },
        { name: 'Prescriptions', icon: '📋', path: '/prescriptions' },
        { name: 'Health Reports', icon: '📊', path: '/reports' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between h-screen sticky top-0 py-8 px-6">
            <div>
                {/* Logo */}
                <div className="flex items-center gap-2 text-xl font-bold text-ayur-green mb-12">
                    <span className="text-2xl">🌿</span>
                    <div>
                        AyurCure
                        <div className="text-xs font-normal text-gray-400">Wellness Portal</div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${item.active
                                ? 'bg-orange-50 text-ayur-orange'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer Settings & Profile */}
            <div className="space-y-4 pt-8 border-t border-gray-100">
                <Link to="/settings" className="flex items-center gap-4 px-4 py-2 text-gray-500 font-medium hover:text-gray-900">
                    <span className="text-lg">⚙️</span>
                    Settings
                </Link>
                <div className="flex items-center gap-3 px-4 py-2 mt-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-ayur-orange font-bold">
                        JD
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">Jane Doe</div>
                        <div className="text-xs text-gray-500">Premium Member</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
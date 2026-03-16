import React from 'react';
import { Outlet } from 'react-router-dom';
import { Search } from 'lucide-react';
import DoctorSidebar from './DoctorSidebar';

const DoctorLayout = () => {
    return (
        < div className="flex h-screen bg-[#FDF9EE] overflow-hidden" >
            <DoctorSidebar />

            <div className="flex-1 flex flex-col overflow-hidden w-full">

                <header className="h-28 px-10 flex items-center justify-between bg-[#FDF9EE] z-10">

                    <div className="relative w-full max-w-[1024px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
                        <input
                            type="text"
                            placeholder="Search patients, records, or herbs..."
                            className="w-full pl-14 pr-6 py-4 bg-[#EEE8D7] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/30 shadow-sm text-base text-black placeholder-gray-700 transition-shadow"
                        />
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="text-right hidden sm:block">
                                <p className="text-base font-bold text-gray-900 leading-tight">Doctor Dashboard</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Chief Resident</p>
                            </div>
                            <div className="w-14 h-14 rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-100">
                                <img
                                    src="https://ui-avatars.com/api/?name=Julian+Reed&background=E5E7EB&color=4A7C59"
                                    className="w-full h-full object-cover"
                                    alt="Doctor Profile"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div >
    );
};

export default DoctorLayout;
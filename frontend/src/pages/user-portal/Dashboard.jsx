import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { PrescriptionsList } from '../../components/dashboard/PrescriptionsList';
import { OrderHistoryList } from '../../components/dashboard/OrderHistoryList';
import { StatsRow } from '../../components/dashboard/StatsRow';

export const Dashboard = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Check if the login/signup flag is set in session storage
        if (sessionStorage.getItem('showWelcomePopup') === 'true') {
            setShowWelcome(true);
            sessionStorage.removeItem('showWelcomePopup'); // Remove so it only shows once

            // Auto-hide popup after 4 seconds
            setTimeout(() => setShowWelcome(false), 4000);
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans relative">

            {/* STYLISH WELCOME POPUP */}
            <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out transform ${showWelcome ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                <div className="bg-white border-l-4 border-ayur-green px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">
                        🌿
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Welcome to AyurCure!</h3>
                        <p className="text-sm text-gray-500 font-medium">Your wellness journey starts here.</p>
                    </div>
                </div>
            </div>

            <Sidebar />

            <main className="flex-1 p-10 max-w-7xl mx-auto flex flex-col gap-8">
                <DashboardHeader />

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Health Seeker</h1>
                    <p className="text-gray-500">Track your wellness journey and manage your Ayurvedic treatments.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <PrescriptionsList />
                    <OrderHistoryList />
                </div>

                <StatsRow />
            </main>
        </div>
    );
};
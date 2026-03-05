import React from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { PrescriptionsList } from '../../components/dashboard/PrescriptionsList';
import { OrderHistoryList } from '../../components/dashboard/OrderHistoryList';
import { StatsRow } from '../../components/dashboard/StatsRow';

export const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
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
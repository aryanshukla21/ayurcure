import React from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { AppointmentsTable } from '../../components/appointments/AppointmentsTable';
import { ActionCards } from '../../components/appointments/ActionCards';
import { Button } from '../../components/common/Button';

export const Appointments = () => {
    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
            <Sidebar />

            <main className="flex-1 p-10 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
                        <p className="text-gray-500">Keep track of your journey towards holistic wellness.</p>
                    </div>
                    <Button variant="primary" className="bg-ayur-orange text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors">
                        + New Appointment
                    </Button>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    <AppointmentsTable />
                    <ActionCards />
                </div>
            </main>
        </div>
    );
};
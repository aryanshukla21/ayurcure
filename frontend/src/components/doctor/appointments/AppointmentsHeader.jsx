import React from 'react';
import { Search, Plus } from 'lucide-react';

const AppointmentsHeader = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Appointments</h1>
                <p className="text-gray-500 text-lg">
                    Manage and monitor your upcoming patient consultations.
                </p>
            </div>


        </div>
    );
};

export default AppointmentsHeader;
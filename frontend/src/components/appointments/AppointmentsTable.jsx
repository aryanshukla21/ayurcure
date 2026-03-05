import React from 'react';

export const AppointmentsTable = () => {
    const appointments = [
        { id: 1, doctor: 'Dr. Anjali Sharma', spec: 'Ayurvedic Specialist • 12 years exp', date: 'Oct 12, 2023', time: '10:30 AM - 11:30 AM', status: 'COMPLETED', avatar: '👩‍⚕️' },
        { id: 2, doctor: 'Dr. Vikram Seth', spec: 'Panchakarma Expert • 15 years exp', date: 'Sep 25, 2023', time: '03:00 PM - 04:00 PM', status: 'COMPLETED', avatar: '👨‍⚕️' },
        { id: 3, doctor: 'Dr. Sneha Rao', spec: 'Nutritionist • 8 years exp', date: 'Aug 30, 2023', time: '11:00 AM - 11:30 AM', status: 'CANCELLED', avatar: '👩‍⚕️' },
        { id: 4, doctor: 'Dr. Rajesh Iyer', spec: 'Yoga Therapist • 20 years exp', date: 'Jul 15, 2023', time: '08:00 AM - 09:00 AM', status: 'COMPLETED', avatar: '👨‍⚕️' },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 mb-6">
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-gray-900 transition-colors">
                    Upcoming (2)
                </button>
                <button className="px-6 py-3 text-gray-900 font-bold border-b-2 border-ayur-orange">
                    Past Consultations
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by doctor or specialty..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-ayur-green"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
                    <span>≡</span> Filter
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
                    <span>📥</span> Export
                </button>
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">DOCTOR & SPECIALTY</div>
                <div className="col-span-3">CONSULTATION DATE</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-3 text-right">ACTIONS</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-50">
                {appointments.map((apt) => (
                    <div key={apt.id} className="grid grid-cols-12 gap-4 py-5 items-center">
                        <div className="col-span-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                                {apt.avatar}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">{apt.doctor}</div>
                                <div className="text-sm text-gray-500">{apt.spec}</div>
                            </div>
                        </div>

                        <div className="col-span-3">
                            <div className="font-medium text-gray-900">{apt.date}</div>
                            <div className="text-sm text-gray-500">{apt.time}</div>
                        </div>

                        <div className="col-span-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {apt.status}
                            </span>
                        </div>

                        <div className="col-span-3 flex justify-end items-center gap-4">
                            {apt.status === 'COMPLETED' ? (
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 border-b border-transparent hover:border-gray-900 transition-all">
                                    View Summary
                                </button>
                            ) : (
                                <span className="text-sm text-gray-300">No Summary</span>
                            )}
                            <button className="text-sm font-medium text-ayur-orange bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors">
                                Rebook
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-8 pt-4">
                <div className="text-sm text-gray-500">Showing 4 of 24 consultations</div>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
                    <button className="w-8 h-8 rounded-lg bg-ayur-orange text-white font-medium">1</button>
                    <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">2</button>
                    <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium">3</button>
                    <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
                </div>
            </div>
        </div>
    );
};
import React from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { SearchAndFilter } from '../../components/booking/doctorDiscovery/SearchAndFilter';
import { DoctorGrid } from '../../components/booking/doctorDiscovery/DoctorGrid';
// Assuming you have a Footer component from the landing page
import { Footer } from '../../components/landing/Footer';

export const DoctorDiscovery = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans">
            {/* <Navbar /> */}

            {/* Secondary Navigation specific to this flow */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-8 text-sm font-medium text-gray-500">
                    <a href="/" className="hover:text-ayur-green transition-colors">Home</a>
                    <a href="/doctors" className="text-ayur-green border-b-2 border-ayur-green pb-4 -mb-4">Doctors</a>
                    <a href="/treatments" className="hover:text-ayur-green transition-colors">Treatments</a>
                    <a href="/bookings" className="hover:text-ayur-green transition-colors">My Bookings</a>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Header Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find your Ayurvedic Expert</h1>
                    <p className="text-lg text-gray-600">Consult with certified practitioners for holistic healing and natural wellness.</p>
                </div>

                <SearchAndFilter />
                <DoctorGrid />
            </main>

            <Footer />
        </div>
    );
};
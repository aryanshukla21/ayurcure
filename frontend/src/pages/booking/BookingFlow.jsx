import React from 'react';
import { BookingHeader } from '../../components/booking/flow/BookingHeader';
import { DoctorSelectionStep } from '../../components/booking/flow/DoctorSelectionStep';
import { BookingFooter } from '../../components/booking/flow/BookingFooter';

export const BookingFlow = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      {/* Global Top Bar (Simplified for booking flow to reduce distraction) */}
      <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="text-2xl font-bold text-ayur-green flex items-center gap-2">
          <span>🌿</span> AyurCure
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
            🔔
          </button>
          <button className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-ayur-orange font-bold">
            JD
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-8 flex flex-col">
        <BookingHeader />

        <div className="flex-1 py-8">
          {/* This is where we would conditionally render steps. For now, it's Step 1 */}
          <DoctorSelectionStep />
        </div>
      </main>

      <BookingFooter />
    </div>
  );
};
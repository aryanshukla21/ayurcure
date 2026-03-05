import React from 'react';

export const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">
            🧑‍⚕️
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-green-50 text-ayur-green px-2 py-1 rounded-lg text-sm font-bold">
            <span>★</span> {doctor.rating}
          </div>
        </div>

        {/* Doctor Info */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-sm font-medium text-ayur-orange mb-4">{doctor.qualifications}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-gray-400">💼</span>
            {doctor.exp}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-gray-400">🗣️</span>
            {doctor.langs}
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="font-bold text-gray-900 text-lg">
          {doctor.fee}
        </div>
        <button className="bg-ayur-orange text-white px-6 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};
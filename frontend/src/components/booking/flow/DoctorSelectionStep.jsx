import React from 'react';
import { CategoryFilters } from './CategoryFilters';
import { SelectDoctorCard } from './SelectDoctorCard';

export const DoctorSelectionStep = () => {
    const doctors = [
        { id: 1, name: 'Dr. Vikram Sharma', title: 'Senior Ayurvedic Physician', rating: '4.9', reviews: '1.2k', exp: '15+ years', langs: 'English, Hindi, Sanskrit', avatar: '👨‍⚕️', active: false },
        { id: 2, name: 'Dr. Anjali Menon', title: 'Panchakarma Specialist', rating: '4.8', reviews: '890', exp: '10+ years', langs: 'English, Malayalam', avatar: '👩‍⚕️', active: true },
        { id: 3, name: 'Dr. Priya Reddy', title: 'Ayurvedic Nutritionist', rating: '4.9', reviews: '2.1k', exp: '8+ years', langs: 'English, Telugu, Hindi', avatar: '👩‍⚕️', active: false },
        { id: 4, name: 'Dr. Rajesh Iyer', title: 'Yoga & Lifestyle Consultant', rating: '4.7', reviews: '772', exp: '12+ years', langs: 'English, Tamil', avatar: '👨‍⚕️', active: false },
        { id: 5, name: 'Dr. Amit Verma', title: 'Chronic Pain Management', rating: '4.8', reviews: '1.5k', exp: '20+ years', langs: 'English, Hindi, Punjabi', avatar: '👨‍⚕️', active: false },
    ];

    return (
        <div>
            <CategoryFilters />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doc => (
                    <SelectDoctorCard key={doc.id} doctor={doc} />
                ))}

                {/* Support Card embedded in the grid */}
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-[28px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mb-4">
                        🎧
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Need help choosing?</h3>
                    <p className="text-sm text-gray-600 mb-6">Our health advisors can help find the best specialist for your needs.</p>
                    <button className="text-ayur-orange font-bold hover:text-orange-700 transition-colors flex items-center gap-2">
                        Chat with an advisor <span>💬</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
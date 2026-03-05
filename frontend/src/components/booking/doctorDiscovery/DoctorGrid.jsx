import React from 'react';
import { DoctorCard } from './DoctorCard';

export const DoctorGrid = () => {
    // Data matching the PDF specifications
    const doctors = [
        { id: 1, name: 'Dr. Ananya Sharma', qualifications: 'MD Ayurveda', exp: '12 Years Experience', langs: 'English, Hindi, Sanskrit', fee: '₹800', rating: '5.0' },
        { id: 2, name: 'Dr. Rajesh Varma', qualifications: 'BAMS Panchakarma', exp: '15 Years Experience', langs: 'Hindi, Malayalam, English', fee: '₹1,200', rating: '4.8' },
        { id: 3, name: 'Dr. Meera Iyer', qualifications: 'Ayurvedic Specialist', exp: '8 Years Experience', langs: 'Tamil, English, Hindi', fee: '₹600', rating: '4.9' },
        { id: 4, name: 'Dr. Vikram Singhania', qualifications: 'BAMS Shalya Tantra', exp: '20 Years Experience', langs: 'Hindi, English, Punjabi', fee: '₹1,500', rating: '4.7' },
        { id: 5, name: 'Dr. Kavita Joshi', qualifications: 'BAMS Prasuti Tantra Spec.', exp: '5 Years Experience', langs: 'Hindi, Marathi, English', fee: '₹500', rating: '4.6' },
        { id: 6, name: 'Dr. Somnath Gupta', qualifications: 'MD Ayurveda & Naturopathy', exp: '25 Years Experience', langs: 'English, Hindi, Bengali', fee: '₹2,000', rating: '4.9' },
    ];

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
                {doctors.map((doc) => (
                    <DoctorCard key={doc.id} doctor={doc} />
                ))}
            </div>

            <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                Load More Specialists
            </button>
        </div>
    );
};
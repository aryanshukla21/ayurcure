import React, { useEffect, useState } from 'react';
import { searchDoctors } from '../../api/doctorApi';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const ExpertPractitioners = () => {
    const [practitioners, setPractitioners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // calls apiClient.get('/doctors') as defined in backend doctorRoutes
                const data = await searchDoctors();
                setPractitioners(data);
            } catch (error) {
                console.error("Failed to load practitioners", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <section id="expert-practitioners" className="bg-[#F1F8F6] w-full px-6 md:px-12 lg:px-24 py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-6">Expert Practitioners</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
                    Connect with our verified and highly experienced Ayurvedic doctors.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-ayur-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : practitioners.length > 0 ? (
                    practitioners.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                            <div className="w-24 h-24 bg-ayur-beige rounded-full mx-auto mb-6 p-1">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${doc.full_name.replace(' ', '+')}&background=F1F8F6&color=2D5A27&size=150`}
                                    alt={doc.full_name}
                                    className="w-full h-full rounded-full"
                                />
                            </div>
                            <h3 className="text-2xl font-sans font-bold text-center text-gray-900 mb-2">{doc.full_name}</h3>
                            <p className="text-ayur-orange text-center text-sm font-bold uppercase tracking-wider mb-6 font-sans">
                                {doc.specialization}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-8 bg-ayur-beige p-4 rounded-xl font-sans">
                                <span className="font-medium">💼 {doc.experience_years} Yrs Exp.</span>
                                <span className="font-bold text-ayur-green">₹{doc.consultation_fee} / visit</span>
                            </div>
                            <Link to="/book">
                                <Button variant="primary" className="w-full py-3">Book Session</Button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-16 bg-white rounded-3xl shadow-sm">
                        <span className="text-4xl block mb-4">🩺</span>
                        <p className="font-medium text-lg font-sans">No verified practitioners found.</p>
                        <p className="text-sm mt-2 font-sans">Start your backend server on port 5000 to fetch live data.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
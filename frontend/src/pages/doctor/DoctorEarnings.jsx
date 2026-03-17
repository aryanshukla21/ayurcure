import React, { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';

import EarningsHeader from '../../components/doctor/earnings/EarningsHeader';
import EarningsSummary from '../../components/doctor/earnings/EarningsSummary';
import EarningsHistoryTable from '../../components/doctor/earnings/EarningsHistoryTable';

// DYNAMIC GENERATOR: Creates 25 records with explicit Date and Time fields, NO Status.
const generateStaticEarningsData = () => {
    const names = ['Sarah Chen', 'Rohan Sharma', 'Anjali Patel', 'Meera Kapoor', 'Arjun Singh', 'Vikram Malhotra'];
    const times = ['09:30 AM', '10:15 AM', '11:00 AM', '01:30 PM', '03:45 PM', '05:00 PM'];

    const history = Array.from({ length: 25 }, (_, i) => {
        const dateObj = new Date(Date.now() - (i * 86400000)); // Subtract days sequentially
        return {
            id: `TRX-900${25 - i}`,
            date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: times[i % times.length], // Dynamic Time
            patient: names[i % names.length],
            type: i % 3 === 0 ? 'Physical' : 'Video',
            amount: i % 3 === 0 ? 250 : 150
            // No Status field anymore!
        };
    });

    return {
        stats: {
            totalEarnings: 12450,
            monthlyEarnings: 4200
        },
        history: history
    };
};

const DoctorEarnings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [earningsData, setEarningsData] = useState({
        stats: { totalEarnings: 0, monthlyEarnings: 0 },
        history: []
    });

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                // Fetch from your backend via the API folder
                const res = await doctorApi.getPayoutDashboard();

                // Safety check to parse valid data from backend
                if (res && res.stats) {
                    setEarningsData({
                        stats: {
                            totalEarnings: res.stats.totalEarnings || res.stats.totalEarned || 0,
                            monthlyEarnings: res.stats.monthlyEarnings || 0
                        },
                        history: res.history || []
                    });
                } else {
                    setEarningsData(generateStaticEarningsData());
                }
            } catch (error) {
                // Inject static data when user is not logged in / backend returns 403 Forbidden
                console.warn("API fetch failed. Loading dynamic fallback data.");
                setEarningsData(generateStaticEarningsData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchEarnings();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
            <EarningsHeader />
            <EarningsSummary stats={earningsData.stats} />
            <EarningsHistoryTable history={earningsData.history} />
        </div>
    );
};

export default DoctorEarnings;
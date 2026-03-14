import React, { useState, useEffect } from 'react';
import { Search, Bell, DollarSign, ArrowUpRight, TrendingUp, Download, Filter, MoreHorizontal, Star } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/doctor/StatCard';
import { doctorApi } from '../../api/doctorApi';

const DoctorPayouts = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await doctorApi.getPayoutDashboard();
                setData(res);
            } catch (error) {
                console.error("Failed to fetch payout data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return (
            <div className="flex h-screen items-center justify-center font-sans text-[16px] text-[#4A7C59]">
                Loading financial records...
            </div>
        );
    }

    const { stats, transactions, chartData } = data;

    // Scaling logic for the dynamic chart
    const maxRevenue = chartData.length > 0
        ? Math.max(...chartData.map(d => parseFloat(d.revenue)), 1)
        : 1;

    return (
        <div className="flex h-screen bg-[#FAF8F5] font-sans text-gray-800">
            <Sidebar activePath="payouts" />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-[72px] px-8 flex items-center justify-between bg-[#FAF8F5] border-b border-gray-200 shrink-0">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full w-96 shadow-sm border border-gray-100">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search transactions..." className="ml-2 outline-none bg-transparent w-full font-sans text-[14px]" />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right mr-4 border-r pr-4 border-gray-200">
                            {/* DYNAMIC DOCTOR NAME */}
                            <p className="text-[14px] font-semibold">{stats.doctorName}</p>
                            <p className="text-[12px] text-gray-400">Clinical Accounts</p>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700 relative"><Bell size={20} /></button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="font-serif text-[36px] font-normal">Payouts</h2>
                            <p className="text-[16px] text-gray-600 mt-1">Review your earnings and track history with precision.</p>
                        </div>
                        <button className="btn-primary py-2.5 px-6 shadow-md bg-[#6D597A] hover:bg-[#5b4a66]">
                            Request Payout
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <StatCard icon={<DollarSign className="text-blue-500" />} label="Available Balance" value={`$${stats.availableBalance.toLocaleString()}`} badge="Settlement Ready" badgeColor="bg-green-50 text-green-600" />
                        <StatCard icon={<TrendingUp className="text-orange-500" />} label="Total Earned (MTD)" value={`$${stats.totalEarned.toLocaleString()}`} />

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                            <p className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.5px] z-10">Next Payout Date</p>
                            {/* DYNAMIC PAYOUT DATE */}
                            <h3 className="text-[24px] text-gray-800 z-10 font-sans">{stats.nextPayoutDate}</h3>
                            <p className="text-[14px] text-gray-500 z-10">Automatic settlement enabled.</p>
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FAF8F5] rounded-full opacity-50"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-8">
                        {/* DYNAMIC CHART */}
                        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-[20px] font-semibold">Earnings Overview</h4>
                                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-400 uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#4A7C59]"></span> Revenue
                                </div>
                            </div>
                            <div className="flex items-end justify-between h-[200px] px-4 gap-4">
                                {chartData.map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                        <div className="w-10 bg-[#4A7C59]/10 rounded-t-md relative h-[180px] flex items-end overflow-hidden">
                                            <div
                                                className="w-full bg-[#4A7C59] transition-all duration-700 ease-out group-hover:bg-[#3d6649]"
                                                style={{ height: `${(parseFloat(item.revenue) / maxRevenue) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[12px] font-semibold text-gray-400 uppercase">{item.month_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DYNAMIC GROWTH & SATISFACTION */}
                        <div className="bg-[#4A7C59] p-8 rounded-xl text-white shadow-sm flex flex-col justify-between">
                            <div>
                                <h4 className="text-white text-[20px] mb-2 font-semibold">Growth Milestone</h4>
                                <p className="text-[14px] text-green-50 leading-[1.6]">You've reached your performance targets this month. Keep up the excellent patient care!</p>
                            </div>
                            <div className="mt-8">
                                <p className="text-[12px] font-bold uppercase tracking-[1px] text-green-200 mb-2">Patient Satisfaction</p>
                                <div className="flex items-end gap-3">
                                    <span className="text-[40px] font-serif leading-none">{stats.averageRating.toFixed(1)}</span>
                                    <div className="flex text-yellow-400 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < Math.floor(stats.averageRating) ? "currentColor" : "none"}
                                                stroke="currentColor"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3>Recent Transactions</h3>
                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left">
                                <thead className="bg-[#FAF8F5] text-[14px] font-semibold text-gray-400 uppercase tracking-[0.5px]">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">Date</th>
                                        <th className="p-4">Patient</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-center rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t) => (
                                        <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors h-[72px]">
                                            <td className="p-4 text-[14px] text-gray-600 font-medium">{new Date(t.date).toLocaleDateString()}</td>
                                            <td className="p-4 font-semibold text-gray-800">{t.patient_name}</td>
                                            <td className="p-4 uppercase text-[12px] font-bold text-gray-400">{t.service_type}</td>
                                            <td className="p-4 font-bold text-gray-800">${parseFloat(t.amount).toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${t.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center text-gray-400"><button className="hover:text-gray-600"><MoreHorizontal size={18} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorPayouts;
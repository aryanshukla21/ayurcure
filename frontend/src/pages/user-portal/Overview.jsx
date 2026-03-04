// src/pages/user-portal/Overview.jsx (UI Mock)
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';

export const Overview = () => {
  return (
    <DashboardLayout activeTab="Overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Stress Level" value="Low" trend="10%" colorClass="text-green-500" />
          <StatCard label="Sleep Quality" value="7.5h" trend="5%" colorClass="text-blue-500" />
          <StatCard label="Water Intake" value="2.2L" trend="+0.5L" colorClass="text-cyan-500" />
        </div>

        {/* Daily Dinacharya (Sidebar widget) */}
        <div className="bg-ayur-green rounded-3xl p-6 text-white shadow-xl">
          <h3 className="text-xl font-bold mb-6">Daily Dinacharya</h3>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border-2 border-white/50 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold">Morning Abhyanga</p>
                <p className="text-sm text-white/70">7:00 AM - 7:30 AM</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border-2 border-white/50 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold">Herbal Infusion</p>
                <p className="text-sm text-white/70">11:00 AM</p>
              </div>
            </li>
          </ul>
          <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold border border-white/20 transition-colors">
            View Full Routine
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
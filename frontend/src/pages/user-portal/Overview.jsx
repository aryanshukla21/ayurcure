import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { Button } from '../../components/common/Button';

export const Overview = () => {
  return (
    <DashboardLayout activeTab="Overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Upcoming Appointment */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Appointment</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-ayur-green-light rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl">👩‍⚕️</div>
                <div>
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">CONFIRMED Video Consultation</span>
                  <h4 className="font-bold text-gray-800 text-lg">Dr. Ananya Sharma</h4>
                  <p className="text-gray-500 text-sm">Ayurvedic Specialist</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-end">
                  <p className="font-bold text-gray-800">Tomorrow, Oct 24</p>
                  <p className="text-gray-500 text-sm">10:00 AM - 10:45 AM</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" className="w-full md:w-auto text-sm py-2 px-4 whitespace-nowrap">Reschedule</Button>
                  <Button variant="primary" className="w-full md:w-auto text-sm py-2 px-4 bg-ayur-green hover:bg-ayur-green-dark whitespace-nowrap">Join Session</Button>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Health Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Health Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Stress Level" value="Low" trend="↓ 10%" colorClass="text-green-500" />
              <StatCard label="Sleep Quality" value="7.5h" trend="↑ 5%" colorClass="text-blue-500" />
              <StatCard label="Water Intake" value="2.2L" trend="+0.5L" colorClass="text-cyan-500" />
            </div>
          </div>



          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
              <button className="text-sm font-bold text-ayur-orange hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-lg flex-shrink-0">📝</div>
                <div>
                  <p className="font-bold text-gray-800">New Prescription Added</p>
                  <p className="text-sm text-gray-500">Dr. Sharma added Brahmi Vati to your regimen.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-ayur-orange flex items-center justify-center text-lg flex-shrink-0">📦</div>
                <div>
                  <p className="font-bold text-gray-800">Order Shipped</p>
                  <p className="text-sm text-gray-500">Your Monthly Herbal Kit has been dispatched.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-lg flex-shrink-0">🧘</div>
                <div>
                  <p className="font-bold text-gray-800">Meditation Completed</p>
                  <p className="text-sm text-gray-500">You completed 20 minutes of morning meditation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-8">

          {/* Daily Dinacharya */}
          <div className="bg-ayur-green rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-10 text-9xl -mt-4 -mr-4 pointer-events-none">🌿</div>

            <h3 className="text-xl font-bold mb-6 relative z-10">Daily Dinacharya</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full border-2 border-white/50 flex-shrink-0 mt-1 flex items-center justify-center text-xs">✓</div>
                <div>
                  <p className="font-bold">Morning Abhyanga</p>
                  <p className="text-sm text-white/70">6:00 AM - 7:00 AM</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full border-2 border-white flex-shrink-0 mt-1 relative">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold">Herbal Infusion</p>
                  <p className="text-sm text-white/70">10:00 AM</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full border-2 border-white/50 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold">Evening Meditation</p>
                  <p className="text-sm text-white/70">8:00 PM</p>
                </div>
              </li>
            </ul>
            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold border border-white/20 transition-colors relative z-10">
              View Full Routine
            </button>
          </div>

          {/* Current Regimen */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Current Regimen</h3>
              <button className="text-sm font-bold text-ayur-orange hover:underline">Order Refills</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl">🌿</div>
                  <div>
                    <p className="font-bold text-gray-800">Ashwagandha Churna</p>
                    <p className="text-xs text-gray-500">1 tsp with warm water</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl">💊</div>
                  <div>
                    <p className="font-bold text-gray-800">Triphala Tablets</p>
                    <p className="text-xs text-gray-500">2 tablets before bed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wellness Tip */}
          <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
            <div className="flex items-center gap-2 mb-3 text-ayur-orange">
              <span className="text-xl">💡</span>
              <h3 className="font-bold">Wellness Tip of the Day</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Sip warm water throughout the day to support your Agni (digestive fire) and help flush out toxins from the body.
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
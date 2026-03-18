import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, ShoppingCart, ChevronLeft } from 'lucide-react';
import PatientSidebar from './PatientSidebar';

const PatientLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to get the current page title for the header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Patient Dashboard';
    if (path.includes('appointments')) return 'Appointments';
    if (path.includes('prescriptions')) return 'Prescriptions';
    if (path.includes('health-records')) return 'Health Records';
    if (path.includes('pharmacy-orders')) return 'Pharmacy Orders';
    if (path.includes('pharmacy-store')) return 'Pharmacy Store';
    if (path.includes('profile')) return 'Patient Profile';
    if (path.includes('settings')) return 'Settings';
    return 'Patient Portal';
  };

  // Helper to dynamically set the search placeholder
  const getSearchPlaceholder = () => {
    if (location.pathname.includes('pharmacy-store')) {
      return 'Search medicines, supplements, or Ayurvedic products...';
    }
    return 'Search medical history, doctors...';
  };

  // Check if we are on a specific product detail page
  const isProductDetailsPage = location.pathname.includes('/pharmacy-store/') && location.pathname !== '/patient/pharmacy-store';

  return (
    <div className="flex h-screen bg-[#FDF9EE] font-sans">

      {/* Sidebar Component */}
      <PatientSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between border-b border-gray-200 shrink-0 shadow-sm z-10">

          {/* Search Bar / Back Button */}
          <div className="relative w-[480px]">
            {isProductDetailsPage ? (
              <button
                onClick={() => navigate('/patient/pharmacy-store')}
                className="text-gray-500 hover:text-[#2D5A27] flex items-center gap-2 font-medium transition-colors py-3"
              >
                <ChevronLeft size={20} />
                Back to Pharmacy Store
              </button>
            ) : (
              <>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={getSearchPlaceholder()}
                  className="w-full pl-12 pr-4 py-3 bg-[#F3F0E9] border-none rounded-full text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/20 transition-all"
                />
              </>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-gray-900">{getPageTitle()}</span>

            {/* Notification and Cart Icons */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-[#4A7C59] transition-colors relative">
                <ShoppingCart size={20} />
                {/* Static cart badge for UI consistency, no functionality yet */}
                <span className="absolute -top-2 -right-2 bg-[#4A7C59] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">2</span>
              </button>
            </div>

            <img
              src="/api/placeholder/36/36"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-200 shadow-sm object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PatientLayout;
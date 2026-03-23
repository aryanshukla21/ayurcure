import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col">
      
      {/* 1. Public Navigation Bar */}
      <nav className="flex items-center justify-between py-6 px-8 md:px-16 max-w-7xl mx-auto w-full gap-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#3A6447] tracking-tight shrink-0">
          <Leaf size={28} /> AyurCare360
        </Link>
        
        <div className="hidden md:block relative w-full max-w-2xl mx-4">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search wellness topics, doctors, or products..." 
            className="w-full bg-white border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-6 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm transition-all"
          />
        </div>

        <Link 
          to="/login" 
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm shrink-0"
        >
        Login / SignUp
        </Link>
      </nav>

      {/* 2. Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-8 md:px-16 py-16 lg:py-24 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-lg font-medium text-gray-600 leading-relaxed mb-12 border-l-4 border-[#3A6447] pl-6">
          Your privacy is the cornerstone of our care. This policy outlines how AyurCare360 handles your data with the same integrity we apply to our traditional wellness practices.
        </p>

        <div className="space-y-12 mb-16">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              We collect information necessary to personalize your Ayurvedic journey. This includes personal identifiers such as your name, contact details, and health preferences provided during consultation sign-ups. Technical data, such as IP addresses and device types, is automatically collected to ensure a seamless digital experience across our platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Usage</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              The information we gather is used exclusively to improve our services, process your requests, and deliver tailored wellness recommendations. We do not sell your personal data to third parties. Every data point is treated as a clinical insight meant to refine your specific care path within the AyurCare360 ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              Protecting your information is our priority. We implement industry-standard administrative, technical, and physical security measures to safeguard your data against unauthorized access, disclosure, or destruction. Our servers utilize advanced encryption protocols for all sensitive health-related communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Rights</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              You maintain full control over your personal information. You have the right to access, rectify, or request the deletion of your data at any time. If you wish to withdraw consent for data processing, you can do so through your account settings or by contacting our support desk directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              AyurCare360 uses cookies to enhance site navigation and analyze website usage. These small text files help us remember your preferences and provide a more personalized browsing experience. You can manage your cookie preferences through your browser settings, though some site features may be limited if cookies are disabled.
            </p>
          </section>
        </div>
      </main>

      {/* 3. Footer Area */}
      <footer className="border-t border-[#EFEBE1] bg-white py-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-[#3A6447] tracking-tight">
            <Leaf size={28} /> AyurCare360
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <Link to="/about" className="hover:text-[#3A6447] transition-colors">About</Link>
            <Link to="/help" className="hover:text-[#3A6447] transition-colors">Help Desk</Link>
            <Link to="/blogs" className="hover:text-[#3A6447] transition-colors">Blogs</Link>
            <Link to="/contact" className="hover:text-[#3A6447] transition-colors">Contact Us</Link>
            <Link to="/privacy" className="hover:text-[#3A6447] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#3A6447] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PrivacyPolicyPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search } from 'lucide-react';

const TermsConditionsPage = () => {
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Terms & Conditions</h1>
        <p className="text-lg font-medium text-gray-600 leading-relaxed mb-12 border-l-4 border-[#3A6447] pl-6">
          Welcome to AyurCare360. Please read these terms carefully before using our modern apothecary platform and consultation services.
        </p>

        <div className="space-y-12 mb-16">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              By accessing and using AyurCare360, you agree to be bound by these terms and conditions. Our platform provides Ayurvedic consultations, herbal remedies, and wellness content designed to harmonize the body and mind through ancient wisdom and modern scientific approaches.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <ul className="text-sm font-medium text-gray-600 leading-relaxed space-y-2 list-disc pl-5">
              <li>Provide accurate and truthful information regarding your health during consultations.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Use the platform only for lawful purposes.</li>
              <li>Refrain from any activity that interferes with or disrupts the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Disclaimer</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              The content and services provided by AyurCare360 are for informational purposes and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition. Ayurveda is intended to support general wellness and balance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              All prices for consultations and remedies are listed in the currency applicable in your region. Payment is required at the time of booking or purchase. We use secure third-party payment processors to ensure your financial data is protected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
              Consultations can be rescheduled or cancelled up to 24 hours before the scheduled appointment time for a full refund. Cancellations within 24 hours may incur a fee. Remedy orders can only be cancelled before they have been shipped.
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

export default TermsConditionsPage;
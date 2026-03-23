import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search, ChevronDown, Calendar, CreditCard, Stethoscope } from 'lucide-react';

// Reusable Accordion Item Component
const FAQItem = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#EFEBE1] py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{question}</span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pt-4 text-sm font-medium text-gray-600 leading-relaxed animate-in slide-in-from-top-2">
          This is a placeholder answer. In a production environment, this would contain the specific helpful response detailing exactly how the user can resolve their query regarding this specific topic.
        </div>
      )}
    </div>
  );
};

const HelpDeskPage = () => {
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
            placeholder="Search for help..." 
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
      <main className="flex-1 max-w-3xl mx-auto px-8 py-16 lg:py-24 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Help Desk</h1>
          <p className="text-lg font-medium text-gray-500">Find answers to common questions and get support.</p>
        </div>

        <div className="space-y-12 mb-16">
          {/* Section: Appointments */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-[#3A6447]" size={20} />
              <h2 className="text-xl font-bold text-gray-900">Appointments</h2>
            </div>
            <div className="bg-white rounded-3xl p-6 px-8 border border-[#EFEBE1] shadow-sm">
              <FAQItem question="How do I book a consultation?" />
              <FAQItem question="Can I reschedule my appointment?" />
            </div>
          </div>

          {/* Section: Payments */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#D9774B]" size={20} />
              <h2 className="text-xl font-bold text-gray-900">Payments</h2>
            </div>
            <div className="bg-white rounded-3xl p-6 px-8 border border-[#EFEBE1] shadow-sm">
              <FAQItem question="What payment methods are accepted?" />
              <FAQItem question="How can I download my invoice?" />
            </div>
          </div>

          {/* Section: Consultations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="text-[#9333EA]" size={20} />
              <h2 className="text-xl font-bold text-gray-900">Consultations</h2>
            </div>
            <div className="bg-white rounded-3xl p-6 px-8 border border-[#EFEBE1] shadow-sm">
              <FAQItem question="How do online consultations work?" />
              <FAQItem question="Are the consultations private?" />
            </div>
          </div>
        </div>

        {/* Still Need Help Box */}
        <div className="mt-16 bg-white rounded-3xl p-10 text-center border border-[#EFEBE1] shadow-sm max-w-md mx-auto mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Still need help?</h3>
          <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
            Our support team is available 24/7 to assist you with any further inquiries.
          </p>
          <Link to="/contact" className="inline-block bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-sm">
            Contact Support
          </Link>
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

export default HelpDeskPage;
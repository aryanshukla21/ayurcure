import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight, Leaf, Search } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col">
      
      {/* 1. Public Navigation Bar */}
      <nav className="flex items-center justify-between py-6 px-8 md:px-16 max-w-7xl mx-auto w-full gap-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#3A6447] tracking-tight shrink-0">
          <Leaf size={28} /> AyurCare360
        </Link>
        
        {/* Centered Search Bar */}
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

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-8 md:px-16 py-12 lg:py-20 w-full">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Contact Us
          </h1>
          <p className="text-lg font-medium text-gray-600 leading-relaxed max-w-2xl">
            We're here to support your healing journey. Reach out to our Ayurvedic practitioners and support team.
          </p>
        </div>

        {/* 2/3 and 1/3 Split Layout for Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Left Column (Takes up 3/5 width): Contact Form */}
          <div className="lg:col-span-3">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name & Email in one row on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-white border border-[#EFEBE1] rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white border border-[#EFEBE1] rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows="6"
                  className="w-full bg-white border border-[#EFEBE1] rounded-2xl px-5 py-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-2 bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm w-full md:w-auto self-start"
              >
                Send Message <ChevronRight size={18} strokeWidth={3} />
              </button>
            </form>
          </div>

          {/* Right Column (Takes up 2/5 width): Contact Information */}
          <div className="lg:col-span-2 flex flex-col gap-10 lg:pl-8 lg:border-l border-[#EFEBE1]">
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EFEBE1] shadow-sm flex items-center justify-center text-[#3A6447] shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Emails</p>
                <p className="text-lg font-extrabold text-gray-900">wellness@ayurcare360.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EFEBE1] shadow-sm flex items-center justify-center text-[#D9774B] shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Call Us</p>
                <p className="text-lg font-extrabold text-gray-900">+1 (555) 012-3456</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EFEBE1] shadow-sm flex items-center justify-center text-[#9333EA] shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Our Center</p>
                <p className="text-lg font-extrabold text-gray-900 leading-relaxed">
                  108 Serenity Lane,<br/>Wellness Valley, CA 90210
                </p>
              </div>
            </div>

            {/* Inspirational Quote Box */}
            <div className="mt-6 bg-[#3A6447] rounded-[32px] p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <p className="text-[17px] font-medium text-white italic relative z-10 leading-relaxed">
                "Health is the greatest gift, contentment the greatest wealth"
              </p>
            </div>

          </div>
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

export default ContactPage;
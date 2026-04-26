import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending OTP to:", phone);
    // navigate('/verify'); 
  };

  return (
    <div className="bg-[#FAF7F2] text-gray-900 min-h-screen flex flex-col font-sans">
      <header className="flex flex-col items-center justify-center w-full pt-12 pb-4">
        <div className="flex flex-col items-center gap-3">
          <span className="text-2xl font-extrabold text-[#3A6447] tracking-tight">AyurCare360</span>
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-[#EFEBE1]">
            <img alt="AyurCare360 Logo" className="w-full h-full object-cover p-2 rounded-full" src="/Favicon_up.png" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#EFEBE1]">

          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-1.5">
              <div className="h-1.5 w-6 rounded-full bg-[#3A6447]"></div>
              <div className="h-1.5 w-6 rounded-full bg-[#EFEBE1]"></div>
              <div className="h-1.5 w-6 rounded-full bg-[#EFEBE1]"></div>
              <div className="h-1.5 w-6 rounded-full bg-[#EFEBE1]"></div>
            </div>
            <span className="text-[10px] font-bold text-[#3A6447] tracking-widest uppercase">Step 1 of 4</span>
          </div>

          <div className="space-y-2 mb-10 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Start your journey</h1>
            <p className="text-gray-500 font-medium text-sm">Enter your mobile number to continue</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1" htmlFor="phone">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  className="block w-full h-12 pl-12 pr-4 bg-white border border-[#EFEBE1] focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                  id="phone"
                  name="phone"
                  placeholder="+91 00000-00000"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              className="w-full py-4 bg-[#3A6447] text-white font-bold text-sm rounded-full shadow-sm hover:bg-[#2C4D36] transition-colors"
              type="submit"
            >
              Send OTP
            </button>
          </form>

          <div className="mt-12 flex items-center justify-center space-x-4">
            <div className="h-[1px] w-8 bg-[#EFEBE1]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nature's Wisdom</span>
            <div className="h-[1px] w-8 bg-[#EFEBE1]"></div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center items-center space-x-2 w-full py-6 px-4 bg-transparent mt-auto">
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">© {new Date().getFullYear()} AyurCare360</span>
        <span className="text-gray-300">|</span>
        <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/privacy">Privacy Policy</Link>
        <span className="text-gray-300">|</span>
        <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/terms">Terms & Conditions</Link>
      </footer>
    </div>
  );
};

export default SignInPage;
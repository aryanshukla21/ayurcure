import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    console.log("Sending recovery OTP to:", mobile);
    // navigate('/auth/verify-reset-otp');
  };

  return (
    <div className="bg-[#FAF7F2] text-gray-900 font-sans min-h-screen flex flex-col items-center">

      <header className="w-full pt-16 flex flex-col items-center gap-3">
        <h1 className="font-extrabold text-2xl tracking-tight text-[#3A6447]">AyurCare360</h1>
        <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#EFEBE1] shadow-sm flex items-center justify-center">
          <img alt="AyurCare360 Brand Logo" className="w-full h-full object-cover p-2" src="/Favicon_up.png" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 w-full max-w-md">
        <div className="bg-white rounded-[32px] p-8 md:p-12 w-full shadow-sm border border-[#EFEBE1]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Forgot password?</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Enter your registered mobile number to receive a verification code.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSendOTP}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="mobile">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  className="w-full h-12 pl-12 pr-4 bg-white border border-[#EFEBE1] rounded-xl focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                  id="mobile"
                  name="mobile"
                  placeholder="+91 00000 00000"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="w-full py-4 bg-[#3A6447] hover:bg-[#2C4D36] transition-colors text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-sm"
              type="submit"
            >
              <span>Send OTP</span>
              <ArrowRight size={18} />
            </button>

            <div className="pt-4 text-center">
              <Link className="text-[#3A6447] text-sm font-bold hover:underline transition-all" to="/login">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="w-full py-8 bg-transparent flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-6">
          <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/privacy">
            Privacy Policy
          </Link>
          <div className="w-1 h-1 rounded-full bg-[#EFEBE1]"></div>
          <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/terms">
            Terms & Conditions
          </Link>
        </div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
          © {new Date().getFullYear()} AyurCare360.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
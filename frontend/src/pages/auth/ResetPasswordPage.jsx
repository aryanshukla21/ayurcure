import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log('Resetting password with OTP:', otp.join(''));
    // navigate('/login');
  };

  return (
    <div className="bg-[#FAF7F2] text-gray-900 font-sans min-h-screen flex flex-col">

      <header className="sticky top-0 z-50 bg-[#FAF7F2] w-full px-6 py-8 flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#3A6447]">AyurCare360</h1>
        <div className="w-16 h-16 rounded-full bg-white border border-[#EFEBE1] flex items-center justify-center shadow-sm">
          <img className="w-full h-full object-cover p-2 rounded-full" alt="AyurCare360 Logo" src="/Favicon_up.png" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 pb-20">
        <section className="w-full max-w-md">
          <div className="bg-white rounded-[32px] border border-[#EFEBE1] shadow-sm p-8 md:p-12 transition-all duration-300">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Reset password</h2>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Enter the 6-digit code sent to your phone and create a new password.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleReset}>
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Verification Code</label>
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-[#EFEBE1] bg-white focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none"
                      value={data}
                      onChange={e => handleOtpChange(e.target, index)}
                      onFocus={e => e.target.select()}
                      placeholder="·"
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <span className="text-[10px] font-bold text-[#3A6447] bg-[#FAF7F2] px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors uppercase tracking-widest">
                    Resend OTP in 0:30
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-12 rounded-xl border border-[#EFEBE1] bg-white focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 text-sm font-medium text-gray-900 transition-all outline-none"
                      placeholder="••••••••"
                      type={showNewPassword ? "text" : "password"}
                      required
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3A6447] transition-colors"
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      className="w-full h-12 pl-4 pr-12 rounded-xl border border-[#EFEBE1] bg-white focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 text-sm font-medium text-gray-900 transition-all outline-none"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3A6447] transition-colors"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="w-full py-4 bg-[#3A6447] text-white font-bold rounded-full shadow-sm hover:bg-[#2C4D36] transition-colors"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-[#EFEBE1] text-center">
              <Link className="text-sm font-bold text-gray-500 hover:text-[#3A6447] transition-colors inline-flex items-center gap-2" to="/login">
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 bg-[#FAF7F2] flex flex-col items-center justify-center gap-4">
        <div className="flex gap-6">
          <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/privacy">Privacy Policy</Link>
          <span className="text-gray-300">•</span>
          <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/terms">Terms & Conditions</Link>
        </div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
          © {new Date().getFullYear()} AyurCare360.
        </p>
      </footer>
    </div>
  );
};

export default ResetPasswordPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    // Add password reset logic here
    alert("If an account exists, a reset link will be sent.");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>


      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full py-12">

        {/* Header Logo Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm">
            <Leaf size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-extrabold text-[#8C8276] uppercase tracking-[0.2em]">
            AyurCare360
          </span>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">

          <h1 className="text-3xl font-bold text-[#6A5A4A] tracking-tight mb-3">
            Forgot Password?
          </h1>
          <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full bg-[#F8F6F0] rounded-xl pl-4 pr-12 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1]"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#52735B] hover:bg-[#425E4A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 group mt-2"
            >
              Send Reset Link
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#5B4F80] hover:text-[#433A5E] transition-colors">
              <ArrowLeft size={16} /> Back to login
            </Link>
          </div>
        </div>

        {/* Support Pill */}
        <div className="mt-8 bg-[#F8F6F0] border border-[#EFEBE1] rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm">
          <HelpCircle size={14} className="text-[#52735B] fill-[#52735B] text-white" />
          <span className="text-xs font-medium text-gray-500">
            Need urgent help?{' '}
            <Link to="/contact" className="text-[#5B4F80] font-bold hover:underline">
              Contact Support
            </Link>
          </span>
        </div>

      </main>
    </div>
  );
};

export default ForgotPasswordPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log('Updating password...');
    // Simulate successful password reset and redirect to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full py-12">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
            <RotateCcw size={22} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Reset Your Password
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Please enter a new secure password for your AyurCare360 account.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6">

            {/* New Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#F8F6F0] rounded-xl pl-4 pr-12 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1] tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="h-1 flex-1 rounded-full bg-[#52735B]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#52735B]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#52735B]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#EFEBE1]"></div>
                </div>
                <div className="flex items-center gap-1.5 text-[#52735B]">
                  <CheckCircle2 size={12} strokeWidth={3} />
                  <span className="text-xs font-bold">Strong password</span>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#F8F6F0] rounded-xl pl-4 pr-12 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1] tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Security Requirements Box */}
            <div className="bg-[#F8F6F0] rounded-xl p-5 border-l-4 border-[#8C8276] mt-2">
              <h4 className="text-[10px] font-extrabold text-[#6A5A4A] uppercase tracking-widest mb-3">
                Security Requirements
              </h4>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Minimum 12 characters
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  At least one special character (!@#)
                </li>
                <li className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Avoid common words or patterns
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#52735B] hover:bg-[#425E4A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 group mt-2"
            >
              Update Password
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center flex flex-col gap-4">
          <Link to="/login" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#5B4F80] hover:text-[#433A5E] transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </Link>

          <p className="text-xs font-medium text-gray-500">
            Having trouble? Contact our{' '}
            <Link to="/contact" className="text-[#5B4F80] font-bold hover:underline">
              Support Team
            </Link>
          </p>
        </div>

      </main>
    </div>
  );
};

export default ResetPasswordPage;
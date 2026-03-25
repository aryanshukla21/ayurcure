import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    credentials: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing in...', formData);
    // Simulate login and redirect to patient dashboard by default
    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">

      {/* Decorative Background Elements (Faint radial gradients) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full mt-10 md:mt-0">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
            <Leaf size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            AyurCare360
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Welcome back to your clinical space.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">
          <form onSubmit={handleSignIn} className="flex flex-col gap-6">

            {/* Email / Phone Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Email or Phone Number
              </label>
              <input
                type="text"
                name="credentials"
                value={formData.credentials}
                onChange={handleInputChange}
                placeholder="Enter your credentials"
                className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-[#5B4F80] hover:text-[#433A5E] transition-colors">
                  Forgot Password?
                </Link>
              </div>
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
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-[#52735B] focus:ring-[#52735B] cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-medium text-gray-600 cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#52735B] hover:bg-[#425E4A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#5B4F80] font-bold hover:text-[#433A5E] transition-colors ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Secure Access Indicator */}
        <div className="flex items-center gap-2 mt-8 text-[#A1A1AA]">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            Secure Apothecary Access
          </span>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 mt-auto">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Leaf size={14} className="text-[#52735B]" />
          <span>© 2026 AyurCare360. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          <Link to="/help" className="hover:text-gray-900 transition-colors">Help Center</Link>
        </div>
      </footer>

    </div>
  );
};

export default SignInPage;
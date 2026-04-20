import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ShieldCheck, User, Stethoscope } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: 'patient', // Added role state, defaults to patient
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Creating account payload:', formData);
    // Simulate registration and redirect to the correct dashboard based on role
    if (formData.role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">

      {/* Decorative Background Elements (Faint radial gradients) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full py-12 md:py-0 mt-6">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
            <Leaf size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Create an Account
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Join our holistic healing community.
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">

            {/* Role Selection UI */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                I am registering as a...
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'patient' ? 'border-[#52735B] bg-[#52735B]/5 text-[#52735B]' : 'border-[#EFEBE1] bg-[#F8F6F0] text-gray-500 hover:border-[#52735B]/30'}`}>
                  <input type="radio" name="role" value="patient" checked={formData.role === 'patient'} onChange={handleInputChange} className="hidden" />
                  <User size={16} />
                  <span className="text-sm font-bold">Patient</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'doctor' ? 'border-[#52735B] bg-[#52735B]/5 text-[#52735B]' : 'border-[#EFEBE1] bg-[#F8F6F0] text-gray-500 hover:border-[#52735B]/30'}`}>
                  <input type="radio" name="role" value="doctor" checked={formData.role === 'doctor'} onChange={handleInputChange} className="hidden" />
                  <Stethoscope size={16} />
                  <span className="text-sm font-bold">Doctor</span>
                </label>
              </div>
            </div>

            {/* Full Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={formData.role === 'doctor' ? "e.g. Dr. Aditi Sharma" : "e.g. Aditi Sharma"}
                className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1]"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                Create Password
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
            </div>

            {/* Agree to Terms Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#52735B] focus:ring-[#52735B] cursor-pointer shrink-0"
                required
              />
              <label htmlFor="terms" className="text-xs font-medium text-gray-600 leading-relaxed cursor-pointer">
                I agree to AyurCare360's{' '}
                <Link to="/terms" className="text-[#52735B] hover:underline font-bold">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[#52735B] hover:underline font-bold">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#52735B] hover:bg-[#425E4A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm mt-4"
            >
              Create {formData.role === 'doctor' ? 'Doctor' : 'Patient'} Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#5B4F80] font-bold hover:text-[#433A5E] transition-colors ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Secure Access Indicator */}
        <div className="flex items-center gap-2 mt-8 text-[#A1A1AA]">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            Secure Apothecary Registration
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

export default SignUpPage;
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ShieldCheck, User, Stethoscope, Loader2 } from 'lucide-react';
import { authApi } from '../../api/authApi';

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');

  const [formData, setFormData] = useState({
    role: 'patient',
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const loginPayload = {
        email: formData.credentials.includes('@') ? formData.credentials : undefined,
        phone: !formData.credentials.includes('@') ? formData.credentials : undefined,
        password: formData.password,
        role: formData.role
      };

      const response = await authApi.login(loginPayload);

      // CRITICAL: Save role to localStorage so ProtectedRoutes and Sidebars work!
      localStorage.setItem('role', response.user.role);

      // Navigate based on verified DB role
      if (response.user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full mt-10 md:mt-0">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
            <Leaf size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">AyurCare360</h1>
          <p className="text-sm font-medium text-gray-600">Welcome back to your clinical space.</p>
        </div>

        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">

          {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 text-center">{errorMsg}</div>}
          {successMsg && <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200 text-center">{successMsg}</div>}

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Login As</label>
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

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Email or Phone Number</label>
              <input type="text" name="credentials" value={formData.credentials} onChange={handleInputChange} placeholder="Enter your credentials" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1]" required />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-[#5B4F80] hover:text-[#433A5E] transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-[#F8F6F0] rounded-xl pl-4 pr-12 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#52735B]/20 transition-all border border-transparent focus:border-[#EFEBE1] tracking-widest" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <input type="checkbox" id="remember" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="w-4 h-4 rounded border-gray-300 text-[#52735B] focus:ring-[#52735B] cursor-pointer" />
              <label htmlFor="remember" className="text-xs font-medium text-gray-600 cursor-pointer">Remember this device for 30 days</label>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#52735B] hover:bg-[#425E4A] disabled:bg-[#52735B]/60 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm mt-2 flex items-center justify-center">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Don't have an account? <Link to="/signup" className="text-[#5B4F80] font-bold hover:text-[#433A5E] transition-colors ml-1">Sign Up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
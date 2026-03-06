import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { sendSignupOtps } from '../../api/authApi';

export const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) return setError("You must accept the terms and conditions.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

    setIsLoading(true);
    try {
      // 1. Send OTPs via Backend
      await sendSignupOtps({ email: formData.email, phone: formData.phone });

      // 2. Temporarily store data until verified
      sessionStorage.setItem('tempSignupData', JSON.stringify({ ...formData, role }));

      // 3. Navigate to Dual OTP Verification
      navigate('/verify-otp');
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send verification codes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6 py-12">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-xl shadow-ayur-green/5">

        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-6 text-3xl font-bold text-ayur-green">
            <span>🌿</span> AyurCure
          </div>
          <div className="flex border-b border-gray-100 mb-6">
            <button onClick={() => navigate('/login')} className="flex-1 pb-4 text-gray-400 font-medium text-lg hover:text-gray-600 transition-colors">
              Login
            </button>
            <button className="flex-1 pb-4 border-b-2 border-ayur-green text-ayur-green font-bold text-lg">
              Sign Up
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
          <button onClick={() => setRole('patient')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'patient' ? 'bg-white shadow text-ayur-green' : 'text-gray-400'}`}>Patient</button>
          <button onClick={() => setRole('doctor')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'doctor' ? 'bg-white shadow text-ayur-green' : 'text-gray-400'}`}>Doctor</button>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">{error}</div>}

          <input type="text" name="full_name" required onChange={handleChange} placeholder="Full Name" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          <input type="email" name="email" required onChange={handleChange} placeholder="Email Address" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          <input type="tel" name="phone" required onChange={handleChange} placeholder="Phone Number (+91...)" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          <input type="password" name="password" required onChange={handleChange} placeholder="Password" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          <input type="password" name="confirmPassword" required onChange={handleChange} placeholder="Confirm Password" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />

          <div className="pt-2 pb-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-ayur-green focus:ring-ayur-green" />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to AyurCure's <span className="font-bold text-gray-800">Terms of Service</span>.
              </span>
            </label>
          </div>

          <Button type="submit" disabled={isLoading} variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-green/20">
            {isLoading ? 'Sending Verification...' : 'Create Wellness Account'}
          </Button>

          <div className="my-4 text-center text-gray-400 text-sm">or</div>

          <Button type="button" variant="outline" className="w-full py-4 text-lg rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 flex justify-center gap-2 items-center">
            <span>G</span> Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
};
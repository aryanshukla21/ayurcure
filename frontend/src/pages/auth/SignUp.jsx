import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const SignUp = () => {
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'google'
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    // Integrate Google Auth Logic here
    // On success, backend returns { requiresPasswordSetup: true }
    setAuthMethod('google');
    // Navigate to the isolated password creation step for Google users
    navigate('/auth/setup-password');
  };

  return (
    <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6 py-12">
      <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-xl shadow-ayur-green/5">

        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-8 text-3xl text-ayur-green">
            <span>🌿</span>
          </div>
          <div className="flex border-b border-gray-100 mb-8">
            <button onClick={() => navigate('/login')} className="flex-1 pb-4 text-gray-400 font-medium text-lg hover:text-gray-600 transition-colors">
              Login
            </button>
            <button className="flex-1 pb-4 border-b-2 border-ayur-green text-ayur-green font-bold text-lg">
              Sign Up
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create your Wellness Account</h2>
          <p className="text-gray-500 mt-2">Join AyurCure for a healthier you.</p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <input type="text" placeholder="Full Name" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          </div>
          <div className="relative">
            <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          </div>
          <div className="relative">
            <input type="phone-number" placeholder="Phone Number" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
          </div>

          {/* Password fields only show for standard email signups */}
          {authMethod === 'email' && (
            <>
              <div className="relative">
                <input type="password" placeholder="Password" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
              </div>
              <div className="relative">
                <input type="password" placeholder="Confirm Password" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
              </div>
            </>
          )}

          <div className="pt-2 pb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-ayur-orange focus:ring-ayur-orange" />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to AyurCure's <span className="font-bold text-gray-800 border-b border-gray-800">Terms of Service</span> & <span className="font-bold text-gray-800 border-b border-gray-800">Privacy Policy</span>.
              </span>
            </label>
          </div>

          <Button variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-orange/20">
            Create My Wellness Account
          </Button>

          <div className="my-4 text-center text-gray-400">or</div>

          <Button
            type="button"
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full py-4 text-lg rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
};
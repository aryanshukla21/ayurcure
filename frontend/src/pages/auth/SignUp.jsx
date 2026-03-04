import React from 'react';
import { Button } from '../../components/common/Button';

export const SignUp = () => {
  return (
    <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6 py-12">
      <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-xl shadow-ayur-green/5">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-8 text-3xl text-ayur-green">
            <span>🌿</span>
          </div>
          <div className="flex border-b border-gray-100 mb-8">
            <button className="flex-1 pb-4 text-gray-400 font-medium text-lg hover:text-gray-600 transition-colors">
              Login
            </button>
            <button className="flex-1 pb-4 border-b-2 border-ayur-green text-ayur-green font-bold text-lg">
              Sign Up
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create your Wellness Account</h2>
          <p className="text-gray-500 mt-2">Join AyurCure for a healthier you.</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📞</span>
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none transition-all"
            />
          </div>

          <div className="pt-2 pb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-ayur-orange focus:ring-ayur-orange" />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to AyurCure's <a href="#" className="font-bold text-gray-800 border-b border-gray-800">Terms of Service</a> & <a href="#" className="font-bold text-gray-800 border-b border-gray-800">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <Button variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-orange/20">
            Create My Wellness Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account? <a href="#" className="font-bold text-gray-900 border-b border-gray-900">Log In</a>
        </p>
      </div>
    </div>
  );
};

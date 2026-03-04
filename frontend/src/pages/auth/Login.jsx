import React from 'react';
import { Button } from '../../components/common/Button';

export const Login = () => {
  return (
    <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-xl shadow-ayur-green/5">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-8 text-3xl font-bold text-ayur-green">
            <span>🌿</span> AyurCure
          </div>
          <div className="flex border-b border-gray-100">
            <button className="flex-1 pb-4 border-b-2 border-ayur-green text-ayur-green font-bold text-lg">
              Login
            </button>
            <button className="flex-1 pb-4 text-gray-400 font-medium text-lg hover:text-gray-600 transition-colors">
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Email or Phone Number
            </label>
            <input 
              type="text" 
              placeholder="name@example.com" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green focus:border-transparent outline-none transition-all"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                👁️
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-ayur-green transition-colors border-b border-gray-300">
              Forgot Password?
            </a>
          </div>

          <Button variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-orange/20">
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-sm font-medium text-gray-400">or</span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        {/* Social Login */}
        <button className="w-full py-4 rounded-xl border-2 border-gray-100 font-bold text-gray-600 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
          <span className="text-xl">G</span> Continue with Google
        </button>

        <p className="text-center text-xs text-gray-400 mt-8 font-medium">
          HIPAA Secure | End-to-End Encrypted
        </p>
      </div>
    </div>
  );
};
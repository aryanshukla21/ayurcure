import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { loginUser } from '../../api/authApi';

export const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [identifier, setIdentifier] = useState(''); // Stores either email or phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { password, role };
      if (loginMethod === 'email') payload.email = identifier;
      if (loginMethod === 'phone') payload.phone = identifier;

      await loginUser(payload);

      // Trigger Welcome Popup flag
      sessionStorage.setItem('showWelcomePopup', 'true');

      // Route based on role
      navigate(role === 'doctor' ? '/doctor-dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please verify your credentials.');
    }
  };

  const handleGoogleAuth = () => {
    // Implement Google Auth triggering here
    console.log("Triggering Google Auth for role:", role);
  };

  return (
    <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-xl shadow-ayur-green/5">

        {/* Header Tabs */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-6 text-3xl font-bold text-ayur-green">
            <span>🌿</span> AyurCure
          </div>
          <div className="flex border-b border-gray-100">
            <button className="flex-1 pb-4 border-b-2 border-ayur-green text-ayur-green font-bold text-lg">
              Login
            </button>
            <button onClick={() => navigate('/signup')} className="flex-1 pb-4 text-gray-400 font-medium text-lg hover:text-gray-600 transition-colors">
              Sign Up
            </button>
          </div>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
          <button
            onClick={() => setRole('patient')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'patient' ? 'bg-white shadow text-ayur-green' : 'text-gray-400'}`}
          >
            Patient
          </button>
          <button
            onClick={() => setRole('doctor')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'doctor' ? 'bg-white shadow text-ayur-green' : 'text-gray-400'}`}
          >
            Doctor
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">{error}</div>}

          {/* Login Method Toggle */}
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">
              <input type="radio" checked={loginMethod === 'email'} onChange={() => setLoginMethod('email')} className="text-ayur-green focus:ring-ayur-green" /> Email
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">
              <input type="radio" checked={loginMethod === 'phone'} onChange={() => setLoginMethod('phone')} className="text-ayur-green focus:ring-ayur-green" /> Phone
            </label>
          </div>

          <div>
            <input
              type={loginMethod === 'email' ? 'email' : 'tel'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={loginMethod === 'email' ? 'name@example.com' : '+91 9876543210'}
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (••••••••)"
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="flex justify-end">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-sm font-bold text-gray-500 hover:text-ayur-green transition-colors border-b border-transparent hover:border-ayur-green">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-green/20">
            Login as {role === 'patient' ? 'Patient' : 'Doctor'}
          </Button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-sm font-medium text-gray-400">or</span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        <button onClick={handleGoogleAuth} type="button" className="w-full py-4 rounded-xl border-2 border-gray-100 font-bold text-gray-600 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
          <span className="text-xl">G</span> Continue with Google
        </button>
      </div>
    </div>
  );
};
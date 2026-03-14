import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../api/authApi';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('patient'); // Default to patient
    const [formData, setFormData] = useState({ identifier: '', password: '', rememberMe: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Determine if the identifier is an email or phone
            const isEmail = formData.identifier.includes('@');

            // 2. Shape the payload to match what authController.js expects
            const payload = {
                password: formData.password,
                role: role,
                ...(isEmail ? { email: formData.identifier } : { phone: formData.identifier })
            };

            const res = await authApi.login(payload);

            if (res.requiresOtp) {
                navigate('/verify-otp', { state: { email: formData.identifier, role: role } });
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('role', role);

                if (role === 'doctor') {
                    navigate('/doctor/dashboard');
                } else {
                    navigate('/patient/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="AyurCare360" subtitle="Welcome back to your clinical space.">

            {/* Role Selection Toggle */}
            <div className="flex bg-[#FAF8F5] p-1 rounded-lg mb-6 border border-gray-100">
                <button
                    type="button"
                    onClick={() => setRole('patient')}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${role === 'patient' ? 'bg-white shadow-sm text-[#4A7C59]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Patient
                </button>
                <button
                    type="button"
                    onClick={() => setRole('doctor')}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${role === 'doctor' ? 'bg-white shadow-sm text-[#4A7C59]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Doctor
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email or Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter your credentials"
                        className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                        value={formData.identifier}
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                        <Link to="/forgot-password" className="text-xs text-[#4A7C59] hover:underline font-medium">Forgot Password?</Link>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer mt-1">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#4A7C59] focus:ring-[#4A7C59]"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    />
                    <span className="text-sm text-gray-600">Remember this device for 30 days</span>
                </label>

                <button type="submit" disabled={loading} className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-lg py-3 mt-2 font-medium transition-colors disabled:opacity-70 h-[40px] flex items-center justify-center">
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <Link to="/register" className="text-[#4A7C59] font-semibold hover:underline">Sign Up</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
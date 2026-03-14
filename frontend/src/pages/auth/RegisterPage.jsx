import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../api/authApi';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('patient');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: role
            };

            const res = await authApi.register(payload);

            // Navigate to OTP verification after successful registration
            navigate('/verify-otp', { state: { email: formData.email } });

        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create an Account" subtitle="Join AyurCare360 to start your holistic journey.">

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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-lg py-3 mt-4 font-medium transition-colors disabled:opacity-70 h-[40px] flex items-center justify-center">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-2">
                    Already have an account? <Link to="/login" className="text-[#4A7C59] font-semibold hover:underline">Sign In</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
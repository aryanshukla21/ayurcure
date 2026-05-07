import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { authApi } from '../../api/authApi';
import { patientApi } from '../../api/patientApi';

const ProfileCompletionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Data passed from Step 1 & 2
    const { email, phone, otpValue } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!email || !phone) {
            navigate('/signup'); // Kick back to step 1 if data is missing
        }
    }, [email, phone, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const fullName = e.target.fullName.value;
        const password = e.target.password.value;
        const gender = e.target.gender.value;
        const age = e.target.age.value;
        const fullAddress = `${e.target.address.value}, ${e.target.state.value} - ${e.target.pincode.value}`;

        try {
            // 1. Create the Account & Log the user in (Backend sets Cookie)
            await authApi.verifyAndRegister({
                role: 'patient',
                full_name: fullName,
                email: email,
                phone: phone,
                password: password,
                emailOtp: otpValue, // Combined OTP verified
                phoneOtp: otpValue
            });

            // 2. Update Personal Info (Age & Gender)
            await patientApi.updateProfilePersonal({ age, gender });

            // 3. Update Contact Info (Address)
            await patientApi.updateProfileContact({ address: fullAddress });

            // Proceed to Step 4
            navigate('/symptoms');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Check your details or OTPs.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF7F2] text-gray-900 min-h-screen font-sans">
            <header className="flex flex-col items-center justify-center w-full py-8 px-4">
                <div className="text-2xl font-extrabold text-[#3A6447] tracking-tight">AyurCare360</div>
            </header>

            <main className="min-h-[calc(100vh-180px)] flex items-center justify-center px-6 py-12">
                <div className="max-w-xl w-full">
                    <div className="flex flex-col items-center mb-10">
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#3A6447]">Step 03</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center">Complete your profile</h1>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#EFEBE1]">
                        {error && <p className="text-red-500 text-xs text-center mb-4 font-bold">{error}</p>}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                    <input id="fullName" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="Aarav Sharma" type="text" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                                    <input value={email || ''} readOnly className="w-full h-12 bg-gray-50 border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-500 outline-none" type="email" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                                    <input id="password" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="••••••••" type="password" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Gender</label>
                                    <div className="relative">
                                        <select id="gender" defaultValue="" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 appearance-none focus:border-[#3A6447] outline-none" required>
                                            <option disabled value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non-binary">Non-binary</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Age</label>
                                    <input id="age" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="28" type="number" required />
                                </div>

                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Address</label>
                                    <input id="address" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="123 Wellness Lane, Green Park" type="text" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">State</label>
                                    <input id="state" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="Maharashtra" type="text" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
                                    <input id="pincode" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 focus:border-[#3A6447] outline-none" placeholder="400001" type="text" required />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button disabled={isLoading} className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold h-12 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
                                    {isLoading ? 'Creating Profile...' : 'Continue'}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileCompletionPage;
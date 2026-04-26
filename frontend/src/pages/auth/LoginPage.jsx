import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // navigate('/patient/dashboard');
    };

    return (
        <div className="bg-[#FAF7F2] text-gray-900 min-h-screen flex flex-col items-center justify-center font-sans">

            <main className="flex-grow flex items-center justify-center w-full px-6 py-12">
                <div className="max-w-md w-full flex flex-col items-center">

                    <div className="text-center mb-8 space-y-4">
                        <h1 className="text-2xl font-extrabold text-[#3A6447] tracking-tight">AyurCare360</h1>
                        <div className="relative inline-block">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#EFEBE1] flex items-center justify-center shadow-sm">
                                <img alt="AyurCare360 Logo" className="w-full h-full object-cover p-2" src="/Favicon_up.png" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#EFEBE1]">
                        <header className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome back</h2>
                            <p className="text-gray-500 font-medium text-sm">Continue your journey to better health</p>
                        </header>

                        <form className="space-y-6" onSubmit={handleLogin}>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="identifier">
                                    Email or Mobile Number
                                </label>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none placeholder:text-gray-400"
                                        id="identifier"
                                        name="identifier"
                                        placeholder="name@example.com"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="password">
                                        Password
                                    </label>
                                    <Link className="text-[10px] font-bold uppercase tracking-widest text-[#3A6447] hover:text-[#2C4D36] transition-colors duration-200" to="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none placeholder:text-gray-400"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type="password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full bg-[#3A6447] text-white font-bold py-4 rounded-full hover:bg-[#2C4D36] transition-colors shadow-sm mt-4"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-gray-500 text-xs font-medium">
                                Don’t have an account?
                                <Link className="text-[#3A6447] font-bold hover:underline ml-1" to="/signup">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex justify-center items-center space-x-6 w-full py-6 px-4 bg-transparent">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">© {new Date().getFullYear()} AYURCARE360</span>
                <div className="flex space-x-6">
                    <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/privacy">
                        Privacy Policy
                    </Link>
                    <Link className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#3A6447] transition-colors" to="/terms">
                        Terms & Conditions
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
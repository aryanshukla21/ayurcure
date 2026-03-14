import React from 'react';

const AuthLayout = ({ children, title, subtitle, icon }) => {
    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-4 font-sans text-gray-800">
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Header/Logo Area */}
                {icon ? (
                    <div className="w-12 h-12 bg-[#4A7C59] text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        {icon}
                    </div>
                ) : (
                    <div className="w-12 h-12 bg-[#4A7C59] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-sm">
                        A
                    </div>
                )}

                {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
                {subtitle && <p className="text-gray-500 mb-8 text-center text-sm">{subtitle}</p>}

                {/* Main Card */}
                <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    {children}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-gray-300"></span>
                        Secure Apothecary Access
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 justify-center">
                        <a href="#" className="hover:text-[#4A7C59]">Privacy Policy</a>
                        <a href="#" className="hover:text-[#4A7C59]">Terms of Service</a>
                        <a href="#" className="hover:text-[#4A7C59]">Help Center</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
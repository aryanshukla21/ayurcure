import React from 'react';

const WellnessMatrix = ({ benefits }) => {
    if (!benefits || benefits.length === 0) return null;

    return (
        <div className="lg:col-span-2 bg-[#fff9e8] rounded-3xl p-8 border border-[#E8E3D8]">
            <span className="text-xs font-bold tracking-wider text-amber-800 mb-2 block uppercase">KEY BENEFITS</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Holistic Wellness Matrix</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                        <div key={idx}>
                            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Icon size={18} className="text-[#4A7C59]" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WellnessMatrix;
import React from 'react';

export const HowItWorks = () => {
    const steps = [
        { num: '01', title: 'Take Assessment', desc: 'Fill out comprehensive Prakriti analysis to understand your unique mind-body constitution' },
        { num: '02', title: 'Get Matched', desc: 'Connect woiith certified Ayurvedic Doctor specelizing in your specefuc health needs.' },
        { num: '03', title: 'Personalized Plan', desc: 'Receive your custom diet, lifestyle, meals and premium healt recommendations.' },
        { num: '04', title: 'Ongoing Support', desc: 'Track your healing progress with 24/7 access to your dedicated health coach.' }
    ];

    return (
        <section id="how-it-works" className="bg-white w-full px-6 md:px-12 lg:px-24 py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-6">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
                    Your journey to holistic health is simple, transparent, and entirely digital.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-8 rounded-3xl bg-ayur-beige hover:shadow-lg transition-shadow">
                        <div className="text-5xl font-sans font-bold text-ayur-green/20 mb-6">{step.num}</div>
                        <h3 className="text-2xl font-sans font-bold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-gray-600 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
import React from 'react';
import { useState } from 'react';
import { Button } from '../common/Button';

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        { q: "Are the doctors certified?", a: "Yes, all our practitioners hold valid degrees in Ayurvedic Medicine and Surgery (BAMS) and have been thoroughly verified." },
        { q: "How are the medicines delivered?", a: "Medicines prescribed by our doctors can be purchased directly from our integrated marketplace and are shipped securely to your address." },
        { q: "Is video consultation effective for Ayurveda?", a: "Absolutely. Our doctors are trained to assess your prakriti (body type) and symptoms through detailed video consultations and questionnaires." }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section id="faq" className="bg-[#F1F8F6] w-full px-6 md:px-12 lg:px-24 py-24 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-col gap-12 justify-center">
                <div className="">
                    <h2 className="text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 ${openIndex === idx ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full p-6 text-left flex justify-between items-center focus:outline-none group"
                            >
                                <span className={`font-bold text-lg ${openIndex === idx ? 'text-[#2D5A27]' : 'text-gray-900 group-hover:text-[#2D5A27]'}`}>
                                    {faq.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-[#F1F8F6] text-[#2D5A27]' : 'bg-gray-50 text-gray-400 group-hover:bg-[#F1F8F6] group-hover:text-[#2D5A27]'}`}>
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                            >
                                <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
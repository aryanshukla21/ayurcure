import React from 'react';

export const SuccessStories = () => {
    const stories = [
        { name: "Priya Sharma", issue: "Chronic Migraine", feedback: "AyurCure connected me to a wonderful doctor. The herbal remedies worked wonders where modern medicine failed me." },
        { name: "Rahul Verma", issue: "Digestive Issues", feedback: "The personalized diet plan and organic supplements have completely changed my energy levels. Highly recommended!" }
    ];

    return (
        <section id="success-stories" className="bg-white w-full px-6 md:px-12 lg:px-24 py-24">
            <div className="flex flex-col lg:flex-col gap-16 items-center">
                <div className="lg:w-1/3 flex justify-center">
                    <h2 className="text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-6">Success Stories</h2>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-14">
                    {stories.map((story, idx) => (
                        <div key={idx} className="bg-[#F9F7F2] p-8 rounded-3xl border border-gray-100">
                            <p className="text-ayur-orange text-4xl font-sans mb-4">"</p>
                            <p className="text-gray-700 italic font-sans text-lg mb-6 leading-relaxed">
                                {story.feedback}
                            </p>
                            <div className="font-sans">
                                <p className="font-bold text-gray-900">{story.name}</p>
                                <p className="text-sm text-ayur-green font-medium">Treated for: {story.issue}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
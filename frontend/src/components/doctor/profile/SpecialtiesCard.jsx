import React from 'react';

const SpecialtiesCard = ({ subSpecializations }) => {
    return (
        <section>
            <h4 className="mb-4">Specialties & Expertise</h4>
            <div className="flex flex-wrap gap-2">
                {subSpecializations.map((spec, idx) => (
                    <span key={idx} className="bg-[#4A7C59]/10 text-[#4A7C59] px-4 py-2 rounded-full text-[20px] font-semibold tracking-[0.3px]">
                        {spec}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default SpecialtiesCard;
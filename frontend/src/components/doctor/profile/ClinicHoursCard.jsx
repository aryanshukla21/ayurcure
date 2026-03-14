import React from 'react';
import { Clock, Info } from 'lucide-react';

const ClinicHoursCard = () => {
    return (
        <section>
            <h4 className="mb-4 flex items-center gap-2">
                <Clock size={20} className="text-[#4A7C59]" />
                Clinic Hours
            </h4>

            {/* Updated Background Color to match the design file */}
            <div className="bg-[#4A7C59] p-6 rounded-xl border border-[#efe9dc] shadow-sm">
                <ul className="flex flex-col gap-4 text-[14px]">
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white flex items-center gap-2.5">
                            {/* Added Icons as per the file */}
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span> Monday
                        </span>
                        <span className="font-medium text-white">08:00 AM - 05:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span> Tuesday
                        </span>
                        <span className="font-medium text-white ">09:00 AM - 05:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white  flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span> Wednesday
                        </span>
                        <span className="font-medium  text-white ">10:00 AM - 07:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white  flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span> Thursday
                        </span>
                        <span className="font-medium text-white ">09:00 AM - 05:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span> Friday
                        </span>
                        <span className="font-medium text-white ">08:00 AM - 07:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                        <span className="font-semibold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Saturday
                        </span>
                        <span className="font-medium text-white ">Closed</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-semibold text-white  flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Sunday
                        </span>
                        <span className="font-medium text-white ">Closed</span>
                    </li>
                </ul>

                {/* Walk-in hours section extracted from the PDF */}
                <div className="mt-5 bg-white p-4 rounded-lg flex items-start gap-3 border border-gray-100 shadow-sm">
                    <Info size={18} className="text-[#4A7C59] mt-0.5 shrink-0" />
                    <p className="text-[13px] text-gray-600 leading-[1.5]">
                        <span className="font-semibold text-gray-800 block mb-0.5">Walk-in hours</span>
                        Available for urgent consultations. Please check in at the reception desk.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ClinicHoursCard;
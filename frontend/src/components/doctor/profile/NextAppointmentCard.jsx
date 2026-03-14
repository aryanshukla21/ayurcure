import React from 'react';
import { Calendar as CalIcon } from 'lucide-react';

const NextAppointmentCard = ({ nextAppointment }) => {
    return (
        <section>
            <h4 className="mb-4">Next Appointment</h4>
            {nextAppointment ? (
                <div className="bg-[#4A7C59] p-6 rounded-xl text-white shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-[18px]">
                            {nextAppointment.patient_name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[18px] font-semibold">{nextAppointment.patient_name}</p>
                            <p className="text-[14px] text-green-50 mt-0.5 flex items-center gap-1.5">
                                <CalIcon size={14} />
                                {new Date(nextAppointment.start_time || nextAppointment.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                    <button className="w-full bg-white text-[#4A7C59] py-2.5 rounded-lg text-[14px] font-semibold uppercase tracking-[0.5px] hover:bg-green-50 transition-colors mt-2">
                        View Full Schedule
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-[14px] text-gray-500 font-medium">No upcoming appointments scheduled.</p>
                </div>
            )}
        </section>
    );
};

export default NextAppointmentCard;
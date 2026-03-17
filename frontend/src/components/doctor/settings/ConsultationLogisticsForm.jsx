// frontend/src/components/doctor/settings/ConsultationLogisticsForm.jsx
import React, { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const ConsultationLogisticsForm = ({ data }) => {
    const [formData, setFormData] = useState({
        fee: data?.consultation_fee || '',
        start_time: data?.start_time || '09:00 AM',
        end_time: data?.end_time || '05:00 PM',
        days: data?.availability_days || { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false }
    });

    const toggleDay = (day) => {
        setFormData(prev => ({
            ...prev,
            days: { ...prev.days, [day]: !prev.days[day] }
        }));
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader icon={CalendarClock} title="Consultation Logistics" iconColor="text-orange-500" iconBg="bg-orange-50" />

            <FormGroup label="Consultation Fee">
                <Input type="text" name="fee" value={`$${formData.fee}`} onChange={(e) => setFormData({ ...formData, fee: e.target.value.replace('$', '') })} />
            </FormGroup>

            <FormGroup label="Availability">
                <div className="flex flex-wrap gap-3">
                    {Object.keys(formData.days).map(day => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`w-12 h-6 rounded-3xl font-bold transition-all flex items-center justify-center border
                                ${formData.days[day]
                                    ? 'bg-[#4A7C59] text-white border-[#4A7C59] shadow-md shadow-[#4A7C59]/30'
                                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </FormGroup>

            <div className="grid grid-cols-2 gap-6 mt-6">
                <FormGroup label="Start Time">
                    <Input type="text" name="start_time" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} />
                </FormGroup>
                <FormGroup label="End Time">
                    <Input type="text" name="end_time" value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} />
                </FormGroup>
            </div>

            <div className="flex justify-center mt-2">
                <SaveButton text="Update Consultation Details" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={() => console.log('Saving:', formData)} />
            </div>
        </div>
    );
};
export default ConsultationLogisticsForm;
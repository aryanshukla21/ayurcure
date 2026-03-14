import React from 'react';
import { Pill } from 'lucide-react';

const PrescriptionItem = ({ name, meta }) => (
    <div className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-md flex items-center justify-center shrink-0">
            <Pill size={16} />
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
            <p className="text-xs text-gray-500">{meta}</p>
        </div>
    </div>
);

export default PrescriptionItem;
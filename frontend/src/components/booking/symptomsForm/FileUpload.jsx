import React, { useRef } from 'react';

export const FileUpload = () => {
    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            onClick={handleDivClick}
            className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-orange-50/50 hover:border-ayur-orange/50 transition-all cursor-pointer"
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
            />
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-2xl mb-4">
                📄
            </div>
            <p className="text-sm font-bold text-ayur-orange mb-1">
                Click to upload <span className="text-gray-500 font-normal">or drag and drop</span>
            </p>
            <p className="text-xs text-gray-400">
                PDF, PNG, JPG (Max 10MB)
            </p>
        </div>
    );
};
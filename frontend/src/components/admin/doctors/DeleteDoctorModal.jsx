import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteDoctorModal = ({ isOpen, onClose, onConfirm, selectedCount, doctorName }) => {
  if (!isOpen) return null;

  // Dynamically format the name based on how many doctors are selected
  const nameToDisplay = selectedCount > 1 ? `${selectedCount} selected doctors` : (doctorName || 'this doctor');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      
      {/* Modal Box */}
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-[32px] p-8 shadow-xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF1E8] flex items-center justify-center text-[#D9774B] shrink-0">
            <Trash2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Delete Doctor</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Permanent administrative action
            </p>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-[#FDF9EE] border border-[#EFEBE1] border-l-4 border-l-[#D9774B] rounded-r-2xl p-5 mb-8">
          <p className="text-sm font-bold text-gray-900 mb-2">
            Are you sure you want to delete {selectedCount > 1 ? 'these doctors' : 'this doctor'}?
          </p>
          <p className="text-xs font-medium text-gray-600 leading-relaxed">
            The action will remove all schedules and active patient assignments for <span className="font-bold text-gray-900">{nameToDisplay}</span>. This cannot be undone.
          </p>
        </div>

        {/* Actions (Stacked rounded-full buttons) */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full bg-[#D9774B] hover:bg-[#C26236] text-white font-bold py-3.5 rounded-full transition-colors shadow-sm"
          >
            Confirm Delete
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 rounded-full transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteDoctorModal;
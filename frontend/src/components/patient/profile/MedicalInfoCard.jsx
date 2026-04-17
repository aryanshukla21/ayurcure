import React from 'react';
import { Activity, Droplet, Scale, Ruler } from 'lucide-react';

const MedicalInfoCard = ({ medical, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#3A6447] rounded-[32px] p-8 border border-[#2C4D36] shadow-sm animate-pulse h-full min-h-[200px] flex flex-col justify-center">
        <div className="h-6 bg-white/20 rounded w-48 mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-white/10 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const safeMedical = medical || {};

  return (
    <div className="bg-[#3A6447] rounded-[32px] p-8 border border-[#2C4D36] shadow-sm text-white relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
          <Activity size={20} className="text-white" />
        </div>
        <h3 className="text-xl font-bold">Key Medical Info</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <Droplet size={18} className="text-[#EBCB8B] mb-2" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Blood</p>
          <p className="text-lg font-extrabold">{safeMedical.bloodGroup || '--'}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <Scale size={18} className="text-[#EBCB8B] mb-2" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Weight</p>
          <p className="text-lg font-extrabold">{safeMedical.weight || '--'} <span className="text-xs">kg</span></p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <Ruler size={18} className="text-[#EBCB8B] mb-2" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Height</p>
          <p className="text-lg font-extrabold">{safeMedical.height || '--'} <span className="text-xs">cm</span></p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <Activity size={18} className="text-[#EBCB8B] mb-2" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Prakriti</p>
          <p className="text-lg font-extrabold">{safeMedical.prakriti || '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoCard;
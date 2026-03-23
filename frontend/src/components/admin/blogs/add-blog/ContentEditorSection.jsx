import React from 'react';
import { FileEdit, CloudUpload, Bold, Italic, List, X } from 'lucide-react';

const ContentEditorSection = ({ formData, onChange, onImageChange, onRemoveImage }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <FileEdit size={18} className="text-[#3A6447]" />
        <h3 className="text-lg font-bold text-gray-900">Content Editor</h3>
      </div>

      {/* Cover Image Upload & Preview */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cover Image</label>
        
        {formData.coverImage ? (
          /* Image Preview State */
          <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-[#EFEBE1] group shadow-sm">
            <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
            
            {/* Hover Overlay for Removal */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <button 
                type="button"
                onClick={onRemoveImage}
                className="bg-white text-[#D92D20] hover:bg-[#FEF3F2] px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <X size={16} /> Remove Image
              </button>
            </div>
          </div>
        ) : (
          /* Upload Box State */
          <label className="w-full h-48 md:h-64 border-2 border-dashed border-[#D1D5DB] rounded-2xl bg-[#FDF9EE]/50 hover:bg-[#FDF9EE] transition-colors flex flex-col items-center justify-center cursor-pointer group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={onImageChange} 
            />
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform duration-300">
              <CloudUpload size={20} className="text-[#3A6447]" />
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1">Click to browse or drag image here</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SVG, PNG, JPG OR GIF (MAX. 800x400px)</p>
          </label>
        )}
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-1.5 mt-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Description</label>
        <textarea 
          name="shortDescription" 
          value={formData.shortDescription} 
          onChange={onChange} 
          placeholder="Write a brief summary for the feed..." 
          className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none h-24 shadow-sm" 
        />
      </div>

      {/* Full Content (Simulated Rich Text Editor) */}
      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Content</label>
        <div className="w-full bg-white border border-[#EFEBE1] rounded-xl overflow-hidden flex flex-col h-full min-h-[300px] shadow-sm">
          {/* Simulated Toolbar */}
          <div className="bg-[#FAF7F2] border-b border-[#EFEBE1] p-3 flex items-center gap-4">
             <button type="button" className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"><Bold size={16} /></button>
             <button type="button" className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"><Italic size={16} /></button>
             <button type="button" className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"><List size={16} /></button>
          </div>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={onChange} 
            placeholder="Start writing the story of healing..." 
            className="w-full p-4 text-sm font-medium text-gray-900 focus:outline-none resize-none flex-1" 
          />
        </div>
      </div>

    </div>
  );
};

export default ContentEditorSection;
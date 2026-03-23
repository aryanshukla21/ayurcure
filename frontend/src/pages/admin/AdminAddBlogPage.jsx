import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import BlogInfoSection from '../../components/admin/blogs/add-blog/BlogInfoSection';
import ContentEditorSection from '../../components/admin/blogs/add-blog/ContentEditorSection';
import PublishingSidebar from '../../components/admin/blogs/add-blog/PublishingSidebar';

const AdminAddBlogPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Ayurveda Insights',
    audience: 'General Public',
    shortDescription: '',
    content: '',
    status: 'Draft',
    tags: ['Ayurveda', 'Health', 'Lifestyle'],
    focusKeyword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'Draft' }));
    console.log('Saved as draft:', formData);
    navigate('/admin/blogs');
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'Published' }));
    console.log('Publishing blog:', formData);
    navigate('/admin/blogs');
  };

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300 flex flex-col min-h-screen">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Link to="/admin/blogs" className="hover:text-[#3A6447] transition-colors">Blogs</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900">Add Blog</span>
          </div>
          <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
            Add Blog
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Create a new editorial piece for the healthcare community.
          </p>
        </div>
        
        {/* Top Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSaveDraft}
            className="bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-6 rounded-full transition-colors shadow-sm text-sm"
          >
            Save as Draft
          </button>
          <button 
            onClick={handlePublish}
            className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full transition-colors shadow-sm text-sm"
          >
            Publish Blog
          </button>
        </div>
      </div>

      {/* Main Grid: 2/3 Content Editor | 1/3 Publishing Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Left Column (Content Editor) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <BlogInfoSection formData={formData} onChange={handleInputChange} />
          <ContentEditorSection formData={formData} onChange={handleInputChange} />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1">
          <PublishingSidebar formData={formData} onChange={handleInputChange} setFormData={setFormData} />
        </div>

      </div>

      {/* Bottom Floating Publish Button (Optional, mimics PDF bottom right) */}
      <div className="mt-8 flex justify-between items-center text-sm font-medium text-gray-400 border-t border-[#EFEBE1] pt-6">
        <p>Last saved: Just now</p>
        <button 
          onClick={handlePublish}
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-sm uppercase tracking-widest"
        >
          Publish Blog
        </button>
      </div>

    </div>
  );
};

export default AdminAddBlogPage;
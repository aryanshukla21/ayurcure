import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';

// Reusing the components from the Add Blog feature
import BlogInfoSection from '../../components/admin/blogs/add-blog/BlogInfoSection';
import ContentEditorSection from '../../components/admin/blogs/add-blog/ContentEditorSection';
import PublishingSidebar from '../../components/admin/blogs/add-blog/PublishingSidebar';

const AdminEditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    audience: '',
    shortDescription: '',
    content: '',
    status: '',
    tags: [],
    focusKeyword: ''
  });

  // Simulate fetching the blog data based on the ID
  useEffect(() => {
    setIsLoading(true);
    // Simulating API latency
    setTimeout(() => {
      setFormData({
        title: 'The Power of Ashwagandha: A Modern Guide',
        category: 'Ayurveda Insights',
        audience: 'General Public',
        shortDescription: 'Discover how this ancient adaptogen is transforming modern wellness routines...',
        content: `The Power of Ashwagandha....\n\nAshwagandha, often referred to as "Indian Ginseng," is one of the most important herbs in Ayurveda. It has been used for over 3,000 years to relieve stress, increase energy levels, and improve concentration.\n\nRecent scientific studies support these ancient claims, showing that Ashwagandha can significantly reduce cortisol levels. Incorporating this adaptogen into your daily routine can help balance the body's response to stress and promote long-term mental clarity and physical vitality.`,
        status: 'Draft',
        tags: ['Ayurveda'],
        focusKeyword: 'Ashwagandha'
      });
      setIsLoading(false);
    }, 400); 
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'Draft' }));
    console.log('Saved as draft for ID:', id, formData);
    navigate('/admin/blogs');
  };

  const handleSaveChanges = () => {
    console.log('Saving changes for ID:', id, formData);
    navigate('/admin/blogs');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300 flex flex-col min-h-screen">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Link to="/admin/blogs" className="hover:text-[#3A6447] transition-colors">Blogs</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900">Edit Blog</span>
          </div>
          <div className="flex items-end gap-4">
            <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
              Edit Blog
            </h1>
            <span className="bg-[#EAE5D9] text-[#79563E] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
              ID: #{id}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">
            Update your editorial piece for the healthcare community.
          </p>
        </div>
        
        {/* Top Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSaveDraft}
            className="bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-6 rounded-full transition-colors shadow-sm text-sm cursor-pointer"
          >
            Save as Draft
          </button>
          <button 
            onClick={handleSaveChanges}
            className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full transition-colors shadow-sm text-sm cursor-pointer"
          >
            Save Changes
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

      {/* Bottom Floating Save Button */}
      <div className="mt-8 flex justify-between items-center text-sm font-medium text-gray-400 border-t border-[#EFEBE1] pt-6">
        <p>Last saved: 2 minutes ago</p>
        <button 
          onClick={handleSaveChanges}
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-sm uppercase tracking-widest cursor-pointer"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default AdminEditBlogPage;
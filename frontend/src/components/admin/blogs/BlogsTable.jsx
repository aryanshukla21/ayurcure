import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Plus, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

// Extended dummy data to make pagination functional
const INITIAL_BLOGS = [
  { id: 1, title: 'Understanding Pitta Dosha: Balance Through Food', author: 'Dr. Varma', category: 'Ayurveda', date: 'Oct 24, 2023', status: 'PUBLISHED' },
  { id: 2, title: 'Morning Rituals: The Dinacharya Guide', author: 'Dr. Shanti', category: 'Lifestyle', date: 'Oct 21, 2023', status: 'PUBLISHED' },
  { id: 3, title: 'The 5 Best Yoga Asanas for Digestion', author: 'Juure Singh', category: 'Yoga', date: 'Pending', status: 'DRAFT' },
  { id: 4, title: 'Herbal Tea Blends for Better Sleep', author: 'Dr. Varma', category: 'Nutrition', date: 'Oct 18, 2023', status: 'PUBLISHED' },
  { id: 5, title: 'Modern Science & Ancient Ayurveda', author: 'Editorial Team', category: 'Ayurveda', date: 'Pending', status: 'DRAFT' },
  { id: 6, title: 'Ayurvedic Skincare for a Natural Glow', author: 'Dr. Priya', category: 'Lifestyle', date: 'Oct 15, 2023', status: 'PUBLISHED' },
  { id: 7, title: 'Managing Stress with Adaptogenic Herbs', author: 'Dr. Amit', category: 'Nutrition', date: 'Oct 12, 2023', status: 'PUBLISHED' },
  { id: 8, title: 'The Importance of a Consistent Sleep Routine', author: 'Dr. Shanti', category: 'Lifestyle', date: 'Pending', status: 'DRAFT' },
  { id: 9, title: 'Healing Spices You Already Have in Your Kitchen', author: 'Dr. Varma', category: 'Nutrition', date: 'Oct 05, 2023', status: 'PUBLISHED' },
];

const ITEMS_PER_PAGE = 5;

const BlogsTable = () => {
  const navigate = useNavigate();
  const [blogsData] = useState(INITIAL_BLOGS);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(blogsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = blogsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      
      {/* Top Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-8">
        
        {/* Search & Filter */}
        <div className="flex flex-1 gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Blog" 
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
            />
          </div>
          <div className="relative w-48 hidden md:block">
            <select className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer">
              <option>Category</option>
              <option>Ayurveda</option>
              <option>Lifestyle</option>
              <option>Nutrition</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Add Blog Button -> Routes to Page 19 */}
        <button 
          onClick={() => navigate('/admin/blogs/add')}
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[40%] pl-2">Title</div>
        <div className="w-[15%]">Category</div>
        <div className="w-[20%]">Date Published</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[10%] text-right pr-2">Action</div>
      </div>

      {/* Table Rows */}
      <div className="flex-1 mt-2 space-y-1 min-h-[380px]">
        {currentItems.map((blog) => (
          <div key={blog.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors group px-2 -mx-2">
            
            <div className="w-[40%] pl-2">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{blog.title}</h4>
              <p className="text-[11px] font-medium text-gray-500 mt-0.5">Author: {blog.author}</p>
            </div>
            
            <div className="w-[15%] text-sm font-medium text-gray-600">{blog.category}</div>
            
            <div className="w-[20%] text-sm font-medium text-gray-600">{blog.date}</div>
            
            <div className="w-[15%]">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                blog.status === 'PUBLISHED' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FEF5D3] text-[#A67C00]'
              }`}>
                {blog.status}
              </span>
            </div>
            
            <div className="w-[10%] text-right pr-4 flex justify-end">
              {/* Edit Icon Button -> Routes to Page 20 with Tooltip */}
              <div className="relative group/tooltip">
                <button 
                  onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                  className="text-gray-400 hover:text-[#3A6447] transition-colors p-2 rounded-full hover:bg-gray-100 outline-none cursor-pointer"
                >
                  <Edit2 size={16} />
                </button>
                
                {/* Tooltip that appears on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                  Edit Blog
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, blogsData.length)} of {blogsData.length} Articles
        </p>
        
        <div className="flex items-center gap-1 text-sm font-bold">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'}`}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default BlogsTable;
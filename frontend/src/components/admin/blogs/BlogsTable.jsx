import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronDown, Plus, Calendar, User, Edit2, Trash2 } from 'lucide-react';

// Dummy Data for Blogs
const INITIAL_BLOGS = [
  { id: 'BLG-001', title: 'The Healing Power of Ashwagandha', category: 'Herbs', author: 'Dr. Anjali Sharma', date: 'Oct 24, 2023', status: 'Published', image: 'https://images.unsplash.com/photo-1611078519445-6677db6fc434?q=80&w=400&auto=format&fit=crop' },
  { id: 'BLG-002', title: 'Understanding Your Prakriti (Dosha)', category: 'Wellness', author: 'Dr. Rajesh Kumar', date: 'Oct 22, 2023', status: 'Draft', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=400&auto=format&fit=crop' },
  { id: 'BLG-003', title: 'An Ayurvedic Winter Diet Plan', category: 'Diet', author: 'Dr. Meera Nair', date: 'Oct 15, 2023', status: 'Published', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
  { id: 'BLG-004', title: 'Yoga Asanas for Better Digestion', category: 'Yoga', author: 'Dr. David Thorne', date: 'Oct 10, 2023', status: 'Published', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop' },
  { id: 'BLG-005', title: 'Natural Remedies for Glowing Skin', category: 'Skincare', author: 'Dr. Anjali Sharma', date: 'Sep 28, 2023', status: 'Published', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
  { id: 'BLG-006', title: 'The Science Behind Panchakarma', category: 'Therapy', author: 'Dr. Rajesh Kumar', date: 'Sep 15, 2023', status: 'Draft', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop' },
];

const BlogsTable = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState(INITIAL_BLOGS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Filter Logic
  const processedBlogs = useMemo(() => {
    return blogsData.filter(blog => {
      // 1. Search Logic (by Title or Author)
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchesCategory = categoryFilter === 'All Categories' || blog.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [blogsData, searchQuery, categoryFilter]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevents the tile click event from firing when clicking trash
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogsData(blogsData.filter(blog => blog.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">

      {/* Top Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search articles or authors..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all shadow-sm"
            />
          </div>

          <div className="relative w-full md:w-48">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer shadow-sm"
            >
              <option value="All Categories">All Categories</option>
              <option value="Herbs">Herbs</option>
              <option value="Wellness">Wellness</option>
              <option value="Diet">Diet</option>
              <option value="Yoga">Yoga</option>
              <option value="Skincare">Skincare</option>
              <option value="Therapy">Therapy</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Add Blog Button */}
        <Link
          to="/admin/blogs/add"
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm w-full xl:w-auto cursor-pointer"
        >
          <Plus size={18} /> Create New Post
        </Link>
      </div>

      {/* Blog Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {processedBlogs.length > 0 ? (
          processedBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
              className="bg-white border border-[#EFEBE1] rounded-3xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${blog.status === 'Published' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'
                    }`}>
                    {blog.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-extrabold text-[#D9774B] uppercase tracking-widest mb-2">
                  {blog.category}
                </span>

                <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-4 group-hover:text-[#3A6447] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-[#EFEBE1] flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                      <User size={14} className="text-gray-400" /> {blog.author}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                      <Calendar size={12} className="text-gray-400" /> {blog.date}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/blogs/edit/${blog.id}`); }}
                      className="p-2 text-gray-400 hover:text-[#3A6447] bg-gray-50 hover:bg-[#E7F3EB] rounded-xl transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, blog.id)}
                      className="p-2 text-gray-400 hover:text-[#D92D20] bg-gray-50 hover:bg-[#FEE4E2] rounded-xl transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-gray-900 mb-1">No articles found</p>
            <p className="text-sm font-medium text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default BlogsTable;
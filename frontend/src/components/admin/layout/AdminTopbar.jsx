import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const AdminTopbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the page from reloading

    if (searchQuery.trim()) {
      // Redirects to a global search page, passing the query in the URL
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`);

      // Optional: Clear the search bar after searching
      // setSearchQuery('');
    }
  };

  return (
    <div className="h-24 px-10 flex items-center justify-between bg-[#FDF9EE] sticky top-0 z-40">

      {/* Functional Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients, doctors or medical records..."
          className="w-full bg-white border border-[#EFEBE1] rounded-full py-3 pl-12 pr-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm transition-all"
        />
        {/* Hidden submit button to ensure 'Enter' key triggers the form submission */}
        <button type="submit" className="hidden">Search</button>
      </form>

      {/* Right Side Profile Only */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-900">Admin Profile</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chief Administrator</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#3A6447] text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#2C4D36] transition-colors">
          AD
        </div>
      </div>

    </div>
  );
};

export default AdminTopbar;
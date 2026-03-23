import React from 'react';
import BlogsTable from '../../components/admin/blogs/BlogsTable';
import BlogMetricsRow from '../../components/admin/blogs/BlogMetricsRow';

const AdminBlogsPage = () => {
  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300 flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
          Blogs
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Curate wellness insights for your patients.
        </p>
      </div>

      {/* Main Table Area */}
      <div className="flex-1">
        <BlogsTable />
      </div>

      {/* Bottom Insights */}
      <BlogMetricsRow />

    </div>
  );
};

export default AdminBlogsPage;
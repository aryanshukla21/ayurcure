import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, Package, AlertCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// Extended Dummy Data for Pagination
const INITIAL_INVENTORY = [
    { id: '#PRD-001', name: 'Ashwagandha Gold Capsules', category: 'Supplements', sku: 'ASH-GLD-60', price: '₹1,200', stock: 145, status: 'In Stock' },
    { id: '#PRD-002', name: 'Kumkumadi Tailam', category: 'Skincare', sku: 'KUM-OIL-30', price: '₹2,400', stock: 12, status: 'Low Stock' },
    { id: '#PRD-003', name: 'Triphala Powder 500g', category: 'Digestive', sku: 'TRI-PWD-500', price: '₹450', stock: 0, status: 'Out of Stock' },
    { id: '#PRD-004', name: 'Organic Brahmi Tea', category: 'Beverage', sku: 'BRH-TEA-20', price: '₹350', stock: 89, status: 'In Stock' },
    { id: '#PRD-005', name: 'Neem Purifying Cleanser', category: 'Skincare', sku: 'NEM-CLN-100', price: '₹550', stock: 23, status: 'Low Stock' },
    { id: '#PRD-006', name: 'Chyawanprash Extract', category: 'Supplements', sku: 'CHY-EXT-250', price: '₹850', stock: 56, status: 'In Stock' },
    { id: '#PRD-007', name: 'Sandalwood Face Pack', category: 'Skincare', sku: 'SND-FC-50', price: '₹600', stock: 5, status: 'Low Stock' },
    { id: '#PRD-008', name: 'Amla Juice 1L', category: 'Beverage', sku: 'AML-JUC-1L', price: '₹250', stock: 120, status: 'In Stock' },
];

const ITEMS_PER_PAGE = 5;

const InventoryTable = () => {
    // Make data stateful so we can delete items
    const [inventoryData, setInventoryData] = useState(INITIAL_INVENTORY);
    const [currentPage, setCurrentPage] = useState(1);

    // Custom Modal States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // 1. Filter Logic
    const processedData = useMemo(() => {
        return inventoryData.filter(item => {
            // Search by Name or SKU
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase());

            // Category Filter
            const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;

            // Status Filter
            const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [inventoryData, searchTerm, categoryFilter, statusFilter]);

    // 2. Pagination Logic
    const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handlers
    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
    const handleCategoryChange = (e) => { setCategoryFilter(e.target.value); setCurrentPage(1); };
    const handleStatusChange = (e) => { setStatusFilter(e.target.value); setCurrentPage(1); };

    // --- NEW: Custom Delete Handlers ---
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            setInventoryData(inventoryData.filter(item => item.id !== productToDelete.id));

            // Adjust page if deleting the last item on the current page
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    // UI Helpers
    const getStatusBadge = (status) => {
        switch (status) {
            case 'In Stock':
                return <span className="bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-[#3A6447]/20">In Stock</span>;
            case 'Low Stock':
                return <span className="bg-[#FDF1E8] text-[#D9774B] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 w-fit shadow-sm border border-[#D9774B]/20"><AlertCircle size={10} /> Low Stock</span>;
            case 'Out of Stock':
                return <span className="bg-[#FEE4E2] text-[#D92D20] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-[#D92D20]/20">Out of Stock</span>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-8 relative">

            {/* CUSTOM DELETE MODAL */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 rounded-2xl bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center mb-6 mx-auto shadow-sm">
                            <Trash2 size={32} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Delete Product</h2>
                        <p className="text-sm font-medium text-gray-500 text-center mb-8">
                            Are you sure you want to delete <span className="font-bold text-gray-900">{productToDelete?.name}</span>? This action cannot be undone and will remove it from the pharmacy store.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-3.5 px-4 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full transition-colors cursor-pointer shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3.5 px-4 bg-[#D92D20] hover:bg-[#B42318] text-white text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">

                <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products or SKU..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full bg-white border border-[#EFEBE1] rounded-full py-3.5 pl-11 pr-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm"
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        {/* Category Filter */}
                        <div className="relative flex-1 md:w-40">
                            <select
                                value={categoryFilter} onChange={handleCategoryChange}
                                className="w-full bg-white border border-[#EFEBE1] rounded-full py-3.5 pl-4 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer shadow-sm"
                            >
                                <option value="All Categories">All Categories</option>
                                <option value="Skincare">Skincare</option>
                                <option value="Supplements">Supplements</option>
                                <option value="Digestive">Digestive</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Stock Status Filter */}
                        <div className="relative flex-1 md:w-40">
                            <select
                                value={statusFilter} onChange={handleStatusChange}
                                className="w-full bg-white border border-[#EFEBE1] rounded-full py-3.5 pl-4 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer shadow-sm"
                            >
                                <option value="All Status">All Status</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                <Link to="/admin/inventory/add" className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-3.5 px-6 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap w-full xl:w-auto">
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-[32px] border border-[#EFEBE1] shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#FAF7F2] border-b border-[#EFEBE1]">
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Product Info</th>
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">SKU</th>
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Price</th>
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Stock</th>
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFEBE1]">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-[#FDF9EE]/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-[#EFEBE1] shadow-sm flex items-center justify-center text-[#3A6447]">
                                                    <Package size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{item.name}</p>
                                                    <p className="text-[11px] font-medium text-gray-500">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-gray-600">{item.sku}</td>
                                        <td className="py-4 px-6 text-sm font-extrabold text-gray-900">{item.price}</td>
                                        <td className="py-4 px-6">
                                            <span className={`text-sm font-bold ${item.stock === 0 ? 'text-[#D92D20]' : 'text-gray-900'}`}>
                                                {item.stock} units
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {getStatusBadge(item.status)}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/inventory/edit/${item.id.replace('#', '')}`}
                                                    className="p-2 text-gray-400 hover:text-[#3A6447] bg-white border border-[#EFEBE1] hover:bg-[#E7F3EB] hover:border-[#3A6447]/30 rounded-lg shadow-sm transition-all cursor-pointer"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                {/* Changed this button to trigger the new custom modal */}
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className="p-2 text-gray-400 hover:text-[#D92D20] bg-white border border-[#EFEBE1] hover:bg-[#FEE4E2] hover:border-[#D92D20]/30 rounded-lg shadow-sm transition-all cursor-pointer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-sm font-bold text-gray-400">
                                        No products match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-6 border-t border-[#EFEBE1] flex flex-col md:flex-row items-center justify-between bg-white gap-4 mt-auto">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Showing {processedData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, processedData.length)} of {processedData.length} Products
                    </p>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-1 text-sm font-bold">
                            <button
                                onClick={handlePrevPage} disabled={currentPage === 1}
                                className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'}`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                onClick={handleNextPage} disabled={currentPage === totalPages}
                                className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
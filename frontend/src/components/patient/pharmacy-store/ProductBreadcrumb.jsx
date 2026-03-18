import React from 'react';
import { Link } from 'react-router-dom';

const ProductBreadcrumb = () => {
    return (
        <div className="mb-4 mt-2">
            <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                <Link
                    to="/patient/pharmacy-store"
                    className="hover:text-[#2D5A27] transition-colors cursor-pointer"
                >
                    PHARMACY STORE
                </Link>
                <span>&gt;</span>
                <span className="text-gray-500">PRODUCT DETAILS</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Product Details</h1>
        </div>
    );
};

export default ProductBreadcrumb;
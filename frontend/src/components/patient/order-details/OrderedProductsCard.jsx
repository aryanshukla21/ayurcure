import React from 'react';

const OrderedProductsCard = ({ products }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-8">Ordered Products</h3>

      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 pb-6 border-b border-[#EFEBE1] last:border-0 last:pb-0">
            {/* Product Image */}
            <div className="w-20 h-20 rounded-2xl bg-[#FDF9EE] border border-[#EFEBE1] flex items-center justify-center shrink-0 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
            </div>

            <div className="flex-1">
              <h4 className="text-base font-bold text-gray-900 leading-tight">{product.name}</h4>
              <p className="text-sm font-semibold text-[#9333EA] mt-1">{product.variant}</p>
              <p className="text-xs font-medium text-gray-500 mt-2">
                <span className='font-bold text-gray-900'>Qty: {product.qty}</span> • SKU: {product.sku}
              </p>
            </div>

            <div className="text-right flex flex-col items-end">
              <p className="text-xl font-extrabold text-[#3A6447]">{product.price}</p>
              {product.originalPrice && (
                <p className="text-xs font-medium text-gray-400 line-through mt-0.5">{product.originalPrice}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderedProductsCard;
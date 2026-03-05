import React from 'react';

export const OrderHistoryList = () => {
    const orders = [
        { id: 1, name: 'Ashwagandha Churna x2', status: 'SHIPPED', dateInfo: 'Expected arrival: Oct 20, 2023', action: 'Track Order', icon: '🌿' },
        { id: 2, name: 'Triphala Tablets (60 caps)', status: 'DELIVERED', dateInfo: 'Delivered on Oct 05, 2023', action: 'Reorder', icon: '💊' },
        { id: 3, name: 'Brahmi Oil - 200ml', status: 'DELIVERED', dateInfo: 'Delivered on Sep 22, 2023', action: 'Reorder', icon: '🧴' },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <span className="text-ayur-orange text-xl">📦</span> Order History
                </h3>
                <button className="text-sm font-bold text-ayur-orange hover:text-orange-600 transition-colors">
                    Track All
                </button>
            </div>

            <div className="space-y-8 flex-1">
                {orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#F1F8F6] rounded-xl flex items-center justify-center text-xl">
                                {order.icon}
                            </div>
                            <div>
                                <div className={`text-xs font-bold tracking-wider mb-1 ${order.status === 'SHIPPED' ? 'text-blue-500' : 'text-gray-400'
                                    }`}>
                                    {order.status}
                                </div>
                                <div className="font-bold text-gray-900 mb-0.5">{order.name}</div>
                                <div className="text-sm text-gray-500">{order.dateInfo}</div>
                            </div>
                        </div>

                        <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${order.action === 'Track Order'
                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                            }`}>
                            {order.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
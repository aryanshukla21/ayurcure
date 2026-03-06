import React from 'react';

export const ShippingAddressDetails = () => {
    return (
        <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <span className="text-ayur-orange">📍</span> Shipping Address
            </h3>

            <div className="bg-gray-50 rounded-2xl p-6 flex items-start gap-4">
                <div className="text-ayur-orange text-2xl mt-1">
                    🏠
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-1">Sarah Johnson</h4>
                    <p className="text-gray-600 leading-relaxed">
                        742 Evergreen Terrace, Apt 4B<br />
                        Springfield, IL 62704<br />
                        United States
                    </p>
                </div>
            </div>
        </div>
    );
};
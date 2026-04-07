import React, { useState, useEffect } from 'react';
import StoreHeader from '../../components/patient/pharmacy-store/StoreHeader';
import CategoryFilter from '../../components/patient/pharmacy-store/CategoryFilter';
import ProductCard from '../../components/patient/pharmacy-store/ProductCard';
import FloatingCart from '../../components/patient/pharmacy-store/FloatingCart';
import { ecommerceApi } from '../../api/ecommerceApi';
import { CheckCircle2 } from 'lucide-react';

const MOCK_PRODUCTS = [
    { id: '1', name: 'Organic Ashwagandha Capsules', category: 'Herbal Supplements', description: 'Stress relief and vitality booster formulated fo...', price: 15.00, tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '2', name: 'Triphala Churna', category: 'Digestive Care', description: 'Natural digestive support and body detox...', price: 12.50, tag: null, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '3', name: 'Herbal Immunity Tea', category: 'Immunity Boosters', description: 'Rich in antioxidants and infused with ginger...', price: 18.00, tag: 'ORGANIC', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '4', name: 'Neem Facial Serum', category: 'Skin Care', description: 'Pure neem extract for deep skin purification...', price: 24.00, tag: null, image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '5', name: 'Turmeric Curcumin Gold', category: 'Herbal Supplements', description: 'High-absorption joint health and inflammati...', price: 19.50, tag: null, image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '6', name: 'Saffron Infused Honey', category: 'Wellness Products', description: 'Luxury Kashmiri saffron blended with raw forest honey...', price: 28.00, tag: null, image: 'https://images.unsplash.com/photo-1587049352847-4d4b1378d1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '7', name: 'Brahmi Focus Oil', category: 'Wellness Products', description: 'Traditional hair and scalp oil designed to...', price: 16.00, tag: 'NEW', image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '8', name: 'Lotus Rejuvenating Mask', category: 'Skin Care', description: 'Calming face treatment using sacred lotus...', price: 22.00, tag: null, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '9', name: 'Shatavari Root Powder', category: 'Herbal Supplements', description: 'Rejuvenating tonic for hormonal balance...', price: 14.00, tag: null, image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '10', name: 'Pudin Hara Pearls', category: 'Digestive Care', description: 'Cooling peppermint oil for immediate gastric relief...', price: 8.50, tag: 'FAST ACTING', image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '11', name: 'Chyawanprash Awaleha', category: 'Immunity Boosters', description: 'Classic Ayurvedic jam packed with Vitamin C and Amla...', price: 21.00, tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '12', name: 'Kumkumadi Tailam', category: 'Skin Care', description: 'Miraculous beauty fluid for radiant and glowing skin...', price: 45.00, tag: 'PREMIUM', image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '13', name: 'Guduchi Stem Extract', category: 'Immunity Boosters', description: 'Potent detoxifier and immunity enhancer...', price: 17.50, tag: null, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '14', name: 'Aloe Vera Gel Pure', category: 'Skin Care', description: 'Multi-purpose soothing gel for skin and hair...', price: 10.00, tag: 'ORGANIC', image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '15', name: 'Isabgol Husk', category: 'Digestive Care', description: 'Natural gentle laxative for bowel regulation...', price: 9.00, tag: null, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '16', name: 'Amla Berry Juice', category: 'Wellness Products', description: 'Cold-pressed Indian Gooseberry juice...', price: 13.00, tag: null, image: 'https://images.unsplash.com/photo-1587049352847-4d4b1378d1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '17', name: 'Moringa Leaf Powder', category: 'Herbal Supplements', description: 'Nutrient-dense superfood for energy...', price: 16.50, tag: null, image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '18', name: 'Tulsi Holy Basil Drops', category: 'Immunity Boosters', description: 'Concentrated respiratory support...', price: 11.00, tag: 'ORGANIC', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '19', name: 'Hingwashtak Churna', category: 'Digestive Care', description: 'Traditional blend for reducing bloating and gas...', price: 14.00, tag: null, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '20', name: 'Sandalwood Face Pack', category: 'Skin Care', description: 'Cooling mask to reduce blemishes and acne...', price: 18.50, tag: null, image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '21', name: 'Copper Water Bottle', category: 'Wellness Products', description: 'Pure hammered copper for natural water purification...', price: 32.00, tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1587049352847-4d4b1378d1f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '22', name: 'Boswellia Joint Support', category: 'Herbal Supplements', description: 'Natural resin extract to improve mobility...', price: 22.00, tag: null, image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '23', name: 'Giloy Ghan Vati', category: 'Immunity Boosters', description: 'Antipyretic herb to fight infections naturally...', price: 12.00, tag: null, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { id: '24', name: 'Rose Water Toner', category: 'Skin Care', description: 'Steam distilled pure Kannauj rose water...', price: 15.00, tag: 'NEW', image: 'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' }
];

const PharmacyStore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Global Cart State for the Store (Now includes quantity!)
    const [cartItems, setCartItems] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '' });

    useEffect(() => {
        fetchProducts();
    }, [activeCategory]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (activeCategory !== 'All') params.category = activeCategory;
            const data = await ecommerceApi.getProducts(params);

            if (data.products && data.products.length > 0) {
                setProducts(data.products);
            } else {
                applyMockDataFilters();
            }
        } catch (error) {
            console.error("Failed to fetch products, falling back to mock data", error);
            applyMockDataFilters();
        } finally {
            setLoading(false);
        }
    };

    const applyMockDataFilters = () => {
        let filtered = MOCK_PRODUCTS;
        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        setProducts(filtered);
    };

    // Calculate dynamic cart totals
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Add To Cart Handler
    const handleAddToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // Trigger Toast Notification
        setToast({ show: true, message: 'Item added successfully!' });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    // Quantity Update Handler (+ / -)
    const handleUpdateQuantity = (productId, newQuantity) => {
        setCartItems(prev => {
            if (newQuantity <= 0) {
                // Remove item completely if quantity hits 0
                return prev.filter(item => item.id !== productId);
            }
            // Otherwise, update the quantity
            return prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 font-sans relative pb-24">
            <StoreHeader />
            <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            {/* Custom Toast Notification */}
            {toast.show && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-[60] animate-fade-in">
                    <CheckCircle2 size={18} className="text-green-400" />
                    <span className="text-sm font-medium tracking-wide">{toast.message}</span>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64 mb-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5A27]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Render ALL filtered products. Pagination & promo banners removed. */}
                    {products.map(product => {
                        const cartItem = cartItems.find(item => item.id === product.id);
                        const quantity = cartItem ? cartItem.quantity : 0;

                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                quantity={quantity}
                                onAddToCart={handleAddToCart}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        );
                    })}
                </div>
            )}

            {/* Floating Cart only appears if there are items */}
            <FloatingCart cartTotal={cartTotal} cartCount={cartCount} />
        </div>
    );
};

export default PharmacyStore;
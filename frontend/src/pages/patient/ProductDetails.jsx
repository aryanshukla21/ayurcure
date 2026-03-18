import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles, Zap, Moon, Shield } from 'lucide-react';
import { ecommerceApi } from '../../api/ecommerceApi';

// Import Components
import ProductBreadcrumb from '../../components/patient/pharmacy-store/ProductBreadcrumb';
import ProductGallery from '../../components/patient/pharmacy-store/ProductGallery';
import ProductInfo from '../../components/patient/pharmacy-store/ProductInfo';
import WellnessMatrix from '../../components/patient/pharmacy-store/WellnessMatrix';
import IngredientsList from '../../components/patient/pharmacy-store/IngredientsList';

// Deep mock data designed to exactly match the Page 15 UI requirements
const MOCK_PRODUCT_DETAILS = {
    id: '1',
    name: 'Premium Ashwagandha Root Churna',
    brand: 'Ayurcare360',
    tag: 'AUTHENTIC AYURVEDIC FORMULA',
    description: 'Pure, organic Withania somnifera powder harvested from the foothills of the Himalayas. Formulated for stress relief, vitality, and deep restful sleep.',
    price: 15.00,
    originalPrice: 21.50,
    discountPercentage: 30,
    availableDosages: ['50g', '100g', '250g'],
    images: [
        'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1608248593842-8021c6a2e262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ],
    ingredients: [
        { name: 'Ashwagandha Root', percentage: '95%' },
        { name: 'Black Pepper Extract', percentage: '3%' },
        { name: 'Natural Stabilizers', percentage: '2%' }
    ],
    benefits: [
        { icon: Sparkles, title: 'Cortisol Balance', desc: 'Significantly reduces stress markers and promotes mental clarity.' },
        { icon: Zap, title: 'Natural Energy', desc: 'Boosts physical performance and stamina without the jitters.' },
        { icon: Moon, title: 'Sleep Quality', desc: 'Supports natural circadian rhythms for deeper recovery.' },
        { icon: Shield, title: 'Immune Support', desc: 'Enhances body\'s natural defense against seasonal stress.' }
    ]
};

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const data = await ecommerceApi.getProductDetails(id);
            if (data && data.product) {
                // Combine backend data with mock arrays to satisfy the UI layout requirements
                setProduct({
                    ...MOCK_PRODUCT_DETAILS,
                    ...data.product
                });
            } else {
                setProduct(MOCK_PRODUCT_DETAILS);
            }
        } catch (error) {
            console.error("Failed to fetch product details, using mock data", error);
            setProduct(MOCK_PRODUCT_DETAILS);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-screen bg-[#FDFBF7]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5A27]"></div>
            </div>
        );
    }

    if (!product) return <div className="p-8">Product not found.</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans pb-24">

            <ProductBreadcrumb />

            {/* Top Section: Images & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <ProductGallery images={product.images} name={product.name} />
                <ProductInfo product={product} />
            </div>

            {/* Bottom Section: Matrix & Ingredients */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <WellnessMatrix benefits={product.benefits} />
                <IngredientsList ingredients={product.ingredients} />
            </div>

        </div>
    );
};

export default ProductDetails;
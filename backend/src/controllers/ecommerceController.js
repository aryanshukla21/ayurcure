const EcommerceModel = require('../models/ecommerceModel');
const PatientModel = require('../models/patientModel');
const paymentService = require('../services/paymentService');
const logger = require('../utils/logger');
const db = require('../config/db');

/**
 * Utility: Gets the PatientProfile ID for the authenticated User
 */
const getPatientId = async (userId) => {
    const profile = await PatientModel.getProfileByUserId(userId);
    if (!profile) throw new Error('Patient profile not found. Please complete onboarding.');
    return profile.id;
};

// ==========================================
// PUBLIC: PRODUCT CATALOG
// ==========================================

exports.getProducts = async (req, res) => {
    try {
        const { category, prakriti_suitability, search } = req.query;
        const products = await EcommerceModel.getProducts({ category, prakriti_suitability, search });
        res.status(200).json({ products });
    } catch (error) {
        logger.error(`Get Products Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const product = await EcommerceModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found.' });
        res.status(200).json({ product });
    } catch (error) {
        logger.error(`Get Product Details Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch product details.' });
    }
};

// ==========================================
// PROTECTED: PATIENT OPERATIONS
// ==========================================

exports.toggleWishlist = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const { product_id } = req.body;

        const result = await EcommerceModel.toggleWishlist(patientId, product_id);
        const message = result.added ? 'Added to wishlist.' : 'Removed from wishlist.';

        res.status(200).json({ message, added: result.added });
    } catch (error) {
        logger.error(`Wishlist Toggle Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update wishlist.' });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const products = await EcommerceModel.getWishlist(patientId);
        res.status(200).json({ wishlist: products });
    } catch (error) {
        logger.error(`Get Wishlist Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch wishlist.' });
    }
};

exports.placeOrder = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const { items, total_amount, discount_applied, shipping_address, payment_method } = req.body;

        if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty.' });

        // 1. Create DB Order & Deduct Stock
        const { orderId } = await EcommerceModel.placeOrder({
            patient_id: patientId,
            total_amount,
            discount_applied: discount_applied || 0,
            shipping_address,
            payment_method
        }, items);

        // 2. Initialize Payment Gateway if not Cash on Delivery
        if (payment_method === 'Online') {
            const gatewayOrder = await paymentService.createOrder(total_amount, orderId);
            return res.status(201).json({
                message: 'Order created. Pending payment.',
                orderId,
                gatewayPayload: gatewayOrder
            });
        }

        res.status(201).json({ message: 'Order placed successfully.', orderId });
    } catch (error) {
        logger.error(`Place Order Error: ${error.message}`);
        if (error.message.includes('Insufficient stock')) {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to process order.' });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        const isValid = paymentService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!isValid) {
            await EcommerceModel.updatePaymentStatus(order_id, 'Failed');
            return res.status(400).json({ error: 'Payment verification failed. Signature mismatch.' });
        }

        const updatedOrder = await EcommerceModel.updatePaymentStatus(order_id, 'Paid');
        res.status(200).json({ message: 'Payment verified successfully.', order: updatedOrder });
    } catch (error) {
        logger.error(`Verify Payment Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to verify payment.' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const patientId = await getPatientId(req.user.id);
        const orders = await EcommerceModel.getUserOrders(patientId);
        res.status(200).json({ orders });
    } catch (error) {
        logger.error(`Get Orders Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
};

// ==========================================
// SEEDER: PRODUCT CATALOG (Keep this!)
// ==========================================
exports.seedProducts = async (req, res) => {
    try {
        const productsToSeed = [
            {
                name: "Ashwagandha Capsules", sku: "AYP-PRD-001", brand: "Ayurveda Platform", category: "Rasayana / Adaptogen",
                form: "Hard Gelatin Capsules", quantity_size: "60 Capsules", mrp: 599, price: 479, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "24 months from date of manufacture", storage_instructions: "Store below 30°C in a cool, dry place away from direct sunlight",
                certifications: "AYUSH Manufacturing License, GMP Certified, FSSAI Approved", origin: "India (Madhya Pradesh Ashwagandha roots)",
                target_audience: "Adults 18–65 years, athletes, corporate professionals",
                tags: ["Stress relief", "Energy booster", "Immunity", "Adaptogen", "Anti-aging"],
                description: "Premium standardised Ashwagandha capsules using KSM-66 full-spectrum root extract, clinically proven to reduce cortisol levels, improve strength, and enhance cognitive function. Each batch tested for heavy metals and microbial safety.",
                key_ingredients: ["Ashwagandha Root Extract (KSM-66®) 300mg", "Ashwagandha Root Powder 200mg", "Black Pepper Extract (Bioperine) 5mg"],
                therapeutic_indications: ["Chronic stress & anxiety", "Physical & mental fatigue", "Low stamina & endurance", "Weakened immunity", "Low testosterone in men"],
                dosage_administration: "1–2 capsules twice daily after meals with warm milk or water",
                contraindications: "Pregnancy, autoimmune disorders, hyperthyroidism (consult doctor)",
                stock_quantity: 150
            },
            {
                name: "Triphala Churna", sku: "AYP-PRD-002", brand: "Ayurveda Platform", category: "Digestive / Detox",
                form: "Herbal Powder (Churna)", quantity_size: "200g", mrp: 299, price: 239, gst_percent: 5, hsn_code: "12119099",
                shelf_life: "36 months", storage_instructions: "Store in airtight container in cool, dry place",
                certifications: "AYUSH, FSSAI, ISO 9001:2015", origin: "India – classical 3-fruit combination",
                target_audience: "All adults, especially those with digestive issues",
                tags: ["Digestive", "Detox", "Constipation", "Gut health", "Antioxidant"],
                description: "Classical Triphala formulation made from equal proportions of three certified organic fruits — Amalaki, Bibhitaki, and Haritaki. Processed as per Ayurvedic Pharmacopoeia of India (API) standards. Rich in antioxidants and polyphenols.",
                key_ingredients: ["Amalaki (Emblica officinalis) – 33.3%", "Bibhitaki (Terminalia bellirica) – 33.3%", "Haritaki (Terminalia chebula) – 33.3%"],
                therapeutic_indications: ["Chronic constipation", "Digestive sluggishness", "Detoxification", "Eye health support", "Immunity enhancement"],
                dosage_administration: "5g (1 tsp) with warm water at bedtime; or as directed by Vaidya",
                contraindications: "Diarrhoea, dysentery, pregnancy (in high doses), iron deficiency anaemia",
                stock_quantity: 200
            },
            {
                name: "Brahmi Syrup", sku: "AYP-PRD-003", brand: "Ayurveda Platform", category: "Medhya Rasayana / Nootropic",
                form: "Herbal Syrup", quantity_size: "200ml", mrp: 349, price: 299, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "18 months", storage_instructions: "Store below 25°C. Refrigerate after opening. Use within 4 weeks of opening.",
                certifications: "AYUSH, FSSAI, ISO 22000", origin: "Kerala – traditional Brahmi cultivation regions",
                target_audience: "Students, elderly, working professionals, children 6+",
                tags: ["Brain health", "Memory", "Focus", "Nootropic", "Student health"],
                description: "Synergistic Medhya Rasayana formula combining four classical brain-boosting herbs. Brahmi and Shankhpushpi enhance acetylcholine levels; Jyotishmati improves neural conduction. Sugar-free variant available. Clinically studied ingredient ratios.",
                key_ingredients: ["Brahmi (Bacopa monnieri) extract 150mg/5ml", "Shankhpushpi extract 100mg/5ml", "Mandukaparni extract 50mg/5ml", "Jyotishmati oil 25mg/5ml"],
                therapeutic_indications: ["Poor memory & concentration", "Exam stress & mental fatigue", "ADHD support", "Anxiety & nervousness", "Learning disabilities (children)"],
                dosage_administration: "Adults: 15ml twice daily after meals. Children (6–12 yrs): 10ml once daily with warm milk",
                contraindications: "Not for children under 6 without medical supervision. Caution in hypothyroidism.",
                stock_quantity: 120
            },
            {
                name: "Chyawanprash (Classic)", sku: "AYP-PRD-004", brand: "Ayurveda Platform", category: "Rasayana / Immunity",
                form: "Herbal Jam (Avaleha)", quantity_size: "500g", mrp: 549, price: 449, gst_percent: 5, hsn_code: "21069099",
                shelf_life: "24 months", storage_instructions: "Store in cool, dry place. Do not refrigerate. Use clean dry spoon only.",
                certifications: "AYUSH, FSSAI, GMP, Organic India Certified", origin: "Made in Uttarakhand with Himalayan herb sourcing",
                target_audience: "All age groups from 5 years onwards",
                tags: ["Immunity", "Rasayana", "All-age", "Vitamin C", "Respiratory health"],
                description: "Premium Chyawanprash made with 49 herbs following the classical Charaka Samhita formula. Amalaki base provides 600mg Vitamin C per serving. Contains authentic Rajat Bhasma for enhanced bioavailability. No artificial colours, flavours or preservatives.",
                key_ingredients: ["Amalaki (Indian Gooseberry) – primary base", "Ashwagandha, Shatavari, Brahmi, Pippali", "49 classical herbs as per API", "Pure Desi Ghee & Honey", "Silver Bhasma (Rajat Bhasma) traces"],
                therapeutic_indications: ["Low immunity & recurrent infections", "Respiratory weakness", "Anti-aging & rejuvenation", "Children's growth & immunity", "Post-illness recovery"],
                dosage_administration: "Adults: 1–2 tsp twice daily. Children (5+): 1 tsp once daily. Best with warm milk.",
                contraindications: "Diabetes (use sugar-free variant), honey allergy",
                stock_quantity: 300
            },
            {
                name: "Neem Purifying Tablets", sku: "AYP-PRD-005", brand: "Ayurveda Platform", category: "Skin & Blood Purifier",
                form: "Compressed Herbal Tablets", quantity_size: "120 Tablets", mrp: 279, price: 229, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "24 months", storage_instructions: "Store in cool, dry place below 30°C",
                certifications: "AYUSH, GMP, FSSAI", origin: "Pan-India herb sourcing; manufactured in Karnataka",
                target_audience: "Adults with skin conditions, acne-prone individuals",
                tags: ["Skin health", "Acne", "Blood purifier", "Anti-bacterial", "Detox"],
                description: "Concentrated blood-purifying formula combining four of Ayurveda's most powerful skin-clearing herbs. Neem's antibacterial action combines with Haridra's anti-inflammatory properties, Manjishtha's lymphatic clearing, and Khadira's detoxifying effects for comprehensive skin health.",
                key_ingredients: ["Neem Leaf Extract 250mg", "Haridra (Turmeric) 100mg", "Manjishtha 100mg", "Khadira 50mg"],
                therapeutic_indications: ["Acne & pimples", "Blood purification", "Skin infections & boils", "Psoriasis support", "Chronic urticaria"],
                dosage_administration: "2 tablets twice daily after meals with water for 3–6 months",
                contraindications: "Pregnancy, trying to conceive (male), children under 12",
                stock_quantity: 180
            },
            {
                name: "Shatavari Granules", sku: "AYP-PRD-006", brand: "Ayurveda Platform", category: "Women's Health / Rasayana",
                form: "Granules (Shakarpara format)", quantity_size: "200g", mrp: 449, price: 369, gst_percent: 5, hsn_code: "12119099",
                shelf_life: "18 months", storage_instructions: "Store in airtight container in cool, dry place",
                certifications: "AYUSH, FSSAI, Organic Certified", origin: "Rajasthan & Madhya Pradesh Shatavari cultivation",
                target_audience: "Women 18–55 years, lactating mothers, PCOS patients",
                tags: ["Women's health", "Lactation", "PCOS", "Hormonal balance", "Fertility"],
                description: "Whole-spectrum Shatavari Rasayana in easy-to-consume granule form. Provides phytoestrogenic compounds (shatavarins) that support female hormonal balance naturally. Cardamom improves palatability and digestion. Recommended by Ayurvedic gynaecologists across India.",
                key_ingredients: ["Shatavari Root Extract 500mg/serving", "Organic Cane Sugar (carrier)", "Cardamom powder (flavour)", "Yashtimadhu 50mg/serving"],
                therapeutic_indications: ["Low breast milk production (lactation support)", "PCOS & hormonal imbalance", "Menstrual irregularity", "Female reproductive health", "Menopause symptom management"],
                dosage_administration: "10g (2 tsp) in warm milk twice daily. Increase to 3x daily during lactation.",
                contraindications: "Oestrogen-sensitive conditions (consult doctor), diabetes (monitor sugar intake)",
                stock_quantity: 140
            },
            {
                name: "Mahanarayan Tail (Oil)", sku: "AYP-PRD-007", brand: "Ayurveda Platform", category: "External Application / Vatavyadhi",
                form: "Medicated Sesame Oil", quantity_size: "100ml", mrp: 399, price: 329, gst_percent: 12, hsn_code: "33049900",
                shelf_life: "36 months", storage_instructions: "Store in cool, dry place away from heat sources",
                certifications: "AYUSH Drug License, GMP, API Compliant", origin: "Kerala (traditional preparation method)",
                target_audience: "Adults with musculoskeletal complaints, elderly, post-surgical patients",
                tags: ["Joint pain", "Massage oil", "Arthritis", "Vata disorders", "Muscle recovery"],
                description: "Classical Mahanarayan Tail prepared with over 50 medicinal herbs processed in pure sesame oil through authentic slow-cooking (Paka) method over 8+ hours. No synthetic additions. Sesame oil base enhances deep tissue penetration and warming effects for maximum therapeutic benefit.",
                key_ingredients: ["Narayan Churna (50 herbs) in Sesame Oil base", "Primary herbs: Ashwagandha, Shatavari, Bala, Dashmool", "Prepared with classical Paka method (>8 hrs processing)"],
                therapeutic_indications: ["Joint pain & stiffness", "Arthritis (all types)", "Muscle spasms & cramps", "Sports injuries & sprains", "Paralysis & neurological recovery"],
                dosage_administration: "Warm oil, apply to affected area with gentle massage. Leave for 30 mins then rinse. Or use under Abhyanga full body massage.",
                contraindications: "Open wounds, acute inflammation, skin infections, fever",
                stock_quantity: 250
            },
            {
                name: "Giloy (Guduchi) Juice", sku: "AYP-PRD-008", brand: "Ayurveda Platform", category: "Immunomodulator / Fever Management",
                form: "Fresh Plant Juice (Swaras)", quantity_size: "500ml", mrp: 249, price: 199, gst_percent: 5, hsn_code: "20098990",
                shelf_life: "6 months (unopened)", storage_instructions: "Refrigerate after opening. Use within 30 days. Shake well before use.",
                certifications: "FSSAI, ISO 22000, AYUSH", origin: "UP & Rajasthan (tree-grown Giloy preferred for potency)",
                target_audience: "Adults with low immunity, post-fever recovery, dengue patients",
                tags: ["Immunity", "Fever", "Anti-inflammatory", "Liver health", "COVID recovery"],
                description: "Cold-pressed fresh Giloy stem juice extracted within 4 hours of harvest to preserve maximum alkaloid content (berberine, tinosporine). Tree-grown Giloy used exclusively — proven 3x higher alkaloid content vs ground-grown. Clinically validated immunomodulatory effects.",
                key_ingredients: ["Giloy stem fresh juice – 99%", "Permitted preservative (Sodium Benzoate 0.1%)", "No added sugar, no artificial flavours"],
                therapeutic_indications: ["Low immunity & recurrent fever", "Dengue & malaria recovery support", "Chronic inflammation", "Liver detoxification", "COVID recovery support"],
                dosage_administration: "30ml diluted in equal water, twice daily on empty stomach",
                contraindications: "Autoimmune diseases, pregnancy, those on immunosuppressant drugs",
                stock_quantity: 100
            },
            {
                name: "Golden Milk Turmeric Mix", sku: "AYP-PRD-009", brand: "Ayurveda Platform", category: "Anti-inflammatory / Wellness",
                form: "Powder Blend", quantity_size: "150g", mrp: 349, price: 289, gst_percent: 5, hsn_code: "21039090",
                shelf_life: "18 months", storage_instructions: "Store in airtight container in cool, dry place",
                certifications: "FSSAI, USDA Organic Certified, Vegan Certified", origin: "Kerala & Tamil Nadu organic turmeric farms",
                target_audience: "All adults seeking daily anti-inflammatory wellness routine",
                tags: ["Anti-inflammatory", "Sleep", "Turmeric", "Golden milk", "Wellness daily"],
                description: "Bioavailability-optimised golden milk blend with 95% curcumin extract. Black pepper piperin increases curcumin absorption by 2000%. Ashwagandha adds adaptogenic benefits. Zero artificial sweeteners. Delicious natural coconut-cardamom flavour profile.",
                key_ingredients: ["Organic Haridra (Turmeric) – curcumin 95% extract 200mg/serving", "Ashwagandha 100mg/serving", "Ginger extract 75mg/serving", "Black Pepper (Bioperine) 5mg/serving", "Coconut milk powder, Cardamom, Cinnamon"],
                therapeutic_indications: ["Chronic inflammation", "Joint pain support", "Poor sleep quality", "Digestive comfort", "Antioxidant daily supplementation"],
                dosage_administration: "1–2 tsp in warm milk or plant milk at bedtime. Can add jaggery to taste.",
                contraindications: "Gallstones, bile duct obstruction; caution with blood thinners",
                stock_quantity: 220
            },
            {
                name: "Arjuna Heart Tonic Syrup", sku: "AYP-PRD-010", brand: "Ayurveda Platform", category: "Cardiac Health / Hridaya Rasayana",
                form: "Herbal Syrup", quantity_size: "200ml", mrp: 449, price: 379, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "18 months", storage_instructions: "Store below 25°C. Refrigerate after opening. Use within 30 days.",
                certifications: "AYUSH Drug License, GMP, Clinically Studied", origin: "Classical Hridaya Rasayana formula; manufactured in Gujarat",
                target_audience: "Adults with cardiac risk, hypertension patients, post-MI recovery",
                tags: ["Heart health", "Blood pressure", "Cardiac tonic", "Cholesterol", "Hridaya Rasayana"],
                description: "Clinically studied Arjuna heart tonic formulated based on research from renowned Ayurvedic cardiologists. Arjuna bark glycosides act as natural cardiac tonics. Studied in a 4-week trial showing 15% reduction in systolic BP. Each batch undergoes HPTLC fingerprinting for quality assurance.",
                key_ingredients: ["Arjuna Bark Extract 500mg/10ml", "Pushkarmool 200mg/10ml", "Punarnava 150mg/10ml", "Brahmi 100mg/10ml", "Honey & Stevia (sweetener)"],
                therapeutic_indications: ["Heart failure support (adjuvant)", "High blood pressure", "Angina & chest tightness", "Cardiac recovery post-MI", "Elevated cholesterol"],
                dosage_administration: "10–15ml with equal water twice daily after meals. Best with cardiologist consultation.",
                contraindications: "Not a replacement for cardiac medications. Use as adjuvant therapy only. Consult cardiologist.",
                stock_quantity: 90
            },
            {
                name: "Shilajit Resin (Pure)", sku: "AYP-PRD-011", brand: "Ayurveda Platform", category: "Rasayana / Vitality",
                form: "Purified Resin (Shodhita Shilajit)", quantity_size: "20g", mrp: 999, price: 799, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "36 months", storage_instructions: "Store below 25°C. Keep lid tightly closed. Do not freeze.",
                certifications: "Himalayan source verified, Heavy metal tested, Authenticity certified by AYUSH Lab", origin: "Himalayan altitude 3000–5000m, Uttarakhand & Himachal Pradesh",
                target_audience: "Men 25–60 years, athletes, elderly individuals with low vitality",
                tags: ["Vitality", "Testosterone", "Anti-aging", "Fulvic acid", "Men's health"],
                description: "Authentic Grade-A Himalayan Shilajit purified using traditional Shodhana method (sun-water purification). Contains 84 ionic minerals in naturally chelated form. Minimum 60% fulvic acid for maximum bioavailability. Lab tested for heavy metals (lead <1ppm, arsenic <0.5ppm).",
                key_ingredients: ["Himalayan Shilajit (purified) – 100%", "Fulvic acid content: min 60%", "Dibenzo-alpha-pyrones: min 5%", "No fillers, no capsule shell"],
                therapeutic_indications: ["Chronic fatigue & low vitality", "Male infertility & low testosterone", "Cognitive decline", "Iron-deficiency anaemia support", "Athletic performance enhancement"],
                dosage_administration: "Pea-sized amount (250–500mg) dissolved in warm milk or water once or twice daily",
                contraindications: "Gout (elevated uric acid), haemochromatosis, pregnancy, children under 18",
                stock_quantity: 300
            },
            {
                name: "Kumkumadi Tailam (Face Oil)", sku: "AYP-PRD-012", brand: "Ayurveda Platform", category: "Skin Care / Mukha Lepana",
                form: "Premium Herbal Face Oil", quantity_size: "30ml", mrp: 899, price: 749, gst_percent: 18, hsn_code: "33049900",
                shelf_life: "24 months", storage_instructions: "Store away from direct sunlight. Do not refrigerate. Keep bottle tightly capped.",
                certifications: "Dermatologist tested, AYUSH, Cruelty-free, No parabens", origin: "Kerala (authentic traditional preparation) – Saffron from Kashmir",
                target_audience: "Women 20–50 years seeking natural skin brightening & anti-aging",
                tags: ["Skin brightening", "Anti-aging", "Face oil", "Saffron", "Glow", "Hyperpigmentation"],
                description: "Authentic Kumkumadi Tailam following Ashtanga Hridayam formula with genuine Kashmir saffron. 21-herb formula processed in sesame oil and cow milk using traditional Manda Agni (low flame) method for 12+ hours. Saffron's crocin and crocetin deliver visible skin brightening in 4–8 weeks.",
                key_ingredients: ["Kumkuma (Saffron) 0.5% concentration", "Manjishtha, Yashtimadhu, Haridra, Laksha", "Sesame oil & Cow milk base", "21 classical herbs per API formulation"],
                therapeutic_indications: ["Hyperpigmentation & dark spots", "Uneven skin tone & dullness", "Fine lines & premature aging", "Acne scars & blemishes", "Dry & dehydrated skin"],
                dosage_administration: "2–3 drops on clean face, massage gently in circular motion at night before sleep. Use consistently for 8 weeks.",
                contraindications: "Saffron allergy, acute skin inflammation, active acne lesions (avoid direct application)",
                stock_quantity: 115
            },
            {
                name: "Triphala Ghee (Medicated)", sku: "AYP-PRD-013", brand: "Ayurveda Platform", category: "Sneha Kalpana / Eye & Digestive Health",
                form: "Medicated Ghee (Ghrita)", quantity_size: "100g", mrp: 649, price: 549, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "12 months", storage_instructions: "Store in cool, dry place. Lasts 12 months at room temperature.",
                certifications: "AYUSH, GMP, Made from certified A2 milk", origin: "Gujarat (A2 Gir cow ghee base) + classical herb processing",
                target_audience: "Adults for Panchakarma prep, eye care patients, chronic constipation",
                tags: ["Eye health", "Ghrita", "Digestive healing", "Panchakarma", "A2 ghee"],
                description: "Classical Triphala Ghrita made from A2 Desi Gir cow ghee as the base fat and Triphala decoction processed using traditional Ghrita Paka method. The fat-soluble compounds penetrate deeply into tissues. Particularly effective for ocular health when used as Netra Tarpana medium.",
                key_ingredients: ["Triphala decoction (Amalaki, Bibhitaki, Haritaki)", "Pure Cow Ghee (A2 Desi Gir cow)", "Processed with classical Ghrita Paka method"],
                therapeutic_indications: ["Eye strain & deteriorating vision", "Chronic constipation", "Gut healing & colon health", "Panchakarma Snehapana (pre-cleanse)"],
                dosage_administration: "5–10g daily on empty stomach in warm water (Snehapana). Or 5g with meals for eye/gut health.",
                contraindications: "High cholesterol, dyslipidemia (use cautiously), diarrhoea, obesity",
                stock_quantity: 80
            },
            {
                name: "Dashmool Kashayam", sku: "AYP-PRD-014", brand: "Ayurveda Platform", category: "Vatavyadhi / Anti-inflammatory",
                form: "Liquid Kashayam (Decoction)", quantity_size: "450ml", mrp: 329, price: 269, gst_percent: 5, hsn_code: "30049099",
                shelf_life: "12 months (unopened)", storage_instructions: "Refrigerate after opening. Use within 30 days. Shake well before use.",
                certifications: "AYUSH Drug License, Classical Formula, GMP", origin: "Classical Ayurvedic formulation; herbs sourced from Kerala & Tamil Nadu",
                target_audience: "Adults with musculoskeletal pain, postpartum women, elderly",
                tags: ["Vata disorders", "Back pain", "Post-delivery", "Arthritis", "Classical formula"],
                description: "Classical Dashmool Kashayam prepared from all 10 roots in exact proportion as specified in Ashtanga Hridayam. Traditional water decoction method concentrates the active saponins and terpenoids. Gold standard Vata disorder formula recommended by practitioners for 2000+ years.",
                key_ingredients: ["Bilwa, Agnimantha, Shyonaka, Patala, Gambhari (Brihat Panchamool)", "Shalaparni, Prishnaparni, Bringaraja, Shalvi, Kantakari (Laghu Panchamool)", "Total: 10 classical roots in water decoction"],
                therapeutic_indications: ["Low back pain & sciatica", "Joint stiffness & arthritis", "Post-delivery Vata imbalance", "Respiratory congestion", "Nerve pain & numbness"],
                dosage_administration: "15–30ml with equal warm water twice daily on empty stomach",
                contraindications: "Pregnancy (use only under medical supervision), severe kidney disease",
                stock_quantity: 130
            },
            {
                name: "Haritaki Powder", sku: "AYP-PRD-015", brand: "Ayurveda Platform", category: "Digestive / Tridosha Balancer",
                form: "Pure Herbal Powder", quantity_size: "100g", mrp: 199, price: 159, gst_percent: 5, hsn_code: "12119099",
                shelf_life: "24 months", storage_instructions: "Store in airtight container, cool dry place",
                certifications: "AYUSH, FSSAI, Organic Certified", origin: "Central India (Terminalia chebula forest collections)",
                target_audience: "Adults of all age groups; especially digestive health seekers",
                tags: ["Constipation", "Longevity", "Tridosha", "Digestive health", "Detox"],
                description: "Vijaya variety Haritaki — considered the king of medicinal plants in Ayurveda. Called 'Abhaya' (fearless) for its broad therapeutic range. 100% natural dry-milled powder. Contains chebulic acid, ellagic acid, and gallic acid. Tridoshahara — balances all three doshas simultaneously.",
                key_ingredients: ["Haritaki (Terminalia chebula) – 100% pure fruit powder", "Variety: Vijaya Haritaki (highest grade)", "No additives or fillers"],
                therapeutic_indications: ["Chronic constipation", "Indigestion & bloating", "Cognitive enhancement", "Eye health", "Anti-aging & longevity"],
                dosage_administration: "3–5g with warm water at bedtime. Or with ghee (Kapha/digestive), rock salt (Vata), jaggery (Pitta).",
                contraindications: "Pregnancy, severe dehydration, active diarrhoea",
                stock_quantity: 400
            },
            {
                name: "Punarnava Capsules", sku: "AYP-PRD-016", brand: "Ayurveda Platform", category: "Kidney & Liver / Mutravaha Srotas",
                form: "Vegetarian Capsules", quantity_size: "60 Capsules", mrp: 399, price: 329, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "24 months", storage_instructions: "Store in cool, dry place below 30°C",
                certifications: "AYUSH, GMP, FSSAI, Vegan", origin: "Pan-India; Punarnava sourced from Rajasthan & Gujarat",
                target_audience: "Adults with kidney/urinary issues, oedema patients, hepatitis recovery",
                tags: ["Kidney health", "Liver", "Oedema", "UTI", "Diuretic", "Hepatitis"],
                description: "Targeted renal and hepatic support using the classical combination of Punarnava (the rejuvenating herb), Gokshura (diuretic and stone-breaker), and Varuna (anti-urolithiatic). Punarvine alkaloid content standardised to 0.5% for consistent therapeutic effect.",
                key_ingredients: ["Punarnava root extract 400mg", "Gokshura 100mg", "Varuna 100mg", "Silicon Dioxide (anti-caking) 5mg"],
                therapeutic_indications: ["Water retention & oedema", "Kidney stone prevention", "UTI & urinary complaints", "Liver health & hepatitis support", "Anaemia support"],
                dosage_administration: "1–2 capsules twice daily with water after meals. Drink at least 2L water daily during use.",
                contraindications: "Acute kidney failure, pregnancy, diuretic medications (consult doctor)",
                stock_quantity: 170
            },
            {
                name: "Bala Taila (Body Massage Oil)", sku: "AYP-PRD-017", brand: "Ayurveda Platform", category: "Pediatric / Bala Chikitsa & Sports",
                form: "Medicated Sesame Oil", quantity_size: "200ml", mrp: 349, price: 289, gst_percent: 12, hsn_code: "33049900",
                shelf_life: "36 months", storage_instructions: "Store below 30°C, away from direct sunlight",
                certifications: "AYUSH Drug License, GMP, Pediatric Safe", origin: "Kerala (classical processing method)",
                target_audience: "Infants & children, athletes, elderly with muscle weakness, paralysis patients",
                tags: ["Muscle strength", "Massage oil", "Children", "Sports recovery", "Abhyanga"],
                description: "Bala Taila is the premier Ayurvedic strength-building oil used from infancy to old age. Sida cordifolia root provides ephedrine-related alkaloids that strengthen neuromuscular function. Daily use builds muscle tone, improves circulation, and provides exceptional skin nourishment.",
                key_ingredients: ["Bala (Sida cordifolia) root – primary herb", "Ashwagandha, Shatavari, Dashmool", "Sesame oil & cow milk base", "Camphor 0.2% (fragrance & penetration)"],
                therapeutic_indications: ["Muscle weakness & underdevelopment (children)", "Sports muscle recovery", "Vata imbalance disorders", "Limb weakness & paralysis recovery", "Daily Abhyanga for strength"],
                dosage_administration: "Warm oil, apply to body and massage for 15–20 mins. Leave 30 mins then bathe. Children: use post-bath.",
                contraindications: "Fever, acute skin infection, open wounds",
                stock_quantity: 210
            },
            {
                name: "Yashtimadhu Syrup", sku: "AYP-PRD-018", brand: "Ayurveda Platform", category: "Respiratory / Throat Care",
                form: "Herbal Syrup", quantity_size: "200ml", mrp: 299, price: 249, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "18 months", storage_instructions: "Store below 25°C. Refrigerate after opening.",
                certifications: "AYUSH, FSSAI, Sugar-free variant available", origin: "Classical formula; Yashtimadhu sourced from Afghanistan & Rajasthan",
                target_audience: "Adults and children with respiratory or gastric complaints",
                tags: ["Cough", "Throat", "Respiratory", "Ulcer", "GERD", "Bronchitis"],
                description: "Dual-action syrup addressing both respiratory and gastric systems through Yashtimadhu's unique glycyrrhizin content. Provides demulcent coating for throat and gastric mucosa while anti-inflammatory compounds reduce bronchial spasm. DGL (deglycyrrhizinated) liquorice extract used to avoid blood pressure concerns.",
                key_ingredients: ["Yashtimadhu (Glycyrrhiza glabra) extract 500mg/10ml", "Tulsi extract 200mg/10ml", "Vasa (Adhatoda vasica) 150mg/10ml", "Pippali 50mg/10ml", "Honey & Stevia (natural sweeteners)"],
                therapeutic_indications: ["Chronic cough & bronchitis", "Sore throat & laryngitis", "Asthma supportive therapy", "Acidity & gastric ulcer", "Acid reflux (GERD)"],
                dosage_administration: "10–15ml thrice daily after meals. For ulcers: 10ml on empty stomach. Children 6+: 5ml twice daily",
                contraindications: "Hypertension (high doses), oedema, hypokalemia, pregnancy (high doses)",
                stock_quantity: 260
            },
            {
                name: "Saraswatarishta Tonic", sku: "AYP-PRD-019", brand: "Ayurveda Platform", category: "Brain Tonic / Nervous System",
                form: "Classical Fermented Tonic (Arishta)", quantity_size: "450ml", mrp: 379, price: 299, gst_percent: 5, hsn_code: "30049099",
                shelf_life: "60 months (improves with age like wine)", storage_instructions: "Store in cool, dry place. Do not refrigerate. Shake well before use.",
                certifications: "AYUSH Drug License, Classical API Formula, GMP", origin: "Classical Charaka Samhita formula; pan-India herb sourcing",
                target_audience: "Adults with neurological, psychiatric or cognitive conditions",
                tags: ["Brain tonic", "Memory", "Speech", "Epilepsy", "Anxiety", "Classical Arishta"],
                description: "Classical Saraswatarishta fermented with authentic Madhuka flowers creating a natural probiotic-active tonic. 24 herbs work synergistically on the central nervous system. Brahmi as the primary Medhya herb enhances cognitive processing. Vacha (Acorus calamus) specifically addresses speech and neuromotor coordination.",
                key_ingredients: ["Brahmi, Shatavari, Ashwagandha – primary herbs", "Vidari, Haritaki, Vacha, Kushtha, Shatapushpa", "Self-generated 5–8% alcohol from natural fermentation", "24 classical herbs as per API"],
                therapeutic_indications: ["Poor memory & intellectual capacity", "Speech disorders & stammering", "Epilepsy support", "Schizophrenia supportive therapy", "Chronic anxiety & depression"],
                dosage_administration: "15–20ml with equal water twice daily after meals",
                contraindications: "Alcohol-sensitive individuals, liver disease, not for children under 12",
                stock_quantity: 110
            },
            {
                name: "Kanchanar Guggulu Tablets", sku: "AYP-PRD-020", brand: "Ayurveda Platform", category: "Thyroid / Lymphatic / Tumour Management",
                form: "Classical Guggulu Tablets", quantity_size: "120 Tablets", mrp: 449, price: 369, gst_percent: 12, hsn_code: "30049099",
                shelf_life: "24 months", storage_instructions: "Store in cool, dry place below 30°C",
                certifications: "AYUSH Drug License, GMP, Classical Formula", origin: "Classical Sharangdhara Samhita formula; manufactured in Rajasthan",
                target_audience: "Hypothyroid patients, fibroid/cyst patients, lymph disorder patients",
                tags: ["Thyroid", "Hypothyroid", "Lymph nodes", "Fibroids", "PCOS", "Guggulu"],
                description: "Kanchanar Guggulu is Ayurveda's most prescribed formula for thyroid dysfunction and lymphatic disorders. Kanchanar bark directly acts on thyroid tissue while Shuddha Guggulu (purified Commiphora mukul) activates the lymphatic system for clearance of abnormal tissue accumulations. Trikatu ensures bioavailability of all compounds.",
                key_ingredients: ["Kanchanar (Bauhinia variegata) bark 200mg", "Shuddha Guggulu 200mg", "Triphala 100mg", "Trikatu (Ginger, Black Pepper, Pippali) 100mg", "Varuna 50mg"],
                therapeutic_indications: ["Hypothyroidism (adjuvant)", "Lymph node enlargement", "Lipoma & non-malignant growths", "Uterine fibroids & PCOS", "Goitre"],
                dosage_administration: "2 tablets twice daily after meals with warm water for 3–6 months minimum",
                contraindications: "Pregnancy, hyperthyroidism, patients on thyroxine (monitor TSH closely)",
                stock_quantity: 190
            }
        ];

        let seededCount = 0;

        for (const product of productsToSeed) {
            // Check if product already exists via SKU
            const checkQuery = `SELECT id FROM Products WHERE sku = $1`;
            const existingProduct = await db.query(checkQuery, [product.sku]);

            if (existingProduct.rows.length === 0) {
                await EcommerceModel.createProduct(product);
                seededCount++;
            }
        }

        res.status(200).json({
            success: true,
            message: `Product catalogue seeding completed successfully. Added ${seededCount} new products.`,
            total_processed: productsToSeed.length
        });

    } catch (error) {
        console.error('Error in seedProducts:', error);
        res.status(500).json({ success: false, message: 'Server error during product seeding', error: error.message });
    }
};
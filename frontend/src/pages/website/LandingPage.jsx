import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Search, ArrowRight, CalendarCheck, Stethoscope,
  Pill, Clock, ShieldCheck, Star, Award, Heart
} from 'lucide-react';
import { websiteBlogs } from '../../data/websiteBlogs'; // <-- IMPORTED REAL DATA

// --- DUMMY DATA ---
const PRODUCTS = [
  { name: 'Kumkumadi Oil', desc: 'Radiance Elixir', price: '₹1,200', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400' },
  { name: 'Neem Cleanser', desc: 'Purifying Wash', price: '₹450', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400' },
  { name: 'Amla Mist', desc: 'Refreshing Toner', price: '₹380', img: 'https://images.unsplash.com/photo-1615397323209-b18fc2af1a81?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sandalwood Scrub', desc: 'Exfoliating Paste', price: '₹850', img: 'https://images.unsplash.com/photo-1590156546946-cb55b0a1d48c?auto=format&fit=crop&q=80&w=400' },
];

const EXPERTS = [
  { name: 'Dr. Amit Sharma', spec: 'General Medicine', exp: '15 Yrs Exp', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
  { name: 'Dr. Meera Nair', spec: 'Panchakarma', exp: '12 Yrs Exp', img: 'https://images.unsplash.com/photo-1594824416965-4f51e06d2036?auto=format&fit=crop&q=80&w=200' },
  { name: 'Dr. Priya Varma', spec: 'Yoga Therapy', exp: '8 Yrs Exp', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' },
];

// --- SECTIONS ---

const Navbar = ({ isLoggedIn = false, userRole = 'patient' }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (userRole === 'admin') navigate('/admin/dashboard');
    else if (userRole === 'doctor') navigate('/doctor/dashboard');
    else navigate('/patient/dashboard');
  };

  return (
    <nav className="flex items-center justify-between py-6 px-8 md:px-16 max-w-[1600px] mx-auto w-full gap-6">
      <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#3A6447] tracking-tight shrink-0">
        <Leaf size={28} /> AyurCare360
      </Link>

      <div className="hidden md:block relative w-full max-w-2xl mx-4">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search wellness topics, doctors, or products..."
          className="w-full bg-white border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-6 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm transition-all"
        />
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {isLoggedIn ? (
          <button onClick={handleDashboardClick} className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm">
            Go to Dashboard
          </button>
        ) : (
          <Link to="/login" className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm">
            Login / SignUp
          </Link>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section className="px-8 md:px-16 py-12 md:py-20 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
        Modern Healthcare <br /> Rooted in <span className="text-[#3A6447]">Ayurveda</span>
      </h1>
      <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed mb-10 max-w-xl">
        Experience personalized healing based on your unique Dosha. Our modern apothecary brings ancient wisdom to your doorstep.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 px-10 rounded-full flex items-center gap-2 transition-colors shadow-sm">
          Book Consult <ArrowRight size={18} />
        </button>
        <button className="bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 font-bold py-4 px-10 rounded-full transition-colors shadow-sm">
          Explore Herbs
        </button>
      </div>
    </div>
    <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
      <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200" alt="Ayurvedic herbs and oils" className="w-full h-full object-cover" />
    </div>
  </section>
);

const RevealGlowSection = () => (
  <section className="px-8 md:px-16 py-16 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[40px] my-10 border border-[#EFEBE1]">
    <div className="h-[400px] rounded-[32px] overflow-hidden">
      <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" alt="Skincare bottles" className="w-full h-full object-cover" />
    </div>
    <div className="lg:pl-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Reveal Your Natural Glow</h2>
      <p className="text-lg font-medium text-gray-600 leading-relaxed mb-8">
        Unlock the secrets of timeless beauty with our curated range of Ayurvedic skincare, formulated with pure, potent botanicals.
      </p>
      <button className="bg-white border-2 border-[#3A6447] text-[#3A6447] hover:bg-[#FDF9EE] font-bold py-3.5 px-8 rounded-full transition-colors">
        Shop Skincare
      </button>
    </div>
  </section>
);

const ProductsSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-12">Natural Skin Care Essentials</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
      {PRODUCTS.map((prod, idx) => (
        <div key={idx} className="bg-white rounded-[32px] p-6 border border-[#EFEBE1] shadow-sm hover:shadow-md transition-shadow group">
          <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-[#FAF7F2]">
            <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{prod.desc}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{prod.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-[#3A6447]">{prod.price}</span>
            <button className="bg-[#FAF7F2] hover:bg-[#3A6447] hover:text-white text-[#3A6447] font-bold py-2 px-6 rounded-full transition-colors text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-12 bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 px-10 rounded-full transition-colors shadow-sm">
      View All Products
    </button>
  </section>
);

const ServicesSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-12">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-[32px] p-10 border border-[#EFEBE1] shadow-sm flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#E7F3EB] text-[#3A6447] flex items-center justify-center mb-6"><Stethoscope size={32} /></div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Consult a Doctor</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Connect with certified Ayurvedic practitioners for personalized healing plans.</p>
      </div>
      <div className="bg-white rounded-[32px] p-10 border border-[#EFEBE1] shadow-sm flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#FDF1E8] text-[#D9774B] flex items-center justify-center mb-6"><CalendarCheck size={32} /></div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Get a Prescription</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Receive custom dosha-balancing prescriptions directly to your portal.</p>
      </div>
      <div className="bg-white rounded-[32px] p-10 border border-[#EFEBE1] shadow-sm flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center mb-6"><Pill size={32} /></div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Order Medication</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Purchase prescribed herbs and natural supplements from our apothecary.</p>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto text-center bg-white rounded-[40px] border border-[#EFEBE1] my-10">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-16">How it Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
      {/* Decorative dashed line hidden on mobile */}
      <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#EFEBE1] z-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#3A6447] text-white flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-sm">1</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Book Appointment</h3>
        <p className="text-sm font-medium text-gray-500">Choose a time that works for you.</p>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#D9774B] text-white flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-sm">2</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Consultation</h3>
        <p className="text-sm font-medium text-gray-500">Meet with your doctor via secure video.</p>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#D49A44] text-white flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-sm">3</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Get Prescription</h3>
        <p className="text-sm font-medium text-gray-500">Receive your custom wellness plan.</p>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#9333EA] text-white flex items-center justify-center text-xl font-bold mb-6 border-4 border-white shadow-sm">4</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Pharmacy</h3>
        <p className="text-sm font-medium text-gray-500">Medicines delivered to your door.</p>
      </div>
    </div>
  </section>
);

// --- UPDATED BLOGS SECTION ---
const BlogsSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-12 text-center">Health & Wellness Blog</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      {/* Slicing to show the latest blogs, mapping over the real data from websiteBlogs.js */}
      {websiteBlogs.slice(0, 3).map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} className="bg-white rounded-[32px] border border-[#EFEBE1] shadow-sm overflow-hidden group cursor-pointer block">
          <div className="h-48 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{blog.category}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-6 line-clamp-2">{blog.title}</h3>
            <button className="text-sm font-bold text-[#3A6447] flex items-center gap-2 group-hover:gap-3 transition-all">
              Read Article <ArrowRight size={16} />
            </button>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const ExpertsSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-12">Consult Our Experts</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {EXPERTS.map((doc, idx) => (
        <div key={idx} className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col items-center text-center">
          <img src={doc.img} alt={doc.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#FDF9EE] shadow-sm mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
          <p className="text-[11px] font-bold text-[#3A6447] uppercase tracking-widest mb-2">{doc.spec}</p>
          <p className="text-sm font-medium text-gray-500 mb-6">{doc.exp}</p>
          <button className="w-full bg-[#FAF7F2] hover:bg-[#3A6447] hover:text-white text-[#3A6447] font-bold py-3.5 rounded-full transition-colors text-sm">
            Consult Now
          </button>
        </div>
      ))}
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="px-8 md:px-16 py-20 max-w-[1600px] mx-auto text-center border-t border-[#EFEBE1] mt-10">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-16">Why Choose Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
      <div className="pl-6 border-l-4 border-[#3A6447]">
        <Leaf className="text-[#3A6447] mb-4" size={28} />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Authentic Ayurveda</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Rooted in 5000-year-old texts, delivering genuine healing protocols.</p>
      </div>
      <div className="pl-6 border-l-4 border-[#D9774B]">
        <Star className="text-[#D9774B] mb-4" size={28} />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Practitioners</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Certified doctors with decades of clinical experience.</p>
      </div>
      <div className="pl-6 border-l-4 border-[#D49A44]">
        <ShieldCheck className="text-[#D49A44] mb-4" size={28} />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Quality</h3>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">Strict quality control on all apothecary products.</p>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="px-8 md:px-16 py-20 mt-10 max-w-[1600px] mx-auto">
    <div className="bg-[#EFEBE1] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-8">Start Your Healing Journey Today</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 px-10 rounded-full transition-colors shadow-sm text-sm">
            Book Appointment
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-10 rounded-full transition-colors shadow-sm text-sm border border-transparent">
            Explore Apothecary
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#3A6447] py-16 px-8 text-white mt-auto">
    <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight mb-6">
          <Leaf size={28} /> AyurCare360
        </div>
        <p className="text-sm font-medium text-white/80 leading-relaxed max-w-sm">
          Delivering the timeless wisdom of Ayurveda into the modern world through expert consultations and pure herbal formulations.
        </p>
      </div>
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-6">Quick Links</h4>
        <div className="flex flex-col gap-4 text-sm font-medium text-white/90">
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/help" className="hover:text-white transition-colors">Help Desk</Link>
          <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-6">Legal</h4>
        <div className="flex flex-col gap-4 text-sm font-medium text-white/90">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </div>
    <div className="max-w-[1600px] mx-auto pt-8 border-t border-white/20 text-center text-xs font-medium text-white/60">
      &copy; {new Date().getFullYear()} AyurCare360. All rights reserved.
    </div>
  </footer>
);

// --- MAIN PAGE COMPONENT ---
const LandingPage = ({ isLoggedIn = false, userRole = 'patient' }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
      <HeroSection />
      <RevealGlowSection />
      <ProductsSection />
      <ServicesSection />
      <HowItWorksSection />
      <ExpertsSection />
      <BlogsSection />
      <WhyChooseUsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
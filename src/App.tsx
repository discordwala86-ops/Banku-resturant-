/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight, 
  Star, 
  Menu as MenuIcon, 
  X,
  ChefHat,
  Heart,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Chinese' | 'North Indian' | 'Snacks';
  image: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
}

// --- Mock Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Paneer Butter Masala", description: "Creamy tomato gravy with soft paneer cubes.", price: 320, category: 'North Indian', image: "https://picsum.photos/seed/paneer/400/300" },
  { id: 2, name: "Veg Manchurian", description: "Deep-fried veg balls in spicy soya sauce.", price: 240, category: 'Chinese', image: "https://picsum.photos/seed/manchurian/400/300" },
  { id: 3, name: "Dal Makhani", description: "Slow-cooked black lentils with butter and cream.", price: 280, category: 'North Indian', image: "https://picsum.photos/seed/dal/400/300" },
  { id: 4, name: "Hakka Noodles", description: "Stir-fried noodles with crunchy vegetables.", price: 220, category: 'Chinese', image: "https://picsum.photos/seed/noodles/400/300" },
  { id: 5, name: "Crispy Corn", description: "Sweet corn kernels fried to perfection with spices.", price: 180, category: 'Snacks', image: "https://picsum.photos/seed/corn/400/300" },
  { id: 6, name: "Butter Naan", description: "Soft leavened bread topped with butter.", price: 60, category: 'North Indian', image: "https://picsum.photos/seed/naan/400/300" },
  { id: 7, name: "Spring Rolls", description: "Crispy rolls stuffed with seasoned vegetables.", price: 200, category: 'Chinese', image: "https://picsum.photos/seed/springroll/400/300" },
  { id: 8, name: "Malai Kofta", description: "Potato and paneer balls in a rich cashew gravy.", price: 340, category: 'North Indian', image: "https://picsum.photos/seed/kofta/400/300" },
];

const REVIEWS: Review[] = [
  { id: 1, name: "Rahul Sharma", rating: 5, comment: "Best North Indian food in town! The Dal Makhani is to die for.", image: "https://i.pravatar.cc/150?u=rahul" },
  { id: 2, name: "Priya Gupta", rating: 4, comment: "Love the Chinese starters. Very hygienic and great service.", image: "https://i.pravatar.cc/150?u=priya" },
  { id: 3, name: "Amit Verma", rating: 5, comment: "Banku ki Rasoi really feels like home. Pure veg and delicious.", image: "https://i.pravatar.cc/150?u=amit" },
];

const GALLERY_IMAGES = [
  "https://picsum.photos/seed/food1/800/600",
  "https://picsum.photos/seed/interior1/800/600",
  "https://picsum.photos/seed/food2/800/600",
  "https://picsum.photos/seed/interior2/800/600",
  "https://picsum.photos/seed/food3/800/600",
  "https://picsum.photos/seed/interior3/800/600",
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Utensils className="text-amber-500 w-8 h-8" />
          <span className="text-2xl font-bold tracking-tighter text-white">BANKU KI <span className="text-amber-500">RASOI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
            ORDER NOW
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 py-6 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-amber-500"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-amber-500 text-zinc-950 px-6 py-3 rounded-full font-bold w-full">
                ORDER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
          alt="Restaurant Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-amber-500/30">
            Pure Veg Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            Taste that feels <br /> <span className="text-amber-500 italic font-serif">like home</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the finest Chinese and North Indian delicacies crafted with love, hygiene, and authentic flavors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#menu" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-zinc-950 px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
              View Menu <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="w-full sm:w-auto border border-zinc-700 hover:border-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
              Book a Table
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 hidden lg:flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 shadow-2xl"
      >
        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
          <Clock className="text-zinc-950 w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Status</p>
          <p className="text-white font-bold">Open 24 Hours</p>
        </div>
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Chinese' | 'North Indian' | 'Snacks'>('All');

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">Our Specialties</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Our <span className="text-amber-500">Menu</span></h3>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['All', 'Chinese', 'North Indian', 'Snacks'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-8 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-amber-500 border-amber-500 text-zinc-950' 
                    : 'border-zinc-800 text-zinc-400 hover:border-amber-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-amber-500/30 transition-all shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-500 text-xs font-bold">
                    ₹{item.price}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">{item.category}</p>
                  <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                  <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{item.description}</p>
                  <button className="w-full py-2 rounded-xl border border-zinc-800 text-zinc-400 group-hover:bg-amber-500 group-hover:text-zinc-950 group-hover:border-amber-500 transition-all text-sm font-bold">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 mb-6 italic">Hungry? Order directly from your favorite apps</p>
          <div className="flex justify-center gap-6">
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl hover:border-amber-500 transition-all">
              <span className="text-white font-bold">Zomato</span>
              <ExternalLink className="w-4 h-4 text-zinc-500" />
            </button>
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl hover:border-amber-500 transition-all">
              <span className="text-white font-bold">Swiggy</span>
              <ExternalLink className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600" 
              alt="Chef" 
              className="rounded-3xl w-full h-64 object-cover mt-12"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" 
              alt="Restaurant Interior" 
              className="rounded-3xl w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500 rounded-full flex flex-col items-center justify-center text-zinc-950 shadow-2xl border-8 border-zinc-900">
            <span className="text-3xl font-black">10+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Years</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">Our Story</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Homemade Taste, <br /> <span className="text-amber-500">Pure Veg</span> Heart</h3>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            At Banku ki Rasoi, we believe that food is more than just a meal—it's an emotion. Started as a small family kitchen, our mission has always been to serve authentic, pure vegetarian flavors that remind you of home.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <ChefHat className="text-amber-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Expert Chefs</h4>
                <p className="text-zinc-500 text-sm">Masters of North Indian & Chinese cuisine.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <ShieldCheck className="text-amber-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Hygiene First</h4>
                <p className="text-zinc-500 text-sm">Strict quality standards in every dish.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <Heart className="text-amber-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Pure Veg</h4>
                <p className="text-zinc-500 text-sm">100% vegetarian kitchen environment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl">
                <Clock className="text-amber-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Open 24/7</h4>
                <p className="text-zinc-500 text-sm">Satisfying your cravings any time.</p>
              </div>
            </div>
          </div>

          <button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-amber-500/20">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">Visual Feast</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Our <span className="text-amber-500">Gallery</span></h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={idx} 
              className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer border border-zinc-800"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-10 h-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our <span className="text-amber-500">Guests Say</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 relative">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-400 mb-8 italic">"{review.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-amber-500/30" />
                <div>
                  <h5 className="text-white font-bold">{review.name}</h5>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Happy Customer</p>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-zinc-800">
                <Utensils className="w-12 h-12 opacity-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Visit <span className="text-amber-500">Us</span></h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shrink-0">
                  <MapPin className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lg">Location</h4>
                  <p className="text-zinc-400">123 Foodie Street, Sector 45, <br />New Delhi, India - 110001</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shrink-0">
                  <Phone className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lg">Phone</h4>
                  <p className="text-zinc-400">+91 98765 43210</p>
                  <p className="text-zinc-400">+91 11 2345 6789</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shrink-0">
                  <Clock className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-lg">Working Hours</h4>
                  <p className="text-zinc-400">Open 24 Hours</p>
                  <p className="text-amber-500 text-sm font-bold mt-1">Serving you day & night!</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 hover:border-amber-500 transition-all text-zinc-400 hover:text-amber-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 hover:border-amber-500 transition-all text-zinc-400 hover:text-amber-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 hover:border-amber-500 transition-all text-zinc-400 hover:text-amber-500">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-6">Send a Message</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all" />
                <input type="email" placeholder="Your Email" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all" />
              </div>
              <input type="text" placeholder="Subject" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all" />
              <textarea placeholder="Your Message" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all resize-none"></textarea>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 h-96 w-full bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 relative">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-700 flex-col">
            <MapPin className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest opacity-20">Google Maps Integration</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789!2d77.123456789!3d28.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzM0LjUiTiA3N8KwMDcnMzQuNSJF!5e0!3m2!1sen!2sin!4v1234567890" 
            className="w-full h-full border-0 grayscale invert contrast-125 opacity-50"
            allowFullScreen={true} 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-2">
          <Utensils className="text-amber-500 w-6 h-6" />
          <span className="text-xl font-bold tracking-tighter text-white uppercase">BANKU KI <span className="text-amber-500">RASOI</span></span>
        </div>
        
        <p className="text-zinc-600 text-sm">
          © 2026 Banku ki Rasoi. All rights reserved. Designed with ❤️ for foodies.
        </p>

        <div className="flex gap-8">
          <a href="#" className="text-zinc-600 hover:text-white text-xs uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-zinc-600 hover:text-white text-xs uppercase tracking-widest transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen font-sans selection:bg-amber-500 selection:text-zinc-950">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

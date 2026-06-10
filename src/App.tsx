import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Smartphone, 
  Sparkles, 
  Compass, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  Users,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  Clock,
  Moon,
  Sun,
  Map,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Lock,
  Hammer,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('all');
  const [customTripModalOpen, setCustomTripModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Custom Trip Form States
  const [tripForm, setTripForm] = useState({
    name: '',
    email: '',
    phone: '',
    duration: '7_days',
    style: 'cultural',
    destinations: [] as string[]
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleDestinationToggle = (dest: string) => {
    setTripForm(prev => {
      const exists = prev.destinations.includes(dest);
      if (exists) {
        return { ...prev, destinations: prev.destinations.filter(d => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripForm.name || !tripForm.email || !tripForm.phone) {
      alert("Please fill in all contact fields.");
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setCustomTripModalOpen(false);
      setTripForm({
        name: '',
        email: '',
        phone: '',
        duration: '7_days',
        style: 'cultural',
        destinations: []
      });
    }, 3000);
  };

  const AuthenticGraphic = () => (
    <div className="relative w-full max-w-[420px] aspect-[4/5] perspective-1000 group mx-auto">
      <motion.div 
        animate={{ 
          rotateY: mousePos.x * 0.4,
          rotateX: -mousePos.y * 0.4,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="w-full h-full relative preserve-3d rounded-[2.5rem] p-4 bg-muted/40 border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between"
      >
        {/* Soft Golden Glow Accent */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Header Label */}
        <div className="relative z-10 flex justify-between items-center px-4 pt-4 border-b border-white/[0.04] pb-4 font-mono">
          <div className="flex flex-col text-left">
            <span className="text-[7px] uppercase font-black tracking-[0.4em] text-accent">Cultural Artifact</span>
            <span className="text-[8px] text-paper/40 font-bold">NO. 0087-A</span>
          </div>
          <div className="text-right text-[7px] leading-tight text-white/40 uppercase tracking-widest font-bold">
            FAYOUM & SIWA CO-ORDINATES<br />
            29.3094° N, 30.8418° E
          </div>
        </div>

        {/* The Authentic Generated Graphic Image Frame */}
        <div className="relative flex-1 my-4 rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
          <img 
            src="/src/assets/images/egypt_soul_heritage_1781088779835.png" 
            alt="Authentic Egyptian Pottery & Nile Heritage Art" 
            className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
          
          {/* Embedded Golden Seal */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 backdrop-blur-md border border-accent/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
            <div className="text-left font-serif leading-none">
              <span className="text-[9px] font-bold text-paper block">Vetted Lineage</span>
              <span className="text-[7px] tracking-widest text-[#b8975e] uppercase">Authentic & Pure</span>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Ledger */}
        <div className="relative z-10 grid grid-cols-2 gap-4 px-4 pb-4 pt-2 border-t border-white/[0.04]">
          <div className="text-left space-y-1">
            <span className="text-[7.5px] uppercase font-black tracking-widest text-accent/60 block font-mono">Artisanal Sourcing</span>
            <p className="text-[10px] text-paper/70 font-serif leading-normal">
              Directly supporting 80+ families of ancestral lineage.
            </p>
          </div>
          <div className="text-left space-y-1">
            <span className="text-[7.5px] uppercase font-black tracking-widest text-accent/60 block font-mono">Zero Middlemen</span>
            <p className="text-[10px] text-paper/70 font-serif leading-normal">
              Fair commerce policies back every single stay & product.
            </p>
          </div>
        </div>

        {/* Elegant geometric line overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-accent" />
          <line x1="5%" y1="5%" x2="95%" y2="95%" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
        </svg>

      </motion.div>

      {/* Floating physical elements to create interactive depth */}
      <motion.div 
        animate={{ 
          y: mousePos.y * -2 + 10,
          x: mousePos.x * -2,
          rotateZ: -mousePos.x * 0.4 + 10
        }}
        whileHover={{ scale: 1.1, rotateZ: 0 }}
        className="absolute -left-10 top-1/3 w-14 h-14 bg-muted border border-accent/20 rounded-xl shadow-2xl flex flex-col items-center justify-center backdrop-blur-xl cursor-default pointer-events-auto z-25 text-center px-1"
      >
        <Compass className="text-accent w-5 h-5 animate-spin-slow mb-0.5" />
        <span className="text-[5px] uppercase tracking-widest font-mono text-paper/40">ORIENTATION</span>
      </motion.div>

      <motion.div 
        animate={{ 
          y: mousePos.y * 3 - 10,
          x: mousePos.x * 3,
          rotateZ: mousePos.x * 0.4 - 5
        }}
        whileHover={{ scale: 1.1, rotateZ: 0 }}
        className="absolute -right-8 bottom-1/4 w-12 h-12 bg-accent rounded-xl shadow-2xl flex items-center justify-center cursor-default pointer-events-auto z-25"
      >
        <Hammer className="text-ink w-5 h-5" />
      </motion.div>
    </div>
  );

  // Gallery Data
  const galleryItems = [
    { title: 'Beyond the Surface', tag: 'Pyramids', image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=800' },
    { title: 'Living Traditions', tag: 'Cairo Artisans', image: 'https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Great Egypt', tag: 'Temples', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800' },
    { title: 'Desert Nights', tag: 'Dunes & Camps', image: 'https://images.unsplash.com/photo-1547986110-1e5b306b3a0c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Ancient Echoes', tag: 'Hieroglyphs', image: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=800' },
    { title: 'Nile Stories', tag: 'Feluccas', image: 'https://images.unsplash.com/photo-1588613254921-2ba5d6fe6cb7?auto=format&fit=crop&q=80&w=800' }
  ];

  // Four Paths to Egypt's Soul
  const paths = [
    {
      title: "Unique Stays",
      desc: "Experience architectural wonders and heritage homes that offer more than just a place to sleep.",
      icon: <CheckCircle className="w-5 h-5 text-accent" />,
      tag: "Shelter",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Journey Planner",
      desc: "Tailor-made itineraries designed by experts to match your personal pace and interests.",
      icon: <Map className="w-5 h-5 text-accent" />,
      tag: "Curation",
      image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Local Adventures",
      desc: "Step off the beaten path with immersive activities led by the people who know the land best.",
      icon: <Compass className="w-5 h-5 text-accent" />,
      tag: "Exploration",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Golden Hands",
      desc: "A tribute to local craftsmanship—exclusive access to master artisans and their timeless traditions.",
      icon: <Hammer className="w-5 h-5 text-accent" />,
      tag: "Craftsmanship",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-ink text-paper font-sans selection:bg-accent selection:text-ink overflow-x-hidden">
      
      {/* Visual background layers */}
      <div className="fixed inset-0 dot-matrix pointer-events-none opacity-10" />
      
      {/* 3D Background Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            y: [0, -80, 0],
            x: [0, 40, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] aspect-square rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-[120px] opacity-60" 
        />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 80, 0],
            rotate: [360, 0],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[15%] w-[40%] aspect-square rounded-full bg-gradient-to-bl from-accent/3 to-transparent blur-[100px] opacity-40" 
        />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 px-4 md:px-8 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 backdrop-blur-3xl px-8 py-5 rounded-full border shadow-2xl ${scrolled ? 'bg-muted/70 border-white/10' : 'bg-muted/30 border-white/[0.03]'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center rotate-45 transition-all duration-700 group-hover:rotate-0">
                <Sparkles className="w-4.5 h-4.5 text-ink -rotate-45 group-hover:rotate-0 transition-transform duration-700" />
             </div>
             <div className="flex flex-col text-left">
                <h1 className="text-xl md:text-2xl font-bold font-serif italic tracking-tighter leading-none">The ARD</h1>
                <span className="text-[6.5px] uppercase font-black tracking-[0.6em] text-accent mt-0.5">Beyond the Obvious</span>
             </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-12 font-mono">
            <a href="#services" className="text-[10px] uppercase font-black tracking-[0.3em] text-paper/70 hover:text-accent transition-colors">Services</a>
            <a href="#how-it-works" className="text-[10px] uppercase font-black tracking-[0.3em] text-paper/70 hover:text-accent transition-colors">How It Works</a>
            <a href="#why-the-ard" className="text-[10px] uppercase font-black tracking-[0.3em] text-paper/70 hover:text-accent transition-colors">Why The ARD</a>
            <a href="#download-cta" className="text-[10px] uppercase font-black tracking-[0.3em] text-paper/70 hover:text-accent transition-colors font-bold">Download</a>
            
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-paper/5 hover:bg-paper/10 transition-all text-paper/70 hover:text-accent border border-white/5 active:scale-90"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <a href="#download-cta" className="bg-accent text-ink rounded-full px-7 py-3 font-black text-[9px] uppercase tracking-widest hover:bg-paper hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
               Initiate Access
            </a>
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-paper/5 transition-all text-paper/70 border border-white/5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-paper p-2 focus:ring-accent rounded-lg"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-4 right-4 mt-4 bg-muted/95 backdrop-blur-3xl rounded-[2rem] border border-white/[0.05] p-12 md:hidden shadow-3xl text-center z-[110]"
            >
              <div className="flex flex-col gap-8 font-mono">
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xs uppercase font-black tracking-[0.4em] text-paper/80 focus:text-accent select-none">Services</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-xs uppercase font-black tracking-[0.4em] text-paper/80 focus:text-accent select-none">How It Works</a>
                <a href="#why-the-ard" onClick={() => setIsMenuOpen(false)} className="text-xs uppercase font-black tracking-[0.4em] text-paper/80 focus:text-accent select-none">Why The ARD</a>
                <a href="#download-cta" onClick={() => setIsMenuOpen(false)} className="text-xs uppercase font-black tracking-[0.4em] text-paper/80 focus:text-accent select-none">Download App</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Header Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Scenic Background with Blur Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/40 z-10" />
          
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.03, opacity: 0.55 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=2000" 
            alt="Glorious Giza Egypt Pyramids at Dawn" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Golden Ambient Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  left: `${(i * 9) % 100}%`, 
                  top: `${(i * 17) % 100}%`,
                  opacity: 0.15
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 6 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  translateX: mousePos.x * (0.4 + (i % 2) * 0.4),
                  translateY: mousePos.y * (0.4 + (i % 2) * 0.4),
                }}
                className="absolute w-2 h-2 bg-accent rounded-full blur-[2.5px]"
              />
            ))}
          </div>
        </div>

        {/* Hero Grid */}
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center mt-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              rotateY: mousePos.x * 0.25,
              rotateX: -mousePos.y * 0.25
            }}
            transition={{ 
              opacity: { duration: 1 },
              x: { duration: 1 },
              rotateY: { type: 'spring', stiffness: 50 },
              rotateX: { type: 'spring', stiffness: 50 }
            }}
            className="text-left order-2 lg:order-1 perspective-1000 preserve-3d"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
               <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
               <span className="text-[9px] font-black uppercase tracking-widest text-accent font-mono">Travel with Purpose</span>
            </div>
            
            <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.05] font-serif font-semibold tracking-tight mb-8 text-paper text-balance text-left drop-shadow-xl">
              Travel with Purpose. <br /> 
              <span className="text-accent italic font-normal text-5xl sm:text-6xl lg:text-[5.2rem]">Discover the Unseen.</span>
            </h2>
            
            <p className="text-paper/70 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-xl text-left font-serif">
              Connecting you with authentic local experiences and handpicked destinations that stay with you forever. Beyond the facade—a true cultural discovery.
            </p>
            
            {/* Download Badges */}
            <div className="flex flex-wrap gap-5 items-center justify-start mb-10">
              <a 
                href="https://apps.apple.com/us/app/the-ard/id6743180887" 
                target="_blank" 
                rel="noreferrer"
                className="bg-muted hover:bg-white text-paper hover:text-ink border border-white/10 hover:border-white rounded-2xl px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-lg"
              >
                <Smartphone className="w-4.5 h-4.5 text-accent" />
                <span>App Store</span>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.thearda" 
                target="_blank" 
                rel="noreferrer"
                className="bg-muted hover:bg-white text-paper hover:text-ink border border-white/10 hover:border-white rounded-2xl px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-lg"
              >
                <Globe className="w-4.5 h-4.5 text-accent" />
                <span>Google Play</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
               <a href="#services" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent/80 hover:text-accent transition-colors group">
                  Explore the Collection 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
               </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <AuthenticGraphic />
          </motion.div>
        </div>
      </section>

      {/* Core Foundation / Not a facade. A foundation. */}
      <section className="py-32 px-6 border-y border-white/5 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center md:text-left mb-20 space-y-4">
            <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">Not a Facade</span>
            <h3 className="text-4xl md:text-5xl font-serif italic text-paper font-semibold">Not a facade. A foundation.</h3>
            <p className="text-paper/50 text-base md:text-lg max-w-xl font-serif">We stand firmly on four core pillars, providing absolute transparency and supporting the guardians of lineage.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Curated Excellence",
                text: "Every partner is meticulously vetted for authenticity, safety, and exceptional service."
              },
              {
                title: "Honest Pricing",
                text: "The lowest commission rates in the market, ensuring the best value without hidden fees."
              },
              {
                title: "Fair Policies",
                text: "Clear cancellation & refund policies. No hidden surprises."
              },
              {
                title: "Empowering Communities",
                text: "Every booking directly contributes to the growth and sustainability of local creators."
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="luxury-card h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                   <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold font-mono">
                      0{i+1}
                   </div>
                   <h4 className="text-lg font-bold text-paper font-serif italic">{pillar.title}</h4>
                   <p className="text-sm text-paper/60 font-light leading-relaxed">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Egypt Through Our Lens (Gallery) */}
      <section id="gallery" className="py-36 px-6 relative bg-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-20">
          
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">Stories in Images</span>
            <h3 className="text-5xl md:text-6xl font-serif italic font-semibold text-paper leading-tight">Egypt Through Our Lens</h3>
            <p className="text-paper/60 text-base md:text-lg font-serif">Real experiences. Real culture. Real Egypt.</p>
          </div>

          {/* Staggered Grid of Egyptian Scenes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {galleryItems.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: idx * 0.1 }}
                 className="relative h-[25rem] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-default"
               >
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
                 {/* Premium Overlay Filter */}
                 <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-85 group-hover:opacity-95 transition-all duration-500" />
                 
                 <div className="absolute bottom-6 left-6 right-6 text-left flex justify-between items-end">
                    <div>
                       <span className="text-[8px] font-black uppercase text-accent tracking-widest font-mono block mb-1">{item.tag}</span>
                       <h4 className="text-xl font-semibold font-serif italic text-paper">{item.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-colors flex items-center justify-center">
                       <Sparkles className="w-3.5 h-3.5 text-accent" />
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Four Paths to Egypt's Soul / Services */}
      <section id="services" className="py-36 px-6 bg-muted/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24 space-y-4">
             <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">Discover the Paths</span>
             <h3 className="text-5xl md:text-6xl font-bold font-serif italic text-paper leading-none">Four Paths to Egypt's Soul</h3>
             <p className="text-paper/50 text-base md:text-lg font-serif">Each service reveals a different truth about the land</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {paths.map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="luxury-card p-0 overflow-hidden flex flex-col md:flex-row h-auto md:h-80 group hover:scale-[1.01] transition-transform duration-500"
              >
                <div className="w-full md:w-4/10 h-60 md:h-full relative overflow-hidden shrink-0">
                  <img 
                    src={path.image} 
                    alt={path.title} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/20 to-ink/40 hidden md:block" />
                </div>
                <div className="p-8 flex flex-col justify-between items-start text-left flex-1 min-w-0">
                  <div className="space-y-4 w-full">
                    <div className="flex justify-between items-center w-full">
                       <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[7px] font-black tracking-widest text-accent uppercase font-mono">{path.tag}</span>
                       {path.icon}
                    </div>
                    <h4 className="text-2xl font-bold font-serif italic text-paper">{path.title}</h4>
                    <p className="text-xs md:text-sm text-paper/60 font-light leading-relaxed">{path.desc}</p>
                  </div>
                  <a href="#download-cta" className="mt-6 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-accent/80 hover:text-accent transition-colors block">
                     Initiate Access <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / Simple Steps */}
      <section id="how-it-works" className="py-36 px-6 relative bg-transparent border-b border-white/5">
         <div className="max-w-7xl mx-auto text-center space-y-24">
            
            <div className="space-y-4 max-w-xl mx-auto">
               <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">The Flow</span>
               <h3 className="text-5xl md:text-6xl font-serif italic font-semibold text-paper leading-tight">Simple Steps. Real Results.</h3>
               <p className="text-paper/60 text-base md:text-lg font-serif">From download to departure – we make it effortless</p>
            </div>

            {/* Linear Grid of Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left relative">
               {[
                 { step: "1", title: "Download the App", info: "Available on iOS and Android. Free to download. Your journey starts with a tap." },
                 { step: "2", title: "Browse or Build", info: "Explore our verified services or create your own custom itinerary. Your Egypt, your way." },
                 { step: "3", title: "We Call You", info: "Our team personally calls to confirm details and handle secure payment. Real humans, real conversation." },
                 { step: "4", title: "Experience Egypt", info: "Arrive. Experience. Remember. We're available throughout your journey for any support you need." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.7, delay: i * 0.15 }}
                   className="relative space-y-6"
                 >
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full border border-accent flex items-center justify-center font-mono font-bold text-accent text-sm shadow-[0_4px_15px_rgba(230,208,167,0.1)]">
                        {item.step}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent hidden lg:block" />
                   </div>
                   <h4 className="text-lg font-bold font-serif italic text-paper">{item.title}</h4>
                   <p className="text-sm text-paper/50 leading-relaxed font-light">{item.info}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Custom Trip Callout Interactive Builder */}
      <section className="py-32 px-6 bg-gradient-to-br from-ink via-muted/40 to-ink relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
           
           <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <Compass className="w-6 h-6 text-accent animate-spin-slow" />
           </div>

           <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-paper font-semibold leading-tight">Don't See Your Trip? Build It.</h3>
              <p className="text-paper/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto font-serif">
                Create your own itinerary inside our interactive portal. Send a request, and our cultural guardians will personally reach out to co-design your custom Egypt experience.
              </p>
           </div>

           <div className="pt-4">
              <button 
                onClick={() => setCustomTripModalOpen(true)}
                className="luxury-button mx-auto !px-16 !py-6 shadow-[0_15px_45px_rgba(230,208,167,0.25)] hover:shadow-accent/40 text-xs tracking-[0.4em]"
              >
                 Start Custom Trip
              </button>
           </div>
        </div>
      </section>

      {/* Why Travelers Choose The ARD */}
      <section id="why-the-ard" className="py-36 px-6 border-t border-white/5 bg-transparent relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24 space-y-4">
             <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">The Promise</span>
             <h3 className="text-5xl md:text-6xl font-bold font-serif italic text-paper tracking-tight leading-none">Why Travelers Choose The ARD</h3>
             <p className="text-paper/50 text-base md:text-lg font-serif">More than an app. A promise.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real Human Contact",
                desc: "You speak to a real person from day one. No bots. No automation. Just genuine Egyptian hospitality.",
                icon: <PhoneCall className="w-5 h-5 text-accent" />
              },
              {
                title: "No Hidden Fees",
                desc: "What you see is what you pay. Cancellation policy is clear and fair from the start.",
                icon: <Lock className="w-5 h-5 text-accent" />
              },
              {
                title: "Owner-Verified Everything",
                desc: "Every stay, product, and activity is personally verified by our team. Your safety is our obsession.",
                icon: <ShieldCheck className="w-5 h-5 text-accent" />
              },
              {
                title: "You're Not a Tourist",
                desc: "You're a guest of the land. We introduce you to Egypt the way insiders experience it.",
                icon: <Users className="w-5 h-5 text-accent" />
              },
              {
                title: "Local First, Always",
                desc: "We support Egyptian artisans, guides, and small businesses. Your trip creates real impact.",
                icon: <Heart className="w-5 h-5 text-accent" />
              },
              {
                title: "24/7 Support Network",
                desc: "Something unexpected? We're available around the clock to ensure your peace of mind.",
                icon: <Clock className="w-5 h-5 text-accent" />
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="luxury-card flex flex-col items-start gap-4 hover:border-accent/35 transition-all text-left pointer-events-auto"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif font-bold italic text-paper">{item.title}</h4>
                  <p className="text-sm text-paper/50 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories From the Land (Reviews) */}
      <section className="py-36 px-6 bg-muted/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-24 space-y-4">
             <span className="text-accent font-black text-[9px] uppercase tracking-[0.5em] font-mono">The Testimonials</span>
             <h3 className="text-5xl md:text-6xl font-bold font-serif italic text-paper tracking-tight leading-none">Stories from the Land</h3>
             <p className="text-paper/50 text-base md:text-lg font-serif">Real travelers. Real experiences.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
             {[
               {
                 quote: "The ARD didn't just show me Egypt – it decoded it. I stayed in a desert camp that felt like stepping into another time. The personal call from their team made all the difference.",
                 author: "Sarah Mitchell",
                 role: "Travel Photographer, London"
               },
               {
                 quote: "I've used many travel apps, but none with this level of human touch. They called me, verified everything, and checked in during my trip. It felt like having an Egyptian friend guiding me.",
                 author: "Ahmed Hassan",
                 role: "Cultural Explorer, Dubai"
               },
               {
                 quote: "The Golden Hands marketplace is incredible. I bought handwoven textiles directly from the artisan's family. Each piece has a story, and I know my money went to the right hands.",
                 author: "Maria Santos",
                 role: "Interior Designer, Barcelona"
               },
               {
                 quote: "Egypt is not a postcard. It's a handshake. The ARD made me feel that from the moment I downloaded the app. Authentic, safe, and deeply cultural.",
                 author: "James Chen",
                 role: "History Teacher, Singapore"
               }
             ].map((review, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className="p-10 backdrop-blur-xl border border-white/[0.04] bg-muted/60 hover:border-accent/25 rounded-[2rem] text-left flex flex-col justify-between items-start space-y-6"
               >
                 <div className="flex gap-1 animate-pulse">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-accent fill-accent" />)}
                 </div>
                 <p className="text-base md:text-md text-paper/85 leading-relaxed font-serif font-light italic">
                    "{review.quote}"
                 </p>
                 <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 bg-accent/15 border border-accent/20 rounded-full flex items-center justify-center font-bold text-accent font-serif tracking-tighter">
                       {review.author[0]}
                    </div>
                    <div>
                       <h5 className="text-sm font-bold text-paper font-sans tracking-tight">{review.author}</h5>
                       <p className="text-[10px] uppercase tracking-widest text-[#b8975e] font-medium mt-0.5">{review.role}</p>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Begin Your Journey Through The ARD (Sub-Footer Download) */}
      <section id="download-cta" className="py-44 px-6 bg-ink text-paper relative overflow-hidden text-center">
         <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-accent/5 to-transparent blur-[80px]" />
         <div className="max-w-4xl mx-auto relative z-10 space-y-12">
            
            <div className="space-y-4">
               <span className="text-accent font-mono text-[9px] uppercase tracking-[0.5em] block">Start Designing Your Legacy</span>
               <h3 className="text-5xl md:text-6xl font-serif italic font-bold text-paper text-balance leading-tight">
                 Begin Your Journey Through The ARD
               </h3>
               <p className="text-paper/60 text-base md:text-xl font-light leading-relaxed max-w-xl mx-auto font-serif pt-1">
                 The land awaits. Your story begins here. Download on iOS and Android to connect directly.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <a 
                href="https://apps.apple.com/us/app/the-ard/id6743180887" 
                target="_blank" 
                rel="noreferrer"
                className="luxury-button !px-12 !py-5 shadow-accent/25 w-full sm:w-auto text-[10px] tracking-[0.3em]"
              >
                <Smartphone className="w-4.5 h-4.5" />
                Download App
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.thearda" 
                target="_blank" 
                rel="noreferrer"
                className="bg-muted hover:bg-white text-paper hover:text-ink border border-white/10 hover:border-white rounded-full px-12 py-5 font-black text-[10px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
              >
                <Globe className="w-4.5 h-4.5" />
                Google Play Store
              </a>
            </div>
         </div>
      </section>

      {/* Elegant Footer */}
      <footer className="py-24 px-6 border-t border-paper/10 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-ink" />
                </div>
                <h4 className="text-2xl font-bold font-serif italic text-paper">The ARD</h4>
              </div>
              <p className="text-paper/40 text-sm max-w-sm font-light leading-relaxed font-serif">
                Beyond the obvious. We decode culture, stories & hidden truths. Not a tourist platform – a cultural foundation.
              </p>
              <div className="flex gap-4">
                 {[1, 2, 3, 4].map(i => (
                   <button 
                     key={i} 
                     className="w-10 h-10 rounded-full border border-white/10 hover:border-accent hover:text-accent hover:scale-110 transition-all flex items-center justify-center cursor-pointer text-paper/60"
                     aria-label={`Visit our channel ${i}`}
                   >
                     <Smartphone className="w-4 h-4" />
                   </button>
                 ))}
              </div>
            </div>
            
            {/* Services Sitemap block */}
            <div className="space-y-6">
               <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent font-mono">Services</h5>
               <ul className="space-y-4 text-sm text-paper/60 font-medium">
                 <li><a href="#services" className="hover:text-accent transition-colors">Unique Stays</a></li>
                 <li><a href="#services" className="hover:text-accent transition-colors">Golden Hands</a></li>
                 <li><a href="#services" className="hover:text-accent transition-colors">Journey Planner</a></li>
                 <li><a href="#services" className="hover:text-accent transition-colors">Adventure</a></li>
                 <li><a href="#" className="hover:text-accent transition-colors">Custom Trips</a></li>
               </ul>
            </div>
            
            {/* Contact Support coordinates */}
            <div className="space-y-6">
               <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent font-mono">Company</h5>
               <ul className="space-y-4 text-sm text-paper/60 font-medium">
                 <li><a href="#" className="hover:text-accent transition-colors">About The ARD</a></li>
                 <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
                 <li><a href="#" className="hover:text-accent transition-colors">Verified Partners</a></li>
                 <li><a href="mailto:Curate@TheARD.com" className="hover:text-accent transition-colors">Contact Support</a></li>
                 <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
               </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-paper/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase font-black tracking-widest text-paper/20 font-mono">
            <p>© 2026 THE ARD. REVEALING EGYPT BEYOND THE OBVIOUS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-accent transition-colors">Terms of Heritage</a>
               <a href="#" className="hover:text-accent transition-colors">Governance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CUSTOM TRIP POPUP MODAL */}
      <AnimatePresence>
         {customTripModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/90 backdrop-blur-xl"
            >
               <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 30 }}
                 transition={{ type: 'spring', duration: 0.5 }}
                 className="relative w-full max-w-xl bg-muted/80 backdrop-blur-3xl border border-accent/20 rounded-[2.5rem] p-8 md:p-12 shadow-3xl text-left overflow-hidden"
               >
                  {/* Decorative ambient gold circle */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-[40px] -mr-12 -mt-12 pointer-events-none" />

                  <button 
                    onClick={() => setCustomTripModalOpen(false)}
                    className="absolute top-8 right-8 text-paper/40 hover:text-accent p-2 rounded-full border border-white/5 bg-paper/5 hover:scale-115 transition-all outline-none"
                    aria-label="Close modal"
                  >
                     <X className="w-4 h-4" />
                  </button>

                  <AnimatePresence mode="wait">
                     {!formSubmitted ? (
                        <motion.form 
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleFormSubmit} 
                          className="space-y-6"
                        >
                           <div className="space-y-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent font-mono block">Design Legacy</span>
                              <h3 className="text-3xl font-serif italic text-paper font-semibold">Start Custom Trip</h3>
                              <p className="text-sm text-paper/65 leading-relaxed font-light">
                                Fill out your wishes below. A real human guardian from our cultural curation office will personally design your perfect co-designed itinerary.
                              </p>
                           </div>

                           <div className="grid md:grid-cols-2 gap-5 pt-2">
                              <div className="space-y-2">
                                 <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 font-mono">Your Human Name</label>
                                 <input 
                                   type="text" 
                                   required
                                   value={tripForm.name}
                                   onChange={e => setTripForm({ ...tripForm, name: e.target.value })}
                                   placeholder="e.g. Sarah Mitchell"
                                   className="luxury-input w-full"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 font-mono">Email Address</label>
                                 <input 
                                   type="email" 
                                   required
                                   value={tripForm.email}
                                   onChange={e => setTripForm({ ...tripForm, email: e.target.value })}
                                   placeholder="e.g. sarah@domain.com"
                                   className="luxury-input w-full"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 font-mono">Phone Number (For Personal Call)</label>
                              <input 
                                type="tel" 
                                required
                                value={tripForm.phone}
                                onChange={e => setTripForm({ ...tripForm, phone: e.target.value })}
                                placeholder="e.g. +1 (555) 459-3220"
                                className="luxury-input w-full"
                              />
                           </div>

                           {/* Custom Destination Picker */}
                           <div className="space-y-2">
                              <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 font-mono block">Select Destinations</label>
                              <div className="flex flex-wrap gap-2.5">
                                 {['Cairo', 'Siwa Oasis', 'Luxor Temple', 'Aswan', 'Sinai Peninsula', 'Fayoum'].map((dest, i) => {
                                    const selected = tripForm.destinations.includes(dest);
                                    return (
                                       <button
                                         key={i}
                                         type="button"
                                         onClick={() => handleDestinationToggle(dest)}
                                         className={`px-4 py-2 border rounded-full text-[9px] uppercase font-black transition-all ${
                                           selected 
                                             ? 'bg-accent/20 border-accent/80 text-accent font-bold' 
                                             : 'border-white/5 bg-paper/5 text-paper/60 hover:border-white/20'
                                         }`}
                                       >
                                          {dest}
                                       </button>
                                    );
                                 })}
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-5 font-mono">
                              <div className="space-y-2">
                                 <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 block">Duration</label>
                                 <select 
                                   value={tripForm.duration}
                                   onChange={e => setTripForm({ ...tripForm, duration: e.target.value })}
                                   className="luxury-input w-full text-xs"
                                 >
                                    <option value="5_days">5 Days Discovery</option>
                                    <option value="7_days">7 Days Standard</option>
                                    <option value="10_days">10 Days Immersion</option>
                                    <option value="14_days">14 Days Grand Expedition</option>
                                 </select>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[8.5px] font-black uppercase tracking-widest text-accent/55 block">Travel Style</label>
                                 <select 
                                   value={tripForm.style}
                                   onChange={e => setTripForm({ ...tripForm, style: e.target.value })}
                                   className="luxury-input w-full text-xs"
                                 >
                                    <option value="cultural">Ancestral Heritage</option>
                                    <option value="adventure">Oasis Adventure</option>
                                    <option value="luxury">Luxury Ecologes</option>
                                    <option value="craft">Pottery & Handcrafts Focus</option>
                                 </select>
                              </div>
                           </div>

                           <div className="pt-4">
                              <button 
                                type="submit"
                                className="luxury-button w-full shadow-md shadow-accent/20"
                              >
                                Submit Custom Request
                              </button>
                           </div>
                        </motion.form>
                     ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="py-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]"
                        >
                           <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 animate-bounce">
                              <CheckCircle className="w-8 h-8 text-accent" />
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-2xl font-serif italic text-paper font-semibold">Request Received</h4>
                              <p className="text-sm text-paper/60 leading-relaxed font-light max-w-sm">
                                Thank you, <span className="text-accent font-semibold">{tripForm.name}</span>. Our human guardian in Siwa/Cairo will compile a custom legacy plan and call you back shortly within 24 hours.
                              </p>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Award, 
  Globe2, 
  Factory,
  ChevronRight,
  Building2,
  Star,
  History,
  GraduationCap,
  Scale,
  Truck,
  PackageCheck,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Package,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Refs for scroll animations
  const [aboutRef, aboutInView] = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  
  const [productsRef, productsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [careersRef, careersInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [contactRef, contactInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Product data
  const products = [
    {
      name: "Dilbagh Premium",
      description: "Our signature blend of premium ingredients",
      image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg",
      icon: <Package className="w-12 h-12 text-red-600" />,
      features: ["Premium Quality", "Rich Taste", "Classic Flavor"],
      ingredients: ["Betelnut", "Cardamom Seeds", "Sandalwood Oil", "Rose Essence"]
    },
    {
      name: "Dilbagh Plus",
      description: "Enhanced flavor profile for the discerning connoisseur",
      image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg",
      icon: <Star className="w-12 h-12 text-red-600" />,
      features: ["Enhanced Flavor", "Royal Taste", "Elegant Packaging"],
      ingredients: ["Premium Betelnut", "Cardamom Seeds", "Saffron", "Rose Essence", "Kewra"]
    },
    {
      name: "Dilbagh Silver",
      description: "Perfect balance of tradition and taste",
      image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg",
      icon: <Award className="w-12 h-12 text-red-600" />,
      features: ["Balanced Flavor", "Quality Blend", "Traditional Recipe"],
      ingredients: ["Betelnut", "Cardamom Seeds", "Kattha", "Cloves"]
    }
  ];
  
  // Auto cycle through products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl font-bold italic text-red-600">Dilbagh</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Products", "Careers", "Contact"].map((item, index) => (
                <motion.a 
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden py-4 space-y-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {["About", "Products", "Careers", "Contact"].map((item, index) => (
                  <motion.a 
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-red-500 transition-colors py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
          <img 
            src="https://www.dilbaghgroup.com/wp-content/uploads/2017/04/Home1_SLIDER_1-3-1360x620.jpg"
            alt="Dilbagh Pan Masala Products"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <motion.div 
              className="flex justify-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-7xl md:text-8xl font-bold italic text-red-600 drop-shadow-[0_0_0.3rem_#000000]">
                Dilbagh
              </h1>
            </motion.div>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-200 mb-8 font-semibold drop-shadow-[0_0_0.2rem_#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              India's Premium Pan Masala Since 1992
            </motion.p>
            <motion.button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform flex items-center mx-auto shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Discover Our Legacy
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronRight className="ml-2" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Hero Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
      </header>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4 relative overflow-hidden bg-black/80">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('https://www.dilbaghgroup.com/wp-content/uploads/2017/04/Home1_SLIDER_1-3-1360x620.jpg')] bg-center bg-no-repeat bg-cover blur-sm"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
          >
            About <span className="text-red-600">Dilbagh</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Experience the epitome of taste and tradition with Dilbagh Royal Pan Masala, where heritage meets excellence since 1947
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
            >
              <motion.p 
                className="text-lg text-gray-300 mb-6" 
                variants={fadeIn}
              >
                Founded in the heart of post-independence India, Dilbagh has been crafting India's finest pan masala for over seven decades. Our Royal Pan Masala is a testament to our unwavering commitment to quality, using only the most premium ingredients sourced from across the world.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-300 mb-6" 
                variants={fadeIn}
                transition={{ delay: 0.1 }}
              >
                Each tin of Dilbagh Royal Pan Masala contains a perfect blend of exotic spices, handpicked betel nuts, premium cardamom, fragrant rose essence, and rare sandalwood oil—creating a symphony of flavors that has been savored by generations of connoisseurs.
              </motion.p>
              
              <motion.div className="grid grid-cols-2 gap-6 mt-10" variants={staggerContainer}>
                <motion.div 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black border border-red-900/30 hover:border-red-600/50 transition-all"
                  variants={fadeIn}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.1)" }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-red-600 mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 5
                    }}
                  >
                    75+
                  </motion.div>
                  <div className="text-gray-400">Years of Excellence</div>
                </motion.div>
                <motion.div 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-red-900/20 to-black border border-red-900/30 hover:border-red-600/50 transition-all"
                  variants={fadeIn}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.1)" }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-red-600 mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 6
                    }}
                  >
                    30+
                  </motion.div>
                  <div className="text-gray-400">Countries Served</div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-red-900/10 to-transparent border border-red-900/20"
                variants={fadeIn}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <motion.span 
                    className="inline-block mr-2 text-red-600"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                  >
                    <Award className="w-5 h-5" />
                  </motion.span>
                  The Royal Heritage
                </h3>
                <p className="text-gray-400">
                  Dilbagh Royal Pan Masala has been the choice of connoisseurs and nobility, representing a tradition of excellence that dates back to the royal courts of India. Our exclusive formula remains unchanged, preserving the authentic taste that has made us legendary.
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                className="absolute -inset-4 rounded-2xl bg-red-600/20 blur-md"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div className="grid grid-cols-1 gap-4 relative z-10">
                <motion.img 
                  src="https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg"
                  alt="Dilbagh Royal Pan Masala"
                  className="rounded-xl shadow-2xl border-2 border-red-900/30 object-cover h-64"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.1)" }}
                  >
                    <h4 className="text-lg font-medium mb-2 text-red-500">Premium Quality</h4>
                    <p className="text-gray-400 text-sm">Meticulously crafted with handpicked ingredients to ensure unparalleled taste</p>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.1)" }}
                  >
                    <h4 className="text-lg font-medium mb-2 text-red-500">Authentic Recipe</h4>
                    <p className="text-gray-400 text-sm">Our secret blend has remained unchanged since 1947, preserving traditional flavors</p>
                  </motion.div>
                </div>
                <motion.div 
                  className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.1)" }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="p-3 bg-red-600/20 rounded-full text-red-500"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    >
                      <Leaf className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 text-red-500">Dilbagh Royal Commitment</h4>
                      <p className="text-gray-400 text-sm">
                        We honor our royal heritage by combining traditional craftsmanship with modern standards of excellence, creating a pan masala experience that stands apart.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" ref={productsRef} className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
          >
            Our <span className="text-red-600">Products</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Explore our exquisite range of pan masala products, crafted with the finest ingredients for an unmatched experience of taste and tradition.
          </motion.p>
          
          {/* Featured Product Showcase - Inspired by Rajnigandha's interactive product display */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={productsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-red-900/30">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <motion.div 
                    className="flex flex-col h-full justify-center"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    key={activeProduct} // Force re-render animation when product changes
                  >
                    <div className="bg-red-600/10 text-red-600 inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 self-start">
                      Premium Selection
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{products[activeProduct].name}</h3>
                    <p className="text-gray-400 mb-6">{products[activeProduct].description}</p>
                    
                    <div className="mb-8">
                      <p className="text-gray-300 font-medium mb-3">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-3">
                        {products[activeProduct].ingredients.map((ingredient, idx) => (
                          <motion.span 
                            key={idx}
                            className="bg-red-900/20 border border-red-900/30 px-4 py-1 rounded-full text-white"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.3)" }}
                          >
                            {ingredient}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all transform flex items-center self-start mt-auto"
                      whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Product
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </div>
                
                <div className="relative aspect-square md:aspect-auto">
                  <motion.div 
                    className="absolute -inset-1 bg-red-600/30 blur-md rounded-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                  <motion.div 
                    className="h-full flex items-center justify-center p-8 relative z-10"
                    key={activeProduct} // Force re-render animation when product changes
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img 
                      src={products[activeProduct].image}
                      alt={products[activeProduct].name}
                      className="max-h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Product selector dots - similar to Rajnigandha website */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {products.map((_, idx) => (
                  <motion.button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${idx === activeProduct ? 'bg-red-600' : 'bg-gray-600'}`}
                    onClick={() => setActiveProduct(idx)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Highlight Dilbagh Plus as a special feature */}
          <motion.div 
            className="mb-20 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-xl"></div>
            <div className="bg-gradient-to-r from-gray-900 to-black border border-red-900/30 rounded-2xl relative z-10 overflow-hidden">
              <div className="grid md:grid-cols-5 items-center">
                <div className="col-span-2 p-8 flex justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      filter: ["drop-shadow(0 0 10px rgba(220,38,38,0.3))", "drop-shadow(0 0 20px rgba(220,38,38,0.5))", "drop-shadow(0 0 10px rgba(220,38,38,0.3))"]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-600/10 blur-xl rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    ></motion.div>
                    <img 
                      src="https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg" 
                      alt="Dilbagh Plus" 
                      className="max-w-full h-auto object-contain relative z-10"
                    />
                  </motion.div>
                </div>
                <div className="col-span-3 p-8 md:pr-12">
                  <div className="inline-block bg-red-600/10 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                    New Premium Offering
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Introducing Dilbagh Plus</h3>
                  <p className="text-gray-300 mb-6">
                    Experience the evolution of flavor with our enhanced Dilbagh Plus. Crafted for the discerning palate, this premium blend combines our traditional expertise with carefully selected premium ingredients.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <motion.div 
                        className="mr-2 text-red-500"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <Star className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h4 className="text-white font-medium">Enhanced Flavor</h4>
                        <p className="text-gray-400 text-sm">Intensified taste notes for a remarkable experience</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <motion.div 
                        className="mr-2 text-red-500"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                      >
                        <Package className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h4 className="text-white font-medium">Premium Packaging</h4>
                        <p className="text-gray-400 text-sm">Elegant design that preserves freshness longer</p>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all transform flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discover Dilbagh Plus
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Product Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
          >
            {products.map((product, index) => (
              <motion.div 
                key={index} 
                className={`bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border ${index === 1 ? 'border-red-600/50' : 'border-red-900/30'} group hover:border-red-600/50 transition-all`}
                variants={fadeIn}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)"
                }}
              >
                {index === 1 && (
                  <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md transform rotate-12">
                    Featured
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <motion.div 
                    className="text-red-600 group-hover:text-red-500 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    {product.icon}
                  </motion.div>
                  <motion.div 
                    className="h-16 w-16 relative"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-red-500 transition-colors">{product.name}</h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">{product.description}</p>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <ShieldCheck className="w-4 h-4 text-red-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  className={`w-full ${index === 1 ? 'bg-red-600 text-white' : 'bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'} px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center ${index !== 1 && 'opacity-0 group-hover:opacity-100'}`}
                  initial={index !== 1 ? { y: 20 } : {}}
                  whileHover={{ y: 0 }}
                >
                  Buy Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ingredients Section - Inspired by the Rajnigandha ingredient showcase */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[url('https://www.dilbaghgroup.com/wp-content/uploads/2017/04/Home1_SLIDER_1-3-1360x620.jpg')] bg-fixed bg-center bg-no-repeat bg-cover blur-sm"></div>
          <div className="h-full w-full pattern-dots"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Perfect Blend of <span className="text-red-600">Precious Ingredients</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Every pack of Dilbagh pan masala is crafted with carefully selected ingredients that provide a unique flavor and aroma.
          </motion.p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                name: "Betelnut",
                description: "Premium quality betelnut, carefully selected and processed",
                image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/01/Dilbagh-product-specification.jpg"
              },
              {
                name: "Cardamom Seeds",
                description: "Aromatic cardamom that enhances the flavor profile",
                image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg"
              },
              {
                name: "Sandalwood Oil",
                description: "Precious natural oil that adds subtle fragrance",
                image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/01/Dilbagh-product-specification.jpg"
              },
              {
                name: "Rose Essence",
                description: "Delicate floral notes that complete the experience",
                image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg"
              },
              {
                name: "Kattha (Catechu)",
                description: "Traditional ingredient that adds characteristic richness",
                image: "https://www.dilbaghgroup.com/wp-content/uploads/2017/01/Dilbagh-product-specification.jpg"
              }
            ].map((ingredient, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="mb-4 w-32 h-32 rounded-full overflow-hidden border-2 border-red-600/30 relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ 
                      boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0)", "0 0 0 10px rgba(220, 38, 38, 0)"],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  ></motion.div>
                  <img 
                    src={ingredient.image} 
                    alt={ingredient.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{ingredient.name}</h3>
                <p className="text-gray-400 text-sm">{ingredient.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Dilbagh Plus Ingredients Feature */}
          <motion.div
            className="mt-20 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/30 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <motion.h3
                  className="text-2xl font-bold mb-4 flex items-center"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-red-600 mr-2">
                    <Star className="w-6 h-6" />
                  </span>
                  Dilbagh Plus Premium Ingredients
                </motion.h3>
                <motion.p
                  className="text-gray-400 mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Our premium Dilbagh Plus contains an exclusive blend of superior ingredients, carefully sourced and expertly combined for a distinctive and refined taste experience.
                </motion.p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "Premium Betelnut", description: "Specially selected for superior quality and flavor" },
                    { name: "Exotic Saffron", description: "The world's most precious spice for a royal touch" },
                    { name: "Rose Essence", description: "Delicate floral notes from premium roses" },
                    { name: "Fine Kewra", description: "Fragrant extract that enhances the sensory experience" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex flex-col"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-medium mb-1 text-red-500">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent md:from-transparent md:via-transparent md:to-black/80 z-10"></div>
                <motion.div
                  className="h-96 md:h-full w-full relative"
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute inset-0 bg-red-600/10 blur-2xl"
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  ></motion.div>
                  <img 
                    src="https://www.dilbaghgroup.com/wp-content/uploads/2017/03/Dilbagh-Plus-new.jpg" 
                    alt="Dilbagh Plus Premium Ingredients" 
                    className="w-full h-full object-cover object-center opacity-90"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" ref={careersRef} className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[url('https://www.dilbaghgroup.com/wp-content/uploads/2017/04/Home1_SLIDER_1-3-1360x620.jpg')] bg-center bg-repeat pattern-grid-lg"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            animate={careersInView ? "visible" : "hidden"}
          >
            Join Our <span className="text-red-600">Team</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={careersInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Be part of an iconic brand that values tradition, innovation, and excellence. Explore opportunities to grow with us.
          </motion.p>
          
          <motion.div 
            className="grid gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={careersInView ? "visible" : "hidden"}
          >
            {[
              {
                title: "Quality Assurance Expert",
                department: "Manufacturing",
                location: "Kanpur, India",
                type: "Full-time",
                icon: <PackageCheck className="w-6 h-6" />
              },
              {
                title: "Production Head",
                department: "Operations",
                location: "Delhi NCR",
                type: "Full-time",
                icon: <Factory className="w-6 h-6" />
              },
              {
                title: "Supply Chain Director",
                department: "Logistics",
                location: "Mumbai, India",
                type: "Full-time",
                icon: <Truck className="w-6 h-6" />
              }
            ].map((job, index) => (
              <motion.div 
                key={index} 
                variants={slideIn}
                className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all cursor-pointer group"
                whileHover={{ 
                  x: 10,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(220, 38, 38, 0.1)"
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <motion.div 
                      className="bg-red-600/20 p-3 rounded-lg text-red-500 group-hover:bg-red-600/30 transition-colors"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {job.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-400">
                        <span className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <Globe2 className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 p-8 bg-gradient-to-r from-red-900/20 to-black rounded-xl border border-red-900/30"
            initial={{ opacity: 0, y: 50 }}
            animate={careersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold">Join Our Exclusive Dilbagh Club</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Get exclusive access to premium products, rewards, and special events. Join the Dilbagh Club today to enjoy exclusive privileges.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all transform flex items-center">
              Join Dilbagh Club
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.dilbaghgroup.com/wp-content/uploads/2017/01/Dilbagh-product-specification.jpg')] bg-right bg-no-repeat bg-cover blur-md"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            Get in <span className="text-red-600">Touch</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Have questions or need assistance? Our team is here to help. Reach out to us through any of the channels below.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={contactInView ? "visible" : "hidden"}
            >
              <motion.h3 
                className="text-2xl font-semibold mb-6"
                variants={fadeIn}
              >
                Contact Information
              </motion.h3>
              <motion.div className="space-y-6" variants={staggerContainer}>
                <motion.div 
                  className="flex items-start gap-4 group"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="text-red-600 bg-red-600/10 p-2 rounded-lg"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <MapPin className="w-6 h-6" />
                  </motion.div>
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="font-semibold group-hover:text-red-500 transition-colors">Head Office</p>
                    <p className="text-gray-400">123, Industrial Area, Kanpur, Uttar Pradesh, India</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 group"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="text-red-600 bg-red-600/10 p-2 rounded-lg"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Phone className="w-6 h-6" />
                  </motion.div>
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="font-semibold group-hover:text-red-500 transition-colors">Phone</p>
                    <p className="text-gray-400">+91 512 234 5678</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 group"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="text-red-600 bg-red-600/10 p-2 rounded-lg"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Mail className="w-6 h-6" />
                  </motion.div>
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="font-semibold group-hover:text-red-500 transition-colors">Email</p>
                    <p className="text-gray-400">info@dilbaghgroup.com</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h4 className="text-xl font-semibold mb-4">Download Our App</h4>
                <p className="text-gray-400 mb-4">Get exclusive offers and order our products directly from our app.</p>
                <div className="flex gap-4">
                  <motion.button 
                    className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                      <circle cx="18" cy="18" r="3"></circle>
                      <path d="m14 18 2-2 2 2"></path>
                    </svg>
                    App Store
                  </motion.button>
                  <motion.button 
                    className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Google Play
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-red-900/30"
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <form className="space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 transition-colors" 
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 transition-colors" 
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 transition-colors h-32"
                  ></textarea>
                </motion.div>
                <motion.button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all"
                  whileHover={{ scale: 1.02, backgroundColor: "#b91c1c" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-red-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h3 
                className="text-xl font-bold italic text-red-600 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Dilbagh
              </motion.h3>
              <p className="text-gray-400">Crafting India's finest pan masala since 1947.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {["About Us", "Products", "Careers", "Contact"].map((item, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-red-500 transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                {products.map((product, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.name}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {[
                  <Users className="w-6 h-6" />,
                  <Globe2 className="w-6 h-6" />,
                  <Mail className="w-6 h-6" />
                ].map((icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="text-center text-gray-400 pt-8 border-t border-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>© 2024 Dilbagh Group. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
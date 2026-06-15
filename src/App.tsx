import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Sparkles,
  RotateCw,
  X,
  Plus,
  Minus,
  MapPin,
  Clock,
  Phone,
  Check,
  Music,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Info,
  Truck,
  HelpCircle,
  Coins,
  Compass,
  Sun,
  Moon
} from 'lucide-react';
import { PRODUCTS, STORE_TIENDA_INFO } from './data';
import { Product, CartItem, OrderDetails } from './types';
import { ShirtMockup } from './components/ShirtMockup';
import { SizeGuide } from './components/SizeGuide';
import { PaymentInstructions } from './components/PaymentInstructions';

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('mzb_theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('mzb_theme', nextTheme);
  };

  const isLight = theme === 'light';

  // Entrance Splash screen state
  const [showEntrance, setShowEntrance] = useState(true);

  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<'catalog' | 'how-to-buy'>('catalog');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Interactive Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});

  // Product detail expanded state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailSide, setDetailSide] = useState<'front' | 'back'>('front');

  // Switch between front/back previews in the main catalog cards
  const [cardSides, setCardSides] = useState<{ [productId: string]: 'front' | 'back' }>({});

  // Sizing guide modal state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Lookbook slider state for page entry
  const [currentSlide, setCurrentSlide] = useState(0);
  const lookbookSlides = [
    {
      image: "/images/streetwear_model_1_1781542451654.jpg",
      collection: "COLECCIÓN RAÍCES",
      title: "ESPÍRITU DE LA CALLE",
      subtitle: "Prendas de alta densidad y corte oversized real.",
      buttonLabel: "VER COLECCIÓN",
      categoryId: "raices"
    },
    {
      image: "/images/streetwear_model_2_1781542467830.jpg",
      collection: "COLECCIÓN COYUNTURA",
      title: "CULTURA REBELDE",
      subtitle: "Cada polo es un lienzo urbano con conciencia social.",
      buttonLabel: "VER COYUNTURA",
      categoryId: "coyuntura"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lookbookSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Checkout flow state
  const [checkoutMode, setCheckoutMode] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryReference, setDeliveryReference] = useState('');
  const [yapeTx, setYapeTx] = useState('');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  // Simulated cassette street-player states
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const tracks = [
    { title: "De La Calle Nace Todo (Instrumental)", author: "SJL Underground" },
    { title: "Riqueza es la Vida (Beat tape)", author: "Manzana B Records" },
    { title: "Identidad & Resistencia (Dub edit)", author: "Mz.B Lote 6" }
  ];

  // Initialize helper size selectors for all products
  useEffect(() => {
    const initialSizes: { [key: string]: string } = {};
    PRODUCTS.forEach((p) => {
      initialSizes[p.id] = p.sizes[0] || 'M';
    });
    setSelectedSizes(initialSizes);
  }, []);

  // Sync cart with local storage to avoid lost items on page refresh
  useEffect(() => {
    const storedCart = localStorage.getItem('mzb_lt6_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Error parsing stored cart:', e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('mzb_lt6_cart', JSON.stringify(newCart));
  };

  // Switch product card side preview
  const toggleCardSide = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    setCardSides(prev => ({
      ...prev,
      [productId]: prev[productId] === 'back' ? 'front' : 'back'
    }));
  };

  // Add Item to Cart
  const handleAddToCart = (product: Product, size: string, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const itemId = `${product.id}-${size}`;
    const existingIndex = cart.findIndex(item => item.id === itemId);

    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { id: itemId, product, selectedSize: size, quantity }];
    }

    saveCart(updatedCart);

    // Feedback notification or open cart immediately to feel interactive
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null);

    saveCart(updatedCart);
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
  };

  // Reset checkout on change
  useEffect(() => {
    setCheckoutSubmitted(false);
  }, [customerName, customerPhone, deliveryAddress, deliveryReference, yapeTx, checkoutMode]);

  // Compute Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = checkoutMode === 'delivery' ? 10.00 : 0.00; // S/.10 standard delivery in Lima districts
  const cartTotal = cartSubtotal + shippingCost;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Category filter mapping
  const filteredProducts = PRODUCTS.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  // Compile perfect plain-text Whatsapp Link order
  const generateWhatsAppMessage = () => {
    let msg = `🔥 *NUEVO PEDIDO DE COMPRA - MZ.B LT.6* 🔥\n`;
    msg += `===============================\n\n`;
    msg += `👤 *Cliente:* ${customerName.trim() || '(No brindado)'}\n`;
    msg += `📱 *Teléfono:* ${customerPhone.trim() || '(No brindado)'}\n`;
    msg += `🚚 *Modalidad:* ${checkoutMode === 'delivery' ? '🚗 Envío por Delivery (S/ 10.00)' : '🏪 Recojo en Tienda (SJL)'}\n\n`;

    if (checkoutMode === 'delivery') {
      msg += `📍 *Dirección de Entrega:*\n${deliveryAddress.trim() || 'No colocado'}\n`;
      msg += `🗺️ *Referencia:*\n${deliveryReference.trim() || 'No colocado'}\n\n`;
    } else {
      msg += `🏪 *Lugar de Recojo:*\n${STORE_TIENDA_INFO.storeAddress}\n`;
      msg += `⏰ *Horario de Atención:*\n${STORE_TIENDA_INFO.storeHours}\n\n`;
    }

    msg += `👕 *DETALLE DE LA PRENDA(S):*\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. *Tee ${item.product.name.replace("Tee '", "").replace("'", "")}*\n`;
      msg += `   - Talla: *${item.selectedSize}*\n`;
      msg += `   - Cantidad: *${item.quantity} und*\n`;
      msg += `   - Precio unit: S/. ${item.product.price.toFixed(2)}\n`;
      msg += `   - Subtotal: *S/. ${(item.product.price * item.quantity).toFixed(2)}*\n`;
    });

    msg += `\n-------------------------------\n`;
    msg += `💵 *Subtotal:* S/. ${cartSubtotal.toFixed(2)}\n`;
    if (checkoutMode === 'delivery') {
      msg += `🚗 *Costo de Delivery:* S/. 10.00\n`;
    }
    msg += `💰 *TOTAL A PAGAR:* S/. ${cartTotal.toFixed(2)}\n\n`;

    msg += `📲 *MÉTODO DE PAGO Y VERIFICACIÓN:*\n`;
    msg += `- Pago realizado vía *YAPE* (S/. ${cartTotal.toFixed(2)})\n`;
    msg += `- Código de Transacción: *${yapeTx.trim() || 'Pendiente enviar captura'}*\n\n`;
    msg += `💬 _*Nota:* Adjunto el comprobante o captura de pantalla de mi yapeo a continuación de este mensaje para programar el despacho._\n\n`;
    msg += `⚡ *"${STORE_TIENDA_INFO.tagline.toUpperCase()}"*`;

    return `https://wa.me/${STORE_TIENDA_INFO.storePhone}?text=${encodeURIComponent(msg)}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (checkoutMode === 'delivery' && !deliveryAddress)) {
      alert('Por favor, completa los campos requeridos (*).');
      return;
    }
    setCheckoutSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${isLight ? 'bg-[#f0f2f5] text-[#121316]' : 'bg-[#07080b] text-[#f4f4f5]'} font-sans antialiased selection:bg-[#ff7da2] selection:text-black transition-colors duration-300`}>
      
      {/* ENTER WELCOME SPLASH SCREEN */}
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            key="shop-splash-entrance"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black text-[#f4f4f5] flex flex-col justify-between overflow-y-auto"
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/splash_cover_1781542865107.jpg"
                alt="Welcome Background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.08] saturate-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
            </div>

            {/* Top Bar Decoration */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center select-none">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
                MZ.B LT.6 // CAPÍTULO I
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-red-950/40 border border-red-900/40 rounded-full px-2.5 py-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIMA - ESTACIÓN LOS JARDINES
              </span>
            </div>

            {/* Main Center Content Grid */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-4 flex flex-col justify-center text-center space-y-8 my-auto">
              
              {/* Brand Typography Header wrapper */}
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-block px-3 py-1 font-mono text-[10px] font-black tracking-widest text-[#ff7da2] bg-[#ff7da2]/10 rounded-full border border-[#ff7da2]/20 uppercase"
                >
                  DE LA CALLE NACE TODO
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-r from-[#5fc1ff] via-[#ff7da2] to-[#6ae29a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,125,162,0.3)] select-none"
                >
                  Mz.B Lt.6
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#f2ea5b] uppercase"
                >
                  Concept Real Streetwear Store
                </motion.p>
              </div>

              {/* Manifest highlights */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto border-t border-b border-zinc-800/85 py-6 font-mono text-left"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">🧵 MATERIA PRIMA</span>
                  <p className="text-xs text-zinc-100 font-bold leading-tight">Algodón Reactivo Limpio de corte pesado de 230 gramos.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">👕 CONFECCIÓN OVERSIZED</span>
                  <p className="text-xs text-zinc-100 font-bold leading-tight">Ancho de cuerpo expandido, hombro caído y basta reforzada.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">🎨 IDENTIDAD LATENTE</span>
                  <p className="text-xs text-zinc-100 font-bold leading-tight">Mensajes cargados de memoria, arte callejero y lucha urbana.</p>
                </div>
              </motion.div>

              {/* Action Welcome Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto w-full pt-2"
              >
                {/* Enter + Start Mixtape cassette block */}
                <button
                  type="button"
                  onClick={() => {
                    setShowEntrance(false);
                    setMusicPlaying(true);
                  }}
                  className="w-full px-5 py-4 rounded-xl font-mono text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#ff7da2] to-pink-600 hover:from-pink-500 hover:to-[#ff7da2] text-black shadow-[0_4px_25px_rgba(255,125,162,0.4)] hover:shadow-[0_4px_30px_rgba(255,125,162,0.6)] cursor-pointer flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <Music className="w-4 h-4 animate-bounce" />
                  <span>ENTRAR CON BEATS</span>
                </button>

                {/* Enter Silent */}
                <button
                  type="button"
                  onClick={() => setShowEntrance(false)}
                  className="w-full px-5 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>ENTRAR SILENCIOSO</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Disclaimer reminder */}
              <span className="text-[9px] font-mono text-zinc-500 italic block mt-2">
                * Para disfrutar la experiencia total de la calle, recomendamos activar los beats en el ingreso.
              </span>

            </div>

            {/* Bottom Credit Signature */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center select-none border-t border-zinc-900/40">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                © MZ.B LT.6 REGISTRADO EN SAN JUAN DE LURIGANCHO - TODOS LOS POLOS SON EXPERIMENTALMENTE OVERSIZED
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <div className={`fixed inset-0 ${isLight ? 'bg-[#f0f2f5]' : 'bg-[#07080b]'} opacity-[0.98] pointer-events-none z-0 transition-colors duration-300`} />
      <div className={`fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${isLight ? 'from-white/45 via-[#e2e8f0] to-[#f0f2f5]' : 'from-zinc-900/40 via-black to-[#07080b]'} pointer-events-none z-0 transition-colors duration-300`} />

      {/* HEADER ANNOUNCEMENT BAR */}
      <div className={`relative z-10 bg-gradient-to-r ${isLight ? 'from-[#5fc1ff]/15 via-[#ff7da2]/15 to-[#6ae29a]/10 border-zinc-200 text-zinc-700' : 'from-[#5fc1ff]/20 via-[#ff7da2]/20 to-[#6ae29a]/10 border-zinc-800 text-zinc-300'} border-b text-center py-2 text-[11px] md:text-xs font-mono font-medium tracking-wider flex flex-col md:flex-row gap-2 justify-center items-center px-4 transition-colors duration-300`}>
        <span className="flex items-center gap-1.5 md:text-left">
          <Sparkles className="w-3.5 h-3.5 text-[#f2ea5b] animate-bounce" />
          <span>POLOS CON CORTE OVERSIZED REAL & ALGODÓN DE EXTREMA CALIDAD</span>
        </span>
        <span className={`hidden md:inline ${isLight ? 'text-zinc-300' : 'text-zinc-650'}`}>|</span>
        <span className={isLight ? 'text-emerald-700 font-bold' : 'text-[#6ae29a]'}>📦 CON DESPACHOS A DELIVERY O RECOJO EN TIENDA</span>
      </div>

      {/* BRAND NAVIGATION HEADER */}
      <header className={`relative z-10 border-b ${isLight ? 'border-zinc-200 bg-white/75 shadow-xs' : 'border-zinc-900/75 bg-black/60'} backdrop-blur-xl sticky top-0 px-4 py-3.5 md:py-4 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo brand representation - accurate to user's attached file font visual and gradient branding */}
          <div className="flex flex-col items-start cursor-pointer group" onClick={() => setActiveTab('catalog')}>
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter bg-gradient-to-r from-[#5fc1ff] via-[#ff7da2] to-[#6ae29a] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,125,162,0.25)] select-none">
              Mz.B Lt.6
            </h1>
            <span className={`text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] ${isLight ? 'text-zinc-600' : 'text-[#f2ea5b]'} uppercase mt-[-2px] group-hover:text-[#ff7da2] transition-colors duration-300`}>
              {STORE_TIENDA_INFO.tagline}
            </span>
          </div>

          {/* Center Tabs Navigation */}
          <div className={`hidden sm:flex items-center gap-2 ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-[#121316]/80 border-zinc-900'} p-1 rounded-lg border transition-all`}>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-1.5 text-xs font-mono transition-all rounded cursor-pointer ${
                activeTab === 'catalog'
                  ? isLight ? 'bg-white text-zinc-950 font-bold shadow-xs' : 'bg-zinc-800/80 text-white font-bold shadow'
                  : isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              👕 CATÁLOGO DE PRENDAS
            </button>
            <button
              onClick={() => setActiveTab('how-to-buy')}
              className={`px-4 py-1.5 text-xs font-mono transition-all rounded cursor-pointer ${
                activeTab === 'how-to-buy'
                  ? isLight ? 'bg-white text-zinc-950 font-bold shadow-xs' : 'bg-zinc-800/80 text-white font-bold shadow'
                  : isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              📲 ¿CÓMO YAPEAR Y COMPRAR?
            </button>
          </div>

          {/* Right Header: Cart and Sizeguide Trigger */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Color mode switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                isLight 
                  ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-650' 
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
              }`}
              title={isLight ? "Voz Oscura" : "Voz Clara"}
              id="theme-toggler"
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-zinc-800" /> : <Sun className="w-3.5 h-3.5 text-yellow-300" />}
            </button>

            {/* Sizing Chart Tool Button */}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] md:text-xs rounded-lg border transition-all cursor-pointer ${
                isLight
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#6ae29a]" />
              <span className="hidden sm:inline">Tabla de Tallas</span>
            </button>

            {/* Shopping Cart Trigger Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg border transition-all hover:brightness-110 flex items-center justify-center shadow-lg cursor-pointer ${
                isLight
                  ? 'bg-gradient-to-b from-white to-zinc-50/90 border-zinc-250 text-zinc-800 shadow-zinc-200/10'
                  : 'bg-gradient-to-b from-zinc-800 to-zinc-900 text-white border-zinc-700/60'
              }`}
              aria-label="Ver bolsa de compras"
              id="shopping-cart-button"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#ff7da2]" />
              {totalItemsCount > 0 && (
                <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#ff7da2] to-pink-600 text-black text-[9px] font-black w-4 md:w-5 h-4 md:h-5 rounded-full flex items-center justify-center animate-pulse border border-[#07080b]">
                  {totalItemsCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MIXTAPE CASSETTE CASSERA MUSIC WIDGET */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-4">
        <div className={`border rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 select-none shadow-xl transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#121419]/90 border-zinc-800/80 text-white'}`}>
          <div className="flex items-center gap-3">
            {/* Spinning mixtape animation mock */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border relative overflow-hidden flex-shrink-0 ${musicPlaying ? 'animate-spin' : ''} ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-800 border-zinc-700'}`} style={{ animationDuration: '10s' }}>
              <div className="w-4 h-4 bg-black rounded-full border border-zinc-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              </div>
            </div>
            
            <div className="text-left font-mono">
              <span className={`text-[9px] font-semibold tracking-wider flex items-center gap-1 ${isLight ? 'text-zinc-550' : 'text-[#ff7da2]'}`}>
                <Music className="w-2.5 h-2.5" /> MZB STREET RADIO mixtapes
              </span>
              <p className={`text-xs p-0 m-0 font-bold max-w-[250px] truncate leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {tracks[activeTrack].title}
              </p>
              <p className="text-[10px] text-zinc-500 m-0 p-0 leading-tight">
                {tracks[activeTrack].author}
              </p>
            </div>
          </div>

          {/* Audio controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTrack((prev) => (prev + 1) % tracks.length);
              }}
              className={`p-1.5 border rounded text-[10px] font-mono transition-all cursor-pointer ${isLight ? 'bg-zinc-105 hover:bg-zinc-200 text-zinc-700 border-zinc-200' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
            >
              SIGUIENTE
            </button>
            <button
              onClick={() => setMusicPlaying(!musicPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                musicPlaying 
                  ? isLight ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800' : 'bg-teal-500/10 border-teal-550/30 text-[#6ae29a]' 
                  : isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-750' : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
              }`}
            >
              {musicPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Sintonizando</span>
                </>
              ) : (
                <>
                  <Play className={`w-3.5 h-3.5 stroke-none ${isLight ? 'fill-emerald-600' : 'fill-[#ff4591]'}`} />
                  <span>PLAY STREET BEATS</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Equalizer simulation */}
          <div className="hidden lg:flex items-end gap-[3px] h-6 px-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-gradient-to-t from-teal-400 to-[#ff7da2] rounded-t"
                style={{
                  height: musicPlaying ? `${Math.floor(Math.random() * 100) + 10}%` : '15%',
                  transition: 'height 160ms ease-in-out',
                  animation: musicPlaying ? `equalizerWave ${1 + (i % 3) * 0.25}s ease-in-out infinite alternate` : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE LOWER NAVIGATION (visible on mobile to easily toggle) */}
      <div className={`sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2 flex justify-around border-t ${isLight ? 'bg-white/95 border-zinc-200 shadow-lg' : 'bg-black/95 border-zinc-900'}`}>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 ${activeTab === 'catalog' ? 'text-[#ff7da2]' : 'text-zinc-500'}`}
        >
          <span className="text-lg">👕</span>
          <span className="text-[10px] font-mono">Ver Catálogo</span>
        </button>
        <button
          onClick={() => setActiveTab('how-to-buy')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 ${activeTab === 'how-to-buy' ? 'text-[11px] text-emerald-600 font-bold' : 'text-zinc-500'}`}
        >
          <span className="text-lg">💰</span>
          <span className="text-[10px] font-mono">¿Cómo Comprar?</span>
        </button>
      </div>

      {/* MAIN VIEWPORT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-24 sm:pb-12 text-center">

        {/* ======================================================== */}
        {/* VIEW: CATALOGUE PRENDAS */}
        {/* ======================================================== */}
        {activeTab === 'catalog' && (
          <div>
            
            {/* LOOKBOOK INTERACTIVE IMAGE SLIDER */}
            <div className={`relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden mb-10 group shadow-lg transition-all duration-300 ${isLight ? 'border border-zinc-200' : 'border border-zinc-900 bg-zinc-950/20'}`}>
              
              {/* Slides wrapper with motion layout */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Background model image */}
                    <img
                      src={lookbookSlides[currentSlide].image}
                      alt={lookbookSlides[currentSlide].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Ambient Gritty Radial & Bottom Overlay Gradients */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-white/95 via-white/40 to-transparent/25' : 'from-black/95 via-black/40 to-transparent/25'}`} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Foreground content overlays */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10 text-left z-10 select-none">
                <div className="max-w-xl space-y-1.5 md:space-y-3">
                  <span className={`inline-block px-2 py-0.5 text-[8px] md:text-[10px] font-mono font-black uppercase tracking-widest rounded-sm ${isLight ? 'bg-zinc-900 text-white' : 'bg-[#ff7da2] text-black'}`}>
                    {lookbookSlides[currentSlide].collection}
                  </span>
                  
                  <h1 className={`text-xl md:text-4xl font-extrabold font-sans tracking-tight italic leading-none uppercase ${isLight ? 'text-zinc-950' : 'text-white'}`}>
                    {lookbookSlides[currentSlide].title}
                  </h1>
                  
                  <p className={`text-[10px] md:text-sm font-sans max-w-sm font-medium leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                    {lookbookSlides[currentSlide].subtitle}
                  </p>

                  <div className="pt-1 md:pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setCategoryFilter(lookbookSlides[currentSlide].categoryId);
                        document.getElementById('catalog-filters')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-xs font-mono font-black tracking-wider uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer hover:scale-103 ${isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-100'}`}
                    >
                      <span>{lookbookSlides[currentSlide].buttonLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest hidden sm:inline">
                      ⚡ OVERSIZED EDITIONS
                    </span>
                  </div>
                </div>
              </div>

              {/* Prev/Next manual buttons */}
              <button
                type="button"
                onClick={() => setCurrentSlide((currentSlide - 1 + lookbookSlides.length) % lookbookSlides.length)}
                className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full border opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-15 ${isLight ? 'bg-white/80 hover:bg-white border-zinc-200 text-zinc-800' : 'bg-black/60 hover:bg-black/90 border-zinc-800 text-white'}`}
                aria-label="Anterior diapositiva"
              >
                <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentSlide((currentSlide + 1) % lookbookSlides.length)}
                className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full border opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-15 ${isLight ? 'bg-white/80 hover:bg-white border-zinc-200 text-zinc-800' : 'bg-black/60 hover:bg-black/90 border-zinc-800 text-white'}`}
                aria-label="Siguiente diapositiva"
              >
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute right-5 top-5 flex gap-1 z-10">
                {lookbookSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-4 h-1 md:w-6 transition-all cursor-pointer rounded-full ${
                      idx === currentSlide
                        ? isLight ? 'bg-zinc-950' : 'bg-[#ff7da2]'
                        : isLight ? 'bg-zinc-200' : 'bg-zinc-800'
                    }`}
                    aria-label={`Ir a diapositiva ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

            {/* HERO INTRODUCTION */}
            <div className="text-center mb-8 max-w-2xl mx-auto space-y-3">
              <span className={`inline-block px-3 py-1 rounded-full ${isLight ? 'bg-zinc-100 border-zinc-200 text-emerald-700' : 'bg-zinc-950 border border-zinc-800 text-[#ff7da2]'} font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none`}>
                🔥 CALLE, LUCHA Y RESISTENCIA
              </span>
              <h2 className={`text-3xl md:text-5xl font-extrabold italic tracking-tight font-sans leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                COLECCIÓN COYUNTURA URBANA
              </h2>
              <p className={`text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'} font-medium leading-relaxed font-sans max-w-lg mx-auto`}>
                Modelos exclusivos de polos streetwear de corte oversize real. Confección en algodón reactivo premium de exportación. Cada diseño carga un manifiesto.
              </p>
            </div>

            {/* SEPARATE STREET FILTERS */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" id="catalog-filters">
              {[
                { id: 'all', label: '🔥 TODAS LAS COLECCIONES' },
                { id: 'coyuntura', label: '⚡ COLL. COYUNTURA' },
                { id: 'raices', label: '🌱 COLL. RAÍCES' },
                { id: 'esenciales', label: '📦 COLL. ESENCIALES' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`px-3 py-2 text-xs font-mono font-bold tracking-tight border rounded-lg transition-all cursor-pointer ${
                    categoryFilter === category.id
                      ? isLight 
                        ? 'bg-[#121316] text-white border-[#121316] shadow-sm' 
                        : 'bg-[#ffffff] text-black border-[#ffffff] shadow-lg'
                      : isLight 
                        ? 'bg-white text-zinc-650 border-zinc-200 hover:text-black hover:bg-zinc-50' 
                        : 'bg-[#121316]/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* PRODUCT CATALOG GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
              {filteredProducts.map((product) => {
                const activeSide = cardSides[product.id] || 'front';
                const chosenSize = selectedSizes[product.id] || 'M';

                return (
                  <motion.div
                    key={product.id}
                    layoutId={`product-card-${product.id}`}
                    onClick={() => {
                      setSelectedProduct(product);
                      setDetailSide('front');
                    }}
                    className={`group border rounded-2xl overflow-hidden transition-all cursor-pointer flex flex-col h-full text-left relative ${isLight ? 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm' : 'bg-[#111215]/80 border-zinc-800/80 hover:border-zinc-700'}`}
                  >
                    
                    {/* Bestseller Badge */}
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-[#ff7da2] to-red-600 text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-sm uppercase z-10 shadow-lg">
                        BEST SELLER
                      </span>
                    )}

                    {/* Tag badge */}
                    {product.tag && (
                      <span className={`absolute top-3 right-3 border text-[8px] font-mono tracking-widest px-2 py-0.5 rounded-sm uppercase z-10 ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-zinc-950/95 border-zinc-800 text-zinc-300'}`}>
                        {product.tag}
                      </span>
                    )}

                    {/* INTERACTIVE SHIRT IMAGE CONTAINER */}
                    <div className={`relative p-2 bg-gradient-to-b ${isLight ? 'from-zinc-50 via-zinc-100/50 to-zinc-50/20' : 'from-[#16171d]/10 via-[#07080b]/90 to-[#121318]/40'}`}>
                      
                      {/* Live T-shirt Mockup */}
                      <ShirtMockup
                        productId={product.id}
                        side={activeSide}
                        className="group-hover:scale-[1.02] transition-transform duration-350"
                      />

                      {/* ROTATE AND TRIGGER SIDES CONTROLLER */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => toggleCardSide(product.id, e)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-mono font-bold rounded-lg border shadow-lg transition-all cursor-pointer ${isLight ? 'bg-white/95 hover:bg-white text-zinc-800 border-zinc-200 hover:text-black' : 'bg-black/85 hover:bg-black text-white border-zinc-800/80'}`}
                        >
                          <RotateCw className="w-3 h-3 text-[#ff7da2]" />
                          <span>VER {activeSide === 'front' ? 'ESPALDA' : 'DELANTERO'}</span>
                        </button>
                      </div>

                      {/* FRONT VS BACK ACTIVE DOT INDICATOR */}
                      <div className="absolute bottom-5 left-6 flex gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${activeSide === 'front' ? 'bg-[#5fc1ff]' : 'bg-zinc-700'}`} />
                        <div className={`w-1.5 h-1.5 rounded-full ${activeSide === 'back' ? 'bg-[#5fc1ff]' : 'bg-zinc-700'}`} />
                      </div>
                    </div>

                    {/* CARD INFO BODY */}
                    <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-extrabold text-sm md:text-base transition-colors duration-200 ${isLight ? 'text-zinc-850 group-hover:text-black' : 'text-zinc-100 group-hover:text-white'}`}>
                            {product.name}
                          </h3>
                          <span className={`text-sm md:text-base font-black font-mono whitespace-nowrap ${isLight ? 'text-[#a15cc4]' : 'text-[#f2ea5b]'}`}>
                            S/. {product.price.toFixed(2)}
                          </span>
                        </div>
                        
                        <p className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'} font-sans line-clamp-2 leading-relaxed`}>
                          {product.description}
                        </p>
                      </div>

                      {/* Fabric wash & texture helper details */}
                      <div className={`flex items-center gap-2 p-1.5 rounded-lg border text-[9px] font-mono select-none ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-650' : 'bg-zinc-950/50 border-zinc-900 text-zinc-400'}`}>
                        <span className={`${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'} font-bold`}>WASH:</span>
                        <span className="truncate">{product.wash}</span>
                      </div>

                      {/* BUTTON ACTION AND SIZE SELECTION BAR */}
                      <div onClick={(e) => e.stopPropagation()} className={`space-y-3 pt-1 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-900'}`}>
                        {/* Size labels selection */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Tallas:</span>
                          <div className="flex gap-1">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => {
                                  setSelectedSizes(prev => ({
                                    ...prev,
                                    [product.id]: size
                                  }));
                                }}
                                className={`w-7 h-7 font-mono text-[10px] font-bold rounded-md flex items-center justify-center transition-all cursor-pointer ${
                                  chosenSize === size
                                    ? 'bg-[#ff7da2] text-black font-black'
                                    : isLight
                                      ? 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Complete Buy Button */}
                        <button
                          onClick={() => handleAddToCart(product, chosenSize)}
                          className={`w-full py-2.5 font-mono text-[11px] font-black tracking-wider uppercase rounded-xl border transition-all flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer ${isLight ? 'bg-zinc-100 text-zinc-850 hover:bg-zinc-950 hover:text-white border-zinc-200 shadow-xs' : 'bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-white hover:to-white hover:text-black border-zinc-800'}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#ff7da2]" />
                          <span>AGREGAR CON TALLA {chosenSize}</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW: ¿CÓMO YAPEAR Y COMPRAR? */}
        {/* ======================================================== */}
        {activeTab === 'how-to-buy' && (
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="text-center space-y-2 mb-4">
              <h2 className={`text-2xl md:text-3.5xl font-extrabold italic font-sans ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                ¿CÓMO ADQUIRIR MIS POLOS?
              </h2>
              <p className={`text-xs md:text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Sigue estos sencillos pasos para comprar de manera segura mediante Yape y WhatsApp.
              </p>
            </div>

            <PaymentInstructions theme={theme} />

            {/* Sizing guides integrated below */}
            <div className="mt-8">
              <h3 className={`text-lg font-bold mb-3 font-sans flex items-center gap-2 ${isLight ? 'text-zinc-850' : 'text-zinc-100'}`}>
                <span>📏 ¿Tienes dudas con tu talla?</span>
              </h3>
              <SizeGuide theme={theme} />
            </div>

            {/* Store Information */}
            <div className={`border rounded-xl p-5 text-sm space-y-3 font-sans transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200 shadow-xs' : 'bg-[#121316] border-zinc-800'}`}>
              <h3 className={`font-extrabold text-sm font-mono uppercase tracking-wider ${isLight ? 'text-[#9d246c]' : 'text-[#5fc1ff]'}`}>
                🏪 UBICACIÓN Y RECOJO DE PRODUCTOS (GRATUITO)
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-650' : 'text-zinc-300'}`}>
                Nuestra tienda y taller está ubicado estratégicamente en **San Juan de Lurigancho**, a pasos de la estación del metro. Puedes recoger tus pedidos directamente sin costo adicional.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="space-y-1">
                  <span className={`${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'} font-bold block`}>🏠 DIRECCIÓN:</span>
                  <span className={`block break-words ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{STORE_TIENDA_INFO.storeAddress}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#ff7da2] font-bold block">⏰ HORARIO DE ENTREGA:</span>
                  <span className={`block ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{STORE_TIENDA_INFO.storeHours}</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-6 py-3 font-mono font-black text-xs rounded-xl transition-all uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer ${isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-[#ffffff] text-black hover:bg-zinc-250'}`}
              >
                <span>IR AL CATÁLOGO DE PRENDAS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* DIALOG-MODAL: PRODUCT DESCRIPTION DETAILS OVERLAY */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Dark background blur override */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Full descriptive overlay box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-4xl border rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-none transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0d10] border-zinc-800 text-zinc-100'}`}
            >
              
              {/* Close button modal header override */}
              <button
                onClick={() => setSelectedProduct(null)}
                className={`absolute top-4 right-4 p-2 border rounded-full z-20 transition-all cursor-pointer ${isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-650 hover:text-black' : 'bg-black/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT COLUMN: VISUAL ARTWORK DISPLAY WITH ROTATIONS */}
              <div className={`w-full md:w-[45%] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r transition-colors duration-305 ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#08090c] border-zinc-800/80'}`}>
                
                <h4 className={`text-[10px] font-mono font-semibold tracking-wider mb-2 self-start uppercase ${isLight ? 'text-[#9d246c]' : 'text-[#ff7da2]'}`}>
                  ⚡ Previsualizador Streetwear
                </h4>

                <ShirtMockup
                  productId={selectedProduct.id}
                  side={detailSide}
                  className="w-full"
                />

                {/* Left side detail control selectors */}
                <div className="flex gap-2 mt-4 w-full justify-center">
                  <button
                    onClick={() => setDetailSide('front')}
                    className={`flex-1 max-w-[140px] py-1.5 font-mono text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      detailSide === 'front'
                        ? isLight ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-white text-black border-white'
                        : isLight ? 'bg-zinc-100 border-zinc-205 text-zinc-600 hover:text-black hover:bg-zinc-200' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    VISTA FRONTAL
                  </button>
                  <button
                    onClick={() => setDetailSide('back')}
                    className={`flex-1 max-w-[140px] py-1.5 font-mono text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      detailSide === 'back'
                        ? isLight ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-white text-black border-white'
                        : isLight ? 'bg-zinc-100 border-zinc-205 text-zinc-600 hover:text-black hover:bg-zinc-200' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    VISTA ESPALDA
                  </button>
                </div>

                {/* Slogan Quote card inside */}
                {selectedProduct.quote && (
                  <div className={`mt-4 p-3.5 rounded-lg border w-full text-center relative overflow-hidden transition-colors ${isLight ? 'bg-zinc-100/50 border-zinc-200 text-zinc-650' : 'bg-black border-zinc-800/60 text-zinc-300'}`}>
                    <span className="absolute top-1 left-2 text-[20px] font-serif text-[#ff7da2]/25 opacity-35 leading-none">&ldquo;</span>
                    <p className="text-[11px] font-mono font-bold tracking-tight italic p-0 m-0 leading-normal">
                      {selectedProduct.quote}
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: DETAIL VALUES, STORIES, SIZE SELECTION, SEED CONTROLS */}
              <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
                
                <div className="space-y-4 font-mono text-left">
                  
                  {/* Category, Sizing and Pricing Header */}
                  <div className="text-left">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm ${isLight ? 'bg-[#9d246c]/10 text-zinc-805' : 'bg-teal-900/20 text-[#6ae29a]'}`}>
                      {selectedProduct.category.toUpperCase()}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-black italic tracking-tight mt-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {selectedProduct.name}
                    </h3>
                    <div className={`text-xl font-bold mt-1 ${isLight ? 'text-[#9d246c]' : 'text-[#f2ea5b]'}`}>
                      S/. {selectedProduct.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Brand narrative details */}
                  <div className="space-y-1.5 leading-relaxed text-left">
                    <span className="text-[10px] text-zinc-500 uppercase font-black block">CONCEPTO DE LA PRENDA:</span>
                    <p className={`text-xs leading-relaxed font-sans ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                      {selectedProduct.longDescription}
                    </p>
                  </div>

                  {/* Sizing selector buttons */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] text-zinc-500 uppercase font-black block">SELECCIONA TU TALLA:</span>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((size) => {
                        const productChosenSize = selectedSizes[selectedProduct.id] || 'M';
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setSelectedSizes(prev => ({
                                ...prev,
                                [selectedProduct.id]: size
                              }));
                            }}
                            className={`w-9 h-9 font-mono text-xs font-bold rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                              productChosenSize === size
                                ? 'bg-[#ff7da2] text-black font-black scale-105'
                                : isLight
                                  ? 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product physical traits specs */}
                  <div className="space-y-2 text-left">
                    <span className="text-[10px] text-zinc-500 uppercase font-black block">ESPECIFICACIONES CONSTRUCTIVAS:</span>
                    <ul className="grid grid-cols-1 gap-1 pl-0 m-0 text-left">
                      {selectedProduct.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs font-sans">
                          <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'}`} />
                          <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Brief care info */}
                  <div className={`p-3 rounded-xl border grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-650' : 'bg-zinc-950/80 border-zinc-900 text-zinc-400'}`}>
                    <div>👕 COLOR: <span className={`${isLight ? 'text-zinc-900 font-bold' : 'text-white'} block font-sans font-normal`}>{selectedProduct.color}</span></div>
                    <div>🧪 TRATAMIENTO: <span className={`${isLight ? 'text-zinc-900 font-bold' : 'text-white'} block font-sans font-normal`}>{selectedProduct.wash}</span></div>
                  </div>

                </div>

                {/* Final Checkout action Add inside detailed Modal */}
                <div className={`pt-6 mt-6 border-t space-y-3 ${isLight ? 'border-zinc-200' : 'border-zinc-900'}`}>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Talla elegida:</span>
                    <strong className={`${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'} text-sm`}>{(selectedSizes[selectedProduct.id] || 'M')} (Oversized Boxy Fit)</strong>
                  </div>

                  <button
                    onClick={() => {
                      const sz = selectedSizes[selectedProduct.id] || 'M';
                      handleAddToCart(selectedProduct, sz);
                      setSelectedProduct(null);
                    }}
                    className={`w-full py-3 font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-[#ffffff] hover:bg-zinc-250 text-black'}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>AÑADIR AL CARRITO</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* DRAWER: SHOPPING CART SIDE DRAWER */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Absolute background close click overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className={`w-screen max-w-md border-l flex flex-col h-full shadow-2xl relative transition-all duration-300 ${isLight ? 'bg-white border-zinc-200' : 'bg-[#0a0b0d] border-l border-zinc-800'}`}
              >
                
                {/* Header of shopping list */}
                <div className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0e0f12] border-zinc-800'}`}>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#ff7da2]" />
                    <span className={`font-mono text-xs font-extrabold uppercase tracking-widest ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      Bolsa de Compras ({totalItemsCount})
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isLight ? 'hover:bg-zinc-200 text-zinc-500 hover:text-black' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}
                    aria-label="Cerrar carrito"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 space-y-4 font-mono text-xs">
                      <div className="text-4xl text-zinc-750">🛒</div>
                      <p className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>Tu carrito se encuentra vacío.</p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setActiveTab('catalog');
                        }}
                        className={`px-4 py-2 rounded-lg border tracking-wider uppercase text-[10px] cursor-pointer transition-all ${isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-350' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800'}`}
                      >
                        Descubrir Polos
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      
                      {/* CART ITEMS SUMMARY LIST */}
                      <div className={`divide-y ${isLight ? 'divide-zinc-200/80' : 'divide-zinc-900'}`}>
                        {cart.map((item) => (
                          <div key={item.id} className="py-3 flex gap-3 h-auto items-start justify-between font-sans">
                            
                            {/* Visual Miniature shirt */}
                            <div className={`w-14 h-14 border rounded-lg overflow-hidden flex-shrink-0 relative p-1 transition-colors ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
                              <ShirtMockup productId={item.product.id} side="front" className="scale-120" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-left text-xs min-w-0 font-mono">
                              <h4 className={`font-bold font-sans text-xs truncate max-w-[170px] ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                                {item.product.name}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[9px]">
                                <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[8px] ${isLight ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-805 bg-zinc-800 text-white'}`}>TALLA {item.selectedSize}</span>
                                <span className={`${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'} font-bold`}>S/. {item.product.price.toFixed(2)} c/u</span>
                              </div>
                              
                              {/* Quantity selection counter widgets */}
                              <div className="flex items-center gap-1.5 mt-2 select-none">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition-all ${isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700' : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-850 text-zinc-300'}`}
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className={`w-5 text-center text-[11px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition-all ${isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700' : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-850 text-zinc-300'}`}
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal of item & Delete */}
                            <div className="text-right space-y-2 flex flex-col justify-between h-full items-end">
                              <span className={`font-mono text-xs font-bold block ${isLight ? 'text-[#9d246c]' : 'text-[#f2ea5b]'}`}>
                                S/. {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-[10px] font-mono text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                              >
                                Quitar
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* CHECKOUT SCHEME CONTROL FORM */}
                      <form onSubmit={handleCheckoutSubmit} className={`pt-4 border-t space-y-4 text-left ${isLight ? 'border-zinc-200' : 'border-zinc-900'}`}>
                        
                        <div className={`flex flex-col gap-1 pb-2 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-900'}`}>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">
                            1. MODALIDAD DE ENTREGA o RECOJO
                          </span>
                          
                          {/* Toggle checkout scheme */}
                          <div className="flex gap-2.5 mt-1.5 select-none">
                            <button
                              type="button"
                              onClick={() => setCheckoutMode('delivery')}
                              className={`flex-1 py-2 font-mono text-[10px] font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                checkoutMode === 'delivery'
                                  ? isLight
                                    ? 'bg-zinc-950 border-zinc-950 text-white font-black shadow-xs'
                                    : 'bg-zinc-800 border-zinc-700 text-[#5fc1ff] font-black'
                                  : isLight
                                    ? 'bg-zinc-50 border-zinc-200 text-zinc-550 hover:text-black hover:bg-zinc-100'
                                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>ENVÍO DELIVERY</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setCheckoutMode('pickup')}
                              className={`flex-1 py-2 font-mono text-[10px] font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                checkoutMode === 'pickup'
                                  ? isLight
                                    ? 'bg-zinc-950 border-zinc-950 text-white font-black shadow-xs'
                                    : 'bg-zinc-800 border-zinc-700 text-[#6ae29a] font-black'
                                  : isLight
                                    ? 'bg-zinc-50 border-zinc-200 text-zinc-550 hover:text-black hover:bg-zinc-100'
                                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>RECOJO EN TIENDA</span>
                            </button>
                          </div>
                        </div>

                        {/* Customer direct parameters form inputs */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">
                            2. DATOS DEL COMPRADOR (Y COMPROBANTE)
                          </span>
                          
                          <div className="space-y-2 font-mono text-xs">
                            <div>
                              <label className="text-[9px] text-zinc-500 block mb-1">Nombre Completo *</label>
                              <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Ingresa tu nombre y apellido"
                                className={`w-full rounded-lg p-2.5 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-zinc-500' : 'bg-[#121316] border border-zinc-800/80 text-white focus:border-zinc-750'}`}
                                required
                              />
                            </div>

                            <div>
                              <label className="text-[9px] text-zinc-500 block mb-1">Teléfono de Contacto (WhatsApp) *</label>
                              <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Ej: 987654321"
                                className={`w-full rounded-lg p-2.5 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-zinc-500' : 'bg-[#121316] border border-zinc-800/80 text-white focus:border-zinc-750'}`}
                                required
                              />
                            </div>

                            {/* Conditionally rendering inputs based on delivery vs pickup */}
                            {checkoutMode === 'delivery' ? (
                              <div className="space-y-2">
                                <div>
                                  <label className="text-[9px] text-zinc-500 block mb-1">Dirección Exacta de Envío *</label>
                                  <textarea
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="Calle, avenida, Nro, dpto, urbanización y Distrito"
                                    className={`w-full rounded-lg p-2.5 text-xs focus:outline-none transition-colors h-14 resize-none ${isLight ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-zinc-500' : 'bg-[#121316] border border-zinc-800/80 text-white focus:border-zinc-750'}`}
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] text-zinc-500 block mb-1">Referencia obligatoria de envío *</label>
                                  <input
                                    type="text"
                                    value={deliveryReference}
                                    onChange={(e) => setDeliveryReference(e.target.value)}
                                    placeholder="Ej: Frente al parque, casa de rejas negras, etc."
                                    className={`w-full rounded-lg p-2.5 text-xs focus:outline-none transition-colors ${isLight ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-zinc-500' : 'bg-[#121316] border border-zinc-800/80 text-white focus:border-zinc-750'}`}
                                    required
                                  />
                                </div>
                              </div>
                            ) : (
                              /* Pickup Store static instructions displayed cleanly */
                              <div className={`p-3 border rounded-lg space-y-1 font-sans leading-snug transition-colors ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-zinc-950/70 border-zinc-900 text-zinc-400'}`}>
                                <span className={`font-mono text-[9px] font-bold block uppercase ${isLight ? 'text-emerald-700' : 'text-[#6ae29a]'}`}>
                                  📍 ¿DÓNDE RECOGER?
                                </span>
                                <p className={`text-[11.5px] leading-tight font-semibold ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                                  {STORE_TIENDA_INFO.storeAddress}
                                </p>
                                <span className={`text-[10px] block ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                  🕜 Horarios: {STORE_TIENDA_INFO.storeHours}
                                </span>
                              </div>
                            )}

                            {/* YAPE INPUT FOR CONFIRMATION CODE */}
                            <div className="pt-2">
                              <div className={`border p-3 rounded-lg space-y-2 transition-colors ${isLight ? 'bg-[#9d246c]/5 border-[#9d246c]/15' : 'bg-[#18131e] border-[#a15cc4]/20'}`}>
                                <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${isLight ? 'text-[#9d246c]' : 'text-[#ff7da2]'}`}>
                                  <Coins className="w-3.5 h-3.5 text-[#f2ea5b] fill-current text-purple-700" />
                                  <span>3. YAPE de Confirmación</span>
                                </div>
                                <p className={`text-[10px] font-sans leading-snug ${isLight ? 'text-zinc-650' : 'text-zinc-400'}`}>
                                  Envía un pago de <strong className={isLight ? 'text-zinc-900' : 'text-white'}>S/. {cartTotal.toFixed(2)}</strong> al celular <strong className={isLight ? 'text-zinc-900' : 'text-white'}>{STORE_TIENDA_INFO.yapeNumber}</strong>. Escribe el número de transacción de 8 dígitos aquí abajo para confirmar de inmediato.
                                </p>
                                <input
                                  type="text"
                                  value={yapeTx}
                                  onChange={(e) => setYapeTx(e.target.value)}
                                  placeholder="Código de Operación (Yape)"
                                  className={`w-full rounded-lg p-2.5 text-xs text-center tracking-widest font-black focus:outline-none transition-colors ${isLight ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-[#9d246c]' : 'bg-[#0a0b0d] border border-zinc-800/80 text-white focus:border-[#a15cc4]'}`}
                                />
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Submit Order Trigger Form button */}
                        <div className="pt-3">
                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-mono text-center font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:brightness-105 cursor-pointer"
                          >
                            ✅ VALIDAR REGISTRO DE DATOS
                          </button>
                        </div>

                      </form>

                    </div>
                  )}
                </div>

                {/* Footer Pricing Summary & Send WhatsApp Receipt */}
                {cart.length > 0 && (
                  <div className={`p-4 border-t text-left space-y-4 transition-colors ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0e0f12] border-zinc-800'}`}>
                    
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-zinc-550">
                        <span>Subtotal Prendas:</span>
                        <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>S/. {cartSubtotal.toFixed(2)}</span>
                      </div>
                      
                      {checkoutMode === 'delivery' && (
                        <div className="flex justify-between text-zinc-550">
                          <span>Delivery (Lima standard):</span>
                          <span className={`${isLight ? 'text-blue-750' : 'text-[#5fc1ff]'} font-semibold`}>S/. 10.00</span>
                        </div>
                      )}

                      <div className={`flex justify-between text-sm pt-2 border-t font-bold ${isLight ? 'border-zinc-200' : 'border-zinc-900'}`}>
                        <span className={isLight ? 'text-zinc-950' : 'text-white'}>Monto Total:</span>
                        <span className={`text-base ${isLight ? 'text-[#9d246c]' : 'text-[#f2ea5b]'}`}>S/. {cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* REDIRECT TO WHATSAPP ACTION COMPILER */}
                    <AnimatePresence>
                      {checkoutSubmitted ? (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-2.5"
                        >
                          <div className={`p-3.5 rounded-xl border text-center transition-colors ${isLight ? 'bg-emerald-50/50 border-emerald-300 text-zinc-800' : 'bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-black border-emerald-500/20 text-zinc-400'}`}>
                            <span className={`text-[10px] font-mono font-bold block uppercase ${isLight ? 'text-emerald-800' : 'text-[#6ae29a]'}`}>
                              🎉 DATOS VERIFICADOS CON ÉXITO
                            </span>
                            <p className="text-[11px] font-sans mt-1">
                              Todo listo para compilar tu pedido en formato oficial de WhatsApp. Haz clic abajo para enviarlo.
                            </p>
                          </div>

                          {/* Beautiful direct <a> anchor button to avoid browser blocks */}
                          <a
                            href={generateWhatsAppMessage()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-[#25d366] hover:bg-[#20ba5a] text-black text-center font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                          >
                            <Phone className="w-4 h-4 fill-black stroke-none" />
                            <span>ENVIAR PEDIDO POR WHATSAPP</span>
                          </a>
                        </motion.div>
                      ) : (
                        <div className={`p-3 text-center rounded-xl border transition-colors ${isLight ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-zinc-950 text-[#ff7da2] border-zinc-900'}`}>
                          <span className="text-[10.5px] font-mono">
                            ⚠️ Completa y valida tus datos de envío arriba para activar el envío por WhatsApp
                          </span>
                        </div>
                      )}
                    </AnimatePresence>

                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SIZING CHART POPUP MODAL (always accessible globally) */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-lg border rounded-2xl overflow-hidden shadow-2xl z-10 p-5 space-y-4 transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#101114] border-zinc-800 text-zinc-100'}`}
            >
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className={`absolute top-4 right-4 p-1.5 border rounded-full z-10 cursor-pointer transition-colors ${isLight ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-500 hover:text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'}`}
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="pt-2 text-left">
                <SizeGuide theme={theme} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

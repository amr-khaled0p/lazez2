
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, Twitter, ChevronRight, User, Globe, Trash2, Plus, Minus } from 'lucide-react';
import { AppProvider, useApp } from './AppContext';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, t, lang } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeDeliveryThreshold = 50;
  const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col`}
          >
            <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-2xl font-black">{t.cart.title}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-bold">{t.cart.empty}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-4 rtl:space-x-reverse border-b pb-6">
                    <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt={item.name} />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brandDark">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-primary">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-50 p-1 rounded-xl">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
                            <Minus size={14} />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-gray-500">
                    <span>{subtotal >= freeDeliveryThreshold ? t.cart.freeDeliveryUnlocked : t.cart.freeDeliveryAt}</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-bold">{t.cart.subtotal}</span>
                  <span className="text-2xl font-black text-brandDark">${subtotal.toFixed(2)}</span>
                </div>

                <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover-scale shadow-xl shadow-red-200">
                  {t.cart.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { lang, setLang, t, setIsCartOpen, cart } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.menu, path: '/menu' },
    { name: t.nav.locations, path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 soft-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-3xl font-black text-primary tracking-tighter">LAZEZ</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Lang Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe size={20} className="text-gray-600" />
              <span className="text-sm font-black uppercase">{lang === 'en' ? 'Ar' : 'En'}</span>
            </button>

            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={22} className="text-gray-600" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-primary text-white px-5 py-2.5 rounded-full font-bold flex items-center space-x-2 rtl:space-x-reverse hover-scale active:scale-95 shadow-lg shadow-red-200 relative"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">{t.nav.orderNow}</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-brandDark text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:text-primary">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-lg font-bold text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-lg font-bold text-gray-700 hover:bg-gray-50 rounded-xl">
                {t.nav.profile}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <CartDrawer />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          {/* Footer removed for brevity, but assume it exists as before with translations */}
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

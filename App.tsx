
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, Twitter, ChevronRight, User, Globe, Trash2, Plus, Minus, LogOut, ShieldCheck, LogIn } from 'lucide-react';
import { AppProvider, useApp } from './AppContext';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t, login } = useApp();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
            <h2 className="text-4xl font-black text-brandDark mb-2 relative z-10">{t.auth.title}</h2>
            <p className="text-gray-400 font-bold mb-8 relative z-10">{t.auth.adminHint}</p>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">{t.auth.email}</label>
                <input 
                  type="email" 
                  required
                  placeholder={t.auth.placeholder}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover-scale shadow-xl shadow-red-100 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <span>{t.auth.loginBtn}</span>
                <ChevronRight size={20} className="rtl:rotate-180" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, t, lang } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeDeliveryThreshold = 50;
  const progress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" />
          <motion.div
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            className={`fixed top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col`}
          >
            <div className="p-8 border-b flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-3xl font-black">{t.cart.title}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={56} className="text-gray-300" />
                  </div>
                  <p className="text-xl text-gray-500 font-bold">{t.cart.empty}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex space-x-6 rtl:space-x-reverse border-b border-gray-50 pb-8">
                    <img src={item.image} className="w-24 h-24 rounded-[2rem] object-cover shadow-lg" alt={item.name} />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-black text-brandDark">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-primary transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-100 p-1.5 rounded-2xl">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-transform">
                            <Minus size={16} />
                          </button>
                          <span className="font-black text-lg w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-transform">
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-black text-2xl text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-black text-gray-500 uppercase tracking-widest">
                    <span>{subtotal >= freeDeliveryThreshold ? t.cart.freeDeliveryUnlocked : t.cart.freeDeliveryAt}</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 font-bold text-lg">{t.cart.subtotal}</span>
                  <span className="text-4xl font-black text-brandDark">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-xl hover-scale shadow-2xl shadow-red-200">
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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { lang, setLang, t, setIsCartOpen, cart, user, logout } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.menu, path: '/menu' },
    { name: t.nav.locations, path: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 soft-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
              <span className="text-4xl font-black text-primary tracking-tighter group-hover:scale-105 transition-transform">LAZEZ</span>
              <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-lg shadow-yellow-200"></div>
            </Link>

            <div className="hidden lg:flex items-center space-x-10 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-black uppercase tracking-widest transition-all ${
                    location.pathname === link.path ? 'text-primary scale-110' : 'text-gray-500 hover:text-primary hover:scale-110'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse p-3 hover:bg-gray-50 rounded-2xl transition-all">
                <Globe size={22} className="text-gray-600" />
                <span className="text-sm font-black uppercase tracking-widest">{lang === 'en' ? 'Ar' : 'En'}</span>
              </button>

              {user ? (
                <div className="relative group/user">
                  <Link to="/profile" className="flex items-center space-x-3 rtl:space-x-reverse p-2 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <User size={20} />
                    </div>
                    <span className="hidden md:block text-sm font-black text-brandDark max-w-[80px] truncate">{user.name}</span>
                  </Link>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-100 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all p-4">
                    <Link to="/profile" className="flex items-center space-x-3 rtl:space-x-reverse p-4 hover:bg-gray-50 rounded-2xl font-bold text-gray-600 mb-2">
                      <User size={18} />
                      <span>{t.nav.profile}</span>
                    </Link>
                    {user.isAdmin && (
                      <Link to="/profile" className="flex items-center space-x-3 rtl:space-x-reverse p-4 hover:bg-primary/5 rounded-2xl font-bold text-primary mb-2">
                        <ShieldCheck size={18} />
                        <span>{t.admin.manageMenu}</span>
                      </Link>
                    )}
                    <button onClick={logout} className="w-full flex items-center space-x-3 rtl:space-x-reverse p-4 hover:bg-red-50 rounded-2xl font-bold text-red-500 transition-colors">
                      <LogOut size={18} />
                      <span>{t.profile.logout}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="p-3 hover:bg-gray-50 rounded-2xl transition-all">
                  <LogIn size={24} className="text-gray-600" />
                </button>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-primary text-white p-4 rounded-[1.5rem] font-bold flex items-center space-x-2 rtl:space-x-reverse hover-scale active:scale-95 shadow-2xl shadow-red-200 relative"
              >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-brandDark text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-black border-[3px] border-white shadow-lg">
                    {cart.length}
                  </span>
                )}
              </button>

              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 text-gray-600 hover:text-primary transition-colors">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
              <div className="px-6 py-10 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block px-6 py-5 text-xl font-black text-gray-700 hover:bg-gray-50 rounded-[2rem]">
                    {link.name}
                  </Link>
                ))}
                <button onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsOpen(false); }} className="w-full flex items-center space-x-4 rtl:space-x-reverse px-6 py-5 text-xl font-black text-gray-700 hover:bg-gray-50 rounded-[2rem]">
                  <Globe size={24} />
                  <span>{lang === 'en' ? 'Arabic' : 'English'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

const Footer: React.FC = () => {
  const { t } = useApp();
  return (
    <footer className="bg-brandDark text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">LAZEZ</h2>
            <p className="text-gray-400 text-xl max-w-md leading-relaxed font-medium">
              We're redefining fast food with premium craftsmanship and a commitment to flavor excellence.
            </p>
            <div className="flex space-x-5 rtl:space-x-reverse mt-10">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-white/5 p-4 rounded-2xl hover:bg-primary hover:scale-110 transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-8 text-accent">Discover</h3>
            <ul className="space-y-6">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-lg font-bold">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors text-lg font-bold">Menu</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-lg font-bold">Locations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-8 text-accent">Contact</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 rtl:space-x-reverse group">
                <MapPin size={24} className="text-primary group-hover:scale-125 transition-transform" />
                <span className="text-gray-400 font-bold text-lg">Main Nile St, City Center, Cairo</span>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                <Phone size={24} className="text-primary group-hover:scale-125 transition-transform" />
                <span className="text-gray-400 font-black text-2xl">19234</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-gray-500 font-bold">
          <p>© {new Date().getFullYear()} Lazez Global Foods Inc.</p>
          <div className="flex space-x-8 rtl:space-x-reverse">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
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
        <div className="min-h-screen flex flex-col selection:bg-primary/20">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

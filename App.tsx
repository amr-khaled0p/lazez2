
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// Added ShieldCheck to the imported icons from lucide-react
import { Menu as MenuIcon, X, ShoppingBag, User, Globe, Moon, Sun, ShoppingCart, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { useStore } from './store';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './translations';

const Home = lazy(() => import('./pages/Home'));
const MenuPage = lazy(() => import('./pages/Menu'));
const Profile = lazy(() => import('./pages/Profile'));
const Contact = lazy(() => import('./pages/Contact'));

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, lang } = useStore();
  const t = translations[lang];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => useStore.getState().toggleCart(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ x: lang === 'ar' ? '100%' : '-100%' }} animate={{ x: 0 }} exit={{ x: lang === 'ar' ? '100%' : '-100%' }} className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} h-full w-full max-w-md bg-white dark:bg-secondary shadow-2xl z-[110] flex flex-col transition-colors duration-300`}>
             <div className="p-8 border-b dark:border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-black flex items-center gap-3 dark:text-white"><ShoppingCart className="text-primary" /> {t.cart.title}</h2>
                <button onClick={() => useStore.getState().toggleCart(false)} className="p-2 dark:text-white"><X size={24} /></button>
             </div>
             <div className="flex-grow p-8">
               {cart.length === 0 ? <p className="text-center text-gray-400 py-20 font-bold">{t.cart.empty}</p> : <p className="dark:text-white">لديك {cart.length} أصناف</p>}
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const { lang, setLang, cart, isDarkMode, toggleDarkMode, user } = useStore();
  const t = translations[lang];
  const location = useLocation();

  // إخفاء النافبار إذا كان المدير في لوحة التحكم (POS)
  if (user?.isAdmin && location.pathname === '/profile') return null;

  return (
    <nav className="fixed top-8 left-0 right-0 z-[90] px-8">
      <div className="max-w-7xl mx-auto h-20 bg-white/80 dark:bg-secondary/80 backdrop-blur-xl rounded-[2.5rem] px-8 flex items-center justify-between border dark:border-white/10 shadow-xl transition-all">
        <Link to="/" className="text-3xl font-black text-primary tracking-tighter">LAZEZ</Link>
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-black uppercase tracking-widest text-secondary/70 dark:text-white/60 hover:text-primary transition-colors">{t.nav.home}</Link>
          <Link to="/menu" className="text-sm font-black uppercase tracking-widest text-secondary/70 dark:text-white/60 hover:text-primary transition-colors">{t.nav.menu}</Link>
          <Link to="/contact" className="text-sm font-black uppercase tracking-widest text-secondary/70 dark:text-white/60 hover:text-primary transition-colors">{t.nav.locations}</Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-3 hover:bg-brandGray dark:hover:bg-white/10 rounded-2xl dark:text-white transition-all active:rotate-180 duration-500">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/profile" className={`p-4 rounded-2xl transition-all ${user?.isAdmin ? 'bg-primary text-white shadow-lg' : 'bg-brandGray dark:bg-white/10 dark:text-white'}`}>
             {user?.isAdmin ? <ShieldCheck size={20}/> : <User size={20} />}
          </Link>
          <button onClick={() => useStore.getState().toggleCart(true)} className="bg-secondary text-white p-4 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">{cart.length}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const { isDarkMode } = useStore();

  useEffect(() => {
    // التأكد من تطبيق السمة عند التحميل الأولي
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#1a1c23] transition-colors duration-500 flex flex-col">
        <CartDrawer />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="h-screen flex items-center justify-center dark:text-white font-black">جاري تحضير التجربة...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useMemo } from 'react';
import { Category, MenuItem } from '../types';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, X, Plus, Info, Star } from 'lucide-react';
import { translations } from '../translations';

// ميزة تظليل نصوص البحث
const HighlightText = ({ text, query }: { text: string, query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <span key={i} className="bg-primary/30 text-primary dark:text-white rounded-md px-1">{part}</span> 
          : part
      )}
    </span>
  );
};

const QuickViewModal = ({ item, onClose }: { item: MenuItem | null, onClose: () => void }) => {
  const { addToCart, lang } = useStore();
  const t = translations[lang];
  const [extras, setExtras] = useState<{name: string, cal: number, price: number}[]>([]);

  if (!item) return null;

  const extraOptions = [
    { name: 'جبنة زيادة', cal: 120, price: 15 },
    { name: 'صوص سري', cal: 40, price: 8 },
    { name: 'هالبينو', cal: 10, price: 5 }
  ];

  const toggleExtra = (extra: any) => {
    setExtras(prev => prev.find(e => e.name === extra.name) ? prev.filter(e => e.name !== extra.name) : [...prev, extra]);
  };

  const currentPrice = item.price + extras.reduce((s, e) => s + e.price, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-secondary w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/20 backdrop-blur rounded-full text-white"><X size={24} /></button>
          <div className="md:w-1/2 h-72 md:h-auto">
            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
          </div>
          <div className="md:w-1/2 p-10 dark:text-white overflow-y-auto max-h-[80vh]">
            <span className="text-primary font-black uppercase text-xs tracking-widest">{item.category}</span>
            <h2 className="text-4xl font-black mt-2">{item.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">{item.description}</p>
            
            <div className="mt-8 space-y-4">
              <h4 className="font-black">أضف لمستك:</h4>
              <div className="grid grid-cols-1 gap-2">
                {extraOptions.map(opt => (
                  <button key={opt.name} onClick={() => toggleExtra(opt)} className={`p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${extras.find(e => e.name === opt.name) ? 'border-primary bg-primary/10' : 'border-gray-100 dark:border-white/10'}`}>
                    <span className="font-bold">{opt.name}</span>
                    <span className="text-xs opacity-60">+{opt.price} ج.م</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t dark:border-white/10 flex items-center justify-between">
               <div>
                 <p className="text-xs text-gray-400 font-bold">السعر النهائي</p>
                 <p className="text-3xl font-black">ج.م {currentPrice.toFixed(2)}</p>
               </div>
               <button onClick={() => { addToCart(item); onClose(); }} className="bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">إضافة للسلة</button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MenuPage = () => {
  const { lang, menu, addToCart } = useStore();
  const t = translations[lang];
  const [activeCat, setActiveCat] = useState<Category>(Category.ALL);
  const [search, setSearch] = useState('');
  const [quickView, setQuickView] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    return menu.filter(i => {
      const matchCat = activeCat === Category.ALL || i.category === activeCat;
      const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [menu, activeCat, search]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1c23] transition-colors duration-500 pb-20">
      <QuickViewModal item={quickView} onClose={() => setQuickView(null)} />
      
      <div className="bg-secondary dark:bg-black/40 py-24 px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black text-white tracking-tighter">قائمة الطعام</motion.h1>
      </div>

      <div className="sticky top-20 z-50 bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border-b dark:border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {Object.values(Category).map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`px-8 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${activeCat === c ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-brandGray dark:bg-white/5 dark:text-white/60 text-gray-400 hover:bg-gray-200'}`}>
                {c === Category.ALL ? (lang === 'ar' ? 'الكل' : 'All') : c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder={t.menu.searchPlaceholder} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-brandGray dark:bg-white/5 border-none outline-none font-bold dark:text-white focus:ring-2 ring-primary/20" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white dark:bg-secondary rounded-[2.5rem] overflow-hidden border dark:border-white/5 shadow-sm hover:shadow-2xl transition-all group">
                <div className="h-64 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button onClick={() => setQuickView(item)} className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-xl"><Info size={24} className="text-primary" /></div>
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black dark:text-white"><HighlightText text={item.name} query={search} /></h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2"><HighlightText text={item.description} query={search} /></p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-2xl font-black dark:text-white">ج.م {item.price}</span>
                    <button onClick={() => addToCart(item)} className="bg-brandGray dark:bg-white/10 dark:text-white p-4 rounded-2xl hover:bg-primary hover:text-white transition-all"><Plus size={20} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MenuPage;

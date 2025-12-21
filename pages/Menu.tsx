
import React, { useState } from 'react';
import { Category, MenuItem } from '../types';
import { ShoppingBag, Search, X, Star, Clock, Flame } from 'lucide-react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const QuickViewModal: React.FC<{ item: MenuItem | null; onClose: () => void }> = ({ item, onClose }) => {
  const { addToCart, t } = useApp();
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <button onClick={onClose} className="absolute top-8 right-8 z-10 p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-lg transition-colors">
            <X size={24} />
          </button>
          
          <div className="md:w-1/2 h-[400px] md:h-auto">
            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
          </div>
          
          <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                {item.category}
              </span>
              {item.isBestSeller && (
                <span className="px-5 py-2 bg-accent text-brandDark rounded-full text-xs font-black uppercase tracking-widest">
                  {t.menu.bestSeller}
                </span>
              )}
            </div>
            
            <h2 className="text-5xl font-black text-brandDark mb-6 leading-tight tracking-tighter">{item.name}</h2>
            <p className="text-gray-500 text-xl mb-10 font-medium leading-relaxed">{item.description}</p>
            
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-[2rem]">
                <Star className="mx-auto mb-3 text-accent" fill="currentColor" size={24} />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">4.9 Rating</span>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-[2rem]">
                <Clock className="mx-auto mb-3 text-primary" size={24} />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">15 Min</span>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-[2rem]">
                <Flame className="mx-auto mb-3 text-orange-500" size={24} />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">540 Cal</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-gray-400 font-black uppercase text-xs tracking-[0.2em] mb-1">Price</span>
                <span className="text-5xl font-black text-brandDark">${item.price}</span>
              </div>
              <button 
                onClick={() => { addToCart(item); onClose(); }}
                className="bg-primary text-white px-12 py-6 rounded-[2rem] font-black text-xl hover-scale shadow-2xl shadow-red-100 flex items-center space-x-3 rtl:space-x-reverse"
              >
                <ShoppingBag size={24} />
                <span>{t.menu.addToCart}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MenuPage: React.FC = () => {
  const { t, addToCart, menu } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  const filteredItems = menu.filter(item => {
    const matchesCategory = activeCategory === Category.ALL || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brandLight pb-32">
      <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
      
      <div className="bg-white border-b border-gray-100 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black text-brandDark mb-6 tracking-tighter">{t.menu.title}</h1>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">{t.menu.desc}</p>
        </div>
      </div>

      <div className="sticky top-[96px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
            <div className="flex items-center space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 xl:pb-0 w-full xl:w-auto scrollbar-hide">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-10 py-4 rounded-[1.5rem] font-black text-sm transition-all whitespace-nowrap uppercase tracking-widest ${
                    activeCategory === cat 
                      ? 'bg-primary text-white shadow-2xl shadow-red-100 scale-105' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full xl:w-[450px]">
              <Search className="absolute left-6 rtl:left-auto rtl:right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input 
                type="text" 
                placeholder={t.menu.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 rtl:pl-6 rtl:pr-16 py-6 bg-gray-100 border-none rounded-[2rem] focus:ring-4 focus:ring-primary/10 text-brandDark font-black text-lg placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="bg-white rounded-[3.5rem] overflow-hidden soft-shadow group hover-scale border border-gray-50 cursor-pointer flex flex-col h-full"
              onClick={() => setQuickViewItem(item)}
            >
              <div className="relative h-72 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.name} />
                {item.isBestSeller && (
                  <div className="absolute top-6 right-6 bg-accent text-brandDark font-black px-4 py-2 rounded-full text-[10px] uppercase tracking-widest shadow-xl">
                    {t.menu.popular}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="p-4 bg-white rounded-full shadow-2xl text-primary font-black scale-0 group-hover:scale-100 transition-transform">Quick View</div>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">{item.category}</span>
                <h3 className="text-2xl font-black text-brandDark mb-4 leading-tight">{item.name}</h3>
                <p className="text-gray-500 text-lg mb-10 line-clamp-2 min-h-[56px] font-medium leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-3xl font-black text-brandDark">${item.price}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    className="bg-primary text-white p-5 rounded-3xl hover:bg-brandDark transition-all shadow-xl shadow-red-100"
                  >
                    <ShoppingBag size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-40">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-10">
              <Search size={56} className="text-gray-300" />
            </div>
            <h3 className="text-4xl font-black text-gray-400 mb-6">{t.menu.noResults}</h3>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory(Category.ALL);}}
              className="text-primary font-black text-xl hover:underline underline-offset-8"
            >
              {t.menu.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;

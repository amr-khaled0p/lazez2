
import React, { useState } from 'react';
import { Category, MenuItem } from '../types';
import { MENU_ITEMS } from '../constants';
import { ShoppingBag, Search, X, Star, Clock, Flame } from 'lucide-react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const QuickViewModal: React.FC<{ item: MenuItem | null; onClose: () => void }> = ({ item, onClose }) => {
  const { addToCart, t, lang } = useApp();
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-lg transition-colors">
            <X size={24} />
          </button>
          
          <div className="md:w-1/2 h-[300px] md:h-auto">
            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-wider">
                {item.category}
              </span>
              {item.isBestSeller && (
                <span className="px-3 py-1 bg-accent text-brandDark rounded-full text-xs font-black uppercase">
                  {t.menu.bestSeller}
                </span>
              )}
            </div>
            
            <h2 className="text-4xl font-black text-brandDark mb-4 leading-tight">{item.name}</h2>
            <p className="text-gray-500 text-lg mb-8 font-medium leading-relaxed">{item.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Star className="mx-auto mb-2 text-accent" fill="currentColor" size={20} />
                <span className="text-xs font-bold text-gray-400">4.9 Rating</span>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Clock className="mx-auto mb-2 text-primary" size={20} />
                <span className="text-xs font-bold text-gray-400">15-20 Min</span>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Flame className="mx-auto mb-2 text-orange-500" size={20} />
                <span className="text-xs font-bold text-gray-400">540 Cal</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-brandDark">${item.price}</span>
              <button 
                onClick={() => { addToCart(item); onClose(); }}
                className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover-scale shadow-xl shadow-red-100 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ShoppingBag size={22} />
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
  const { t, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === Category.ALL || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brandLight pb-24">
      <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
      
      <div className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-brandDark mb-4">{t.menu.title}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">{t.menu.desc}</p>
        </div>
      </div>

      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={t.menu.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-brandDark font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden soft-shadow group hover-scale border border-gray-50 cursor-pointer"
              onClick={() => setQuickViewItem(item)}
            >
              <div className="relative h-60 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                {item.isBestSeller && <div className="absolute top-4 right-4 bg-accent text-brandDark font-black px-3 py-1 rounded-full text-[10px] uppercase">{t.menu.popular}</div>}
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{item.category}</span>
                <h3 className="text-xl font-black text-brandDark mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[40px] font-medium">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-brandDark">${item.price}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    className="bg-primary text-white p-4 rounded-2xl hover:bg-brandDark transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuPage;

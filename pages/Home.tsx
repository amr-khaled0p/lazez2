
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Flame, ShieldCheck, ChevronRight } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { useApp } from '../AppContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { t, addToCart } = useApp();
  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller).slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[85vh] flex items-center bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/20 rounded-l-[100px] rtl:rounded-l-none rtl:rounded-r-[100px] rtl:left-0 rtl:right-auto hidden lg:block -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left rtl:lg:text-right"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-bold text-sm mb-6">
                {t.hero.new}
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-brandDark mb-6 leading-tight tracking-tighter">
                {t.hero.title1} <br />
                <span className="text-primary italic">{t.hero.title2}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                {t.hero.desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <Link to="/menu" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-lg hover-scale shadow-2xl shadow-red-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>{t.hero.cta}</span>
                  <ArrowRight size={20} className="rtl:rotate-180" />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto px-10 py-5 border-2 border-brandDark text-brandDark rounded-full font-bold text-lg hover:bg-brandDark hover:text-white transition-all">
                  {t.hero.cta2}
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hover-scale cursor-pointer group"
            >
              <div className="absolute inset-0 bg-accent rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000" className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl" alt="Hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-brandLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{t.menu.popular}</span>
              <h2 className="text-4xl md:text-5xl font-black text-brandDark">{t.menu.bestSeller}</h2>
            </div>
            <Link to="/menu" className="group flex items-center space-x-2 rtl:space-x-reverse text-primary font-black text-lg mt-4 md:mt-0">
              <span>{t.menu.title}</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {bestSellers.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden soft-shadow group hover-scale">
                <div className="relative h-72">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-brandDark">{item.name}</h3>
                    <span className="text-primary font-black text-xl">${item.price}</span>
                  </div>
                  <p className="text-gray-500 mb-6 line-clamp-2 font-medium">{item.description}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-4 bg-gray-50 group-hover:bg-primary group-hover:text-white text-brandDark font-bold rounded-2xl transition-all"
                  >
                    {t.menu.addToCart}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

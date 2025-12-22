
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useStore } from '../store';
import { translations } from '../translations';

const AIMealPicker = () => {
  const { menu } = useStore();
  const [selected, setSelected] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const random = menu[Math.floor(Math.random() * menu.length)];
      setSelected(random);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="relative py-32 px-8 bg-primary/5 dark:bg-primary/10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-2 rounded-full font-black text-xs uppercase mb-8">
          <Sparkles size={14} /> AI Recommendation
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-secondary dark:text-white mb-8 tracking-tighter">
          محتار تطلب إيه؟ <br /> دعنا نختار لك <span className="text-primary italic">الأفضل</span>
        </h2>
        <button onClick={pickRandom} disabled={isSpinning} className="bg-primary text-white px-12 py-6 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 transition-all disabled:opacity-50">
          {isSpinning ? 'جاري التفكير...' : 'فاجئني بوجبة!'}
        </button>

        <AnimatePresence>
          {selected && !isSpinning && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-12 bg-white dark:bg-secondary p-8 rounded-[3rem] shadow-2xl border dark:border-white/10 max-w-lg mx-auto relative">
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-gray-400"><X size={20} /></button>
              <img src={selected.image} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg" />
              <h3 className="text-2xl font-black dark:text-white mb-2">{selected.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{selected.description}</p>
              <Link to="/menu" className="block w-full bg-brandGray dark:bg-white/5 dark:text-white py-4 rounded-xl font-black">اطلبها الآن</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Home = () => {
  const { lang, menu, settings } = useStore();
  const t = translations[lang];
  const bestSellers = menu.filter(item => item.isBestSeller).slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-32 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <span className="px-6 py-2 bg-primary/10 text-primary rounded-full font-black text-xs uppercase mb-8 inline-block">لأول مرة في مصر</span>
            <h1 className="text-7xl md:text-9xl font-black text-secondary dark:text-white leading-[0.85] tracking-tighter mb-8">
              {settings.heroTitle.split(' ').slice(0,-1).join(' ')} <br />
              <span className="text-primary italic">{settings.heroTitle.split(' ').pop()}</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-white/60 mb-12 max-w-lg font-medium">{settings.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/menu" className="bg-primary text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
                {t.hero.cta} <ArrowRight size={24} />
              </Link>
            </div>
          </motion.div>
          <div className="relative">
             <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200" className="rounded-[5rem] shadow-2xl rotate-2" />
          </div>
        </div>
      </section>
      
      <AIMealPicker />

      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black text-secondary dark:text-white mb-16 tracking-tighter text-center">الأكثر طلباً</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {bestSellers.map((item) => (
              <motion.div whileHover={{ y: -10 }} key={item.id} className="bg-white dark:bg-secondary rounded-[3rem] overflow-hidden border dark:border-white/10 hover:shadow-2xl transition-all duration-500 group">
                <div className="h-72 overflow-hidden relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 dark:text-white backdrop-blur px-4 py-2 rounded-full font-black text-xs shadow-lg">
                    ج.م {item.price}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black mb-3 dark:text-white">{item.name}</h3>
                  <p className="text-gray-400 font-medium mb-8 line-clamp-2">{item.description}</p>
                  <Link to="/menu" className="w-full bg-brandGray dark:bg-white/5 py-4 rounded-2xl flex items-center justify-center font-black text-primary hover:bg-primary hover:text-white transition-all">اطلب الآن</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

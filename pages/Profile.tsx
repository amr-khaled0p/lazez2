
import React, { useState, useMemo, useEffect } from 'react';
import { 
  User, ShieldCheck, LogOut, Trash2, Plus, LayoutDashboard, ShoppingCart, 
  BarChart3, Box, ReceiptText, Search, TrendingUp, AlertCircle, Settings, 
  X, Check, CreditCard, History, Minus, Calculator, Wallet
} from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, MenuItem, Modifier, Exclusion, Sale } from '../types';

const CashCheckout = ({ total, onComplete, onCancel }: { total: number, onComplete: () => void, onCancel: () => void }) => {
  const [received, setReceived] = useState<string>('');
  const change = Math.max(0, Number(received) - total);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onCancel} />
      <div className="relative bg-white dark:bg-secondary w-full max-w-md rounded-[3rem] p-10 shadow-3xl text-right">
         <div className="flex items-center gap-4 mb-8 text-primary">
            <Calculator size={32} />
            <h3 className="text-3xl font-black">حاسبة الدفع</h3>
         </div>
         <div className="space-y-6">
            <div className="p-6 bg-brandGray dark:bg-white/5 rounded-3xl">
               <p className="text-gray-400 font-bold mb-1">المطلوب</p>
               <p className="text-4xl font-black text-secondary dark:text-white">{total} ج.م</p>
            </div>
            <div className="space-y-3">
               <label className="font-black text-sm text-gray-400">المبلغ المستلم</label>
               <input type="number" autoFocus className="w-full p-6 rounded-3xl bg-primary/5 dark:bg-white/10 dark:text-white font-black text-4xl border-2 border-primary outline-none text-center" value={received} onChange={(e) => setReceived(e.target.value)} />
            </div>
            {Number(received) >= total && (
              <div className="p-6 bg-green-500/10 border-2 border-green-500/20 rounded-3xl">
                 <p className="text-green-500 font-bold mb-1">الباقي للعميل</p>
                 <p className="text-5xl font-black text-green-500">{change.toFixed(2)} ج.م</p>
              </div>
            )}
            <button disabled={Number(received) < total} onClick={onComplete} className="w-full py-6 bg-primary text-white rounded-3xl font-black text-2xl shadow-xl disabled:opacity-30">إتمام العملية</button>
         </div>
      </div>
    </motion.div>
  );
};

const POSSystem = () => {
  const { menu, addSale, updateStock, updateModifierStock } = useStore();
  const [activeCat, setActiveCat] = useState<Category>(Category.ALL);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [receipt, setReceipt] = useState<any[]>([]);
  const [activeExtras, setActiveExtras] = useState<Modifier[]>([]);
  const [activeRemovals, setActiveRemovals] = useState<Exclusion[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const filtered = menu.filter(i => {
    const matchCat = activeCat === Category.ALL || i.category === activeCat;
    return matchCat && i.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const total = receipt.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleAddToReceipt = () => {
    if (!selectedItem) return;
    const extrasPrice = activeExtras.reduce((s, e) => s + e.price, 0);
    const unitPrice = selectedItem.price + extrasPrice;
    setReceipt([...receipt, {
      id: Date.now().toString(),
      name: selectedItem.name,
      unitPrice,
      quantity,
      extras: activeExtras.map(e => e.name),
      removals: activeRemovals.map(e => e.name),
      totalPrice: unitPrice * quantity
    }]);
    updateStock(selectedItem.id, -quantity);
    activeExtras.forEach(e => updateModifierStock(selectedItem.id, e.id, -quantity));
    setSelectedItem(null);
    setActiveExtras([]);
    setActiveRemovals([]);
    setQuantity(1);
  };

  const finalizeSale = (method: 'Cash' | 'Card') => {
    const newSale: Sale = {
      id: `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      items: receipt.map(r => ({ name: r.name, quantity: r.quantity, price: r.totalPrice, extras: r.extras, removals: r.removals })),
      total,
      date: new Date().toISOString(),
      paymentMethod: method,
      type: 'POS'
    };
    addSale(newSale);
    setReceipt([]);
    setShowCheckout(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
      <AnimatePresence>{showCheckout && <CashCheckout total={total} onCancel={() => setShowCheckout(false)} onComplete={() => finalizeSale('Cash')} />}</AnimatePresence>

      <div className="lg:w-2/3 flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input placeholder="بحث في الأصناف..." className="w-full pl-16 pr-8 py-5 rounded-3xl bg-white dark:bg-white/5 dark:text-white font-black text-xl outline-none shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
             {Object.values(Category).map(c => (
               <button key={c} onClick={() => setActiveCat(c)} className={`px-10 py-5 rounded-2xl font-black whitespace-nowrap transition-all ${activeCat === c ? 'bg-primary text-white' : 'bg-white dark:bg-white/5 dark:text-white/40'}`}>{c}</button>
             ))}
           </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto p-1 flex-grow no-scrollbar pb-32">
          {filtered.map(item => (
            <button key={item.id} disabled={item.stock <= 0} onClick={() => setSelectedItem(item)} className="flex flex-col bg-white dark:bg-secondary border-2 dark:border-white/5 rounded-[2rem] text-right transition-all group overflow-hidden hover:border-primary shadow-lg h-fit">
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                 <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              </div>
              <div className="p-6">
                <h5 className="font-black text-lg dark:text-white truncate">{item.name}</h5>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-primary font-black text-xl">{item.price} ج.م</span>
                  <span className={`text-xs font-black ${item.stock < 10 ? 'text-red-500' : 'text-gray-400'}`}>{item.stock} متوفر</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:w-1/3 flex flex-col bg-white dark:bg-secondary rounded-[3rem] border-2 dark:border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 bg-brandGray dark:bg-white/5 border-b dark:border-white/10 flex justify-between items-center">
          <h4 className="text-xl font-black dark:text-white flex items-center gap-3"><ShoppingCart className="text-primary" /> الفاتورة</h4>
          <button onClick={() => setReceipt([])} className="text-red-500 font-black text-xs">تصفير</button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
          {receipt.length === 0 ? <div className="h-full flex flex-col items-center justify-center opacity-20"><Box size={60} /><p className="font-black mt-4">لا توجد طلبات</p></div> : 
            receipt.map((r, idx) => (
              <div key={idx} className="p-5 bg-brandGray dark:bg-white/5 rounded-[2rem] border dark:border-white/5 relative group">
                 <button onClick={() => setReceipt(receipt.filter((_, i) => i !== idx))} className="absolute -top-1 -left-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"><X size={12}/></button>
                 <div className="flex justify-between items-start">
                    <div className="flex-grow">
                       <p className="font-black dark:text-white text-lg">x{r.quantity} {r.name}</p>
                       <div className="mt-1 flex flex-wrap gap-1">
                          {r.extras.map((e: string, i: number) => <span key={i} className="text-[9px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded">+{e}</span>)}
                          {r.removals.map((e: string, i: number) => <span key={i} className="text-[9px] font-black text-red-500 px-2 py-0.5 bg-red-500/10 rounded">بدون {e}</span>)}
                       </div>
                    </div>
                    <span className="font-black text-primary ml-4">{r.totalPrice} ج.م</span>
                 </div>
              </div>
            ))
          }
        </div>
        <div className="p-10 bg-brandGray dark:bg-white/5 border-t dark:border-white/10 space-y-8">
           <div className="flex justify-between items-center">
              <span className="text-gray-400 font-black text-lg">الإجمالي</span>
              <span className="text-4xl font-black text-primary">{total} ج.م</span>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <button disabled={receipt.length === 0} onClick={() => setShowCheckout(true)} className="bg-secondary text-white py-6 rounded-2xl font-black flex items-center justify-center gap-3"><Wallet size={20}/> كاش</button>
              <button disabled={receipt.length === 0} onClick={() => finalizeSale('Card')} className="bg-primary text-white py-6 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-primary/20"><CreditCard size={20}/> فيزا</button>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="relative bg-white dark:bg-secondary w-full max-w-2xl rounded-[4rem] p-12 shadow-3xl flex flex-col max-h-[90vh]">
               <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl font-black dark:text-white">{selectedItem.name}</h3>
                  <div className="flex items-center gap-6 bg-brandGray dark:bg-white/5 p-3 rounded-2xl border">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl bg-white dark:bg-secondary flex items-center justify-center shadow"><Minus size={18}/></button>
                     <span className="text-2xl font-black dark:text-white">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow"><Plus size={18}/></button>
                  </div>
               </div>
               <div className="flex-grow overflow-y-auto pr-2 no-scrollbar space-y-10">
                 {selectedItem.modifiers && (
                   <div className="space-y-4">
                      <h4 className="font-black text-gray-400 text-xs uppercase tracking-widest">إضافات</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedItem.modifiers.map(m => (
                           <button key={m.id} onClick={() => setActiveExtras(prev => prev.find(ex => ex.id === m.id) ? prev.filter(ex => ex.id !== m.id) : [...prev, m])} className={`p-5 rounded-2xl border-2 text-right transition-all flex justify-between items-center ${activeExtras.find(ex => ex.id === m.id) ? 'border-primary bg-primary/5' : 'border-gray-50 dark:border-white/5'}`}>
                              <div><p className="font-black dark:text-white">{m.name}</p><p className="text-[10px] text-primary">+{m.price} ج.م</p></div>
                              {activeExtras.find(ex => ex.id === m.id) && <Check size={20} className="text-primary"/>}
                           </button>
                        ))}
                      </div>
                   </div>
                 )}
                 {selectedItem.exclusions && (
                   <div className="space-y-4">
                      <h4 className="font-black text-gray-400 text-xs uppercase tracking-widest">بدون</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedItem.exclusions.map(e => (
                           <button key={e.id} onClick={() => setActiveRemovals(prev => prev.find(ex => ex.id === e.id) ? prev.filter(ex => ex.id !== e.id) : [...prev, e])} className={`p-5 rounded-2xl border-2 text-right transition-all flex justify-between items-center ${activeRemovals.find(ex => ex.id === e.id) ? 'border-red-500 bg-red-50/5' : 'border-gray-50 dark:border-white/5'}`}>
                              <p className="font-black dark:text-white">{e.name}</p>
                              {activeRemovals.find(ex => ex.id === e.id) && <Trash2 size={18} className="text-red-500"/>}
                           </button>
                        ))}
                      </div>
                   </div>
                 )}
               </div>
               <div className="mt-10 flex gap-4 pt-8 border-t dark:border-white/10">
                  <button onClick={() => setSelectedItem(null)} className="flex-1 bg-brandGray dark:bg-white/5 dark:text-white py-6 rounded-2xl font-black">إلغاء</button>
                  <button onClick={handleAddToReceipt} className="flex-[2] bg-primary text-white py-6 rounded-2xl font-black shadow-xl shadow-primary/20 transition-all">إضافة ({(selectedItem.price + activeExtras.reduce((s,e)=>s+e.price, 0)) * quantity} ج.م)</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InventoryControl = () => {
  const { menu, updateStock } = useStore();
  const [search, setSearch] = useState('');
  const filtered = menu.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-red-500 text-white p-8 rounded-[2.5rem] shadow-xl">
          <AlertCircle size={32} className="mb-4" />
          <h5 className="font-black opacity-80 uppercase text-xs">نواقص المخزن</h5>
          <p className="text-4xl font-black mt-1">{menu.filter(i => i.stock < 10).length}</p>
        </div>
        <div className="md:col-span-3 relative h-full">
           <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
           <input placeholder="البحث في المخزن..." className="w-full h-full pl-20 pr-10 rounded-[2.5rem] bg-white dark:bg-white/5 dark:text-white font-black text-2xl outline-none shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-white dark:bg-secondary rounded-[3rem] border-2 dark:border-white/10 overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-brandGray dark:bg-white/5 border-b-2 dark:border-white/10">
            <tr>
              <th className="p-8 font-black text-gray-400 uppercase text-xs">المنتج</th>
              <th className="p-8 font-black text-gray-400 uppercase text-xs">الكمية الحالية</th>
              <th className="p-8 font-black text-gray-400 uppercase text-xs text-center">توريد سريع</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 dark:divide-white/5">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-brandGray/20 transition-colors">
                <td className="p-8 flex items-center gap-6">
                   <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                   <span className="font-black text-xl dark:text-white">{item.name}</span>
                </td>
                <td className="p-8"><span className={`text-3xl font-black ${item.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{item.stock}</span></td>
                <td className="p-8">
                   <div className="flex justify-center gap-2">
                      <button onClick={() => updateStock(item.id, 50)} className="bg-green-500 text-white p-4 rounded-xl hover:scale-110 transition-all shadow-lg"><Plus size={18}/></button>
                      <button onClick={() => updateStock(item.id, -10)} className="bg-red-50 dark:bg-white/5 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Minus size={18}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FinanceControl = () => {
  const { sales } = useStore();
  const totalRev = sales.reduce((s, a) => s + a.total, 0);
  return (
    <div className="space-y-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/30">
           <TrendingUp className="mb-4" size={40} />
           <p className="font-black opacity-80 uppercase text-sm">صافي دخل اليوم</p>
           <h4 className="text-6xl font-black mt-2">{totalRev} ج.م</h4>
        </div>
        <div className="p-10 bg-white dark:bg-secondary rounded-[3rem] border-2 dark:border-white/10 shadow-xl">
           <CreditCard className="text-blue-500 mb-4" size={40} />
           <p className="text-gray-400 font-black text-sm uppercase">مبيعات البطاقات</p>
           <h4 className="text-4xl font-black dark:text-white mt-2">{sales.filter(s=>s.paymentMethod==='Card').reduce((a,b)=>a+b.total,0)} ج.م</h4>
        </div>
        <div className="p-10 bg-white dark:bg-secondary rounded-[3rem] border-2 dark:border-white/10 shadow-xl">
           <Wallet className="text-orange-500 mb-4" size={40} />
           <p className="text-gray-400 font-black text-sm uppercase">النقدية</p>
           <h4 className="text-4xl font-black dark:text-white mt-2">{sales.filter(s=>s.paymentMethod==='Cash').reduce((a,b)=>a+b.total,0)} ج.م</h4>
        </div>
      </div>
      <div className="bg-white dark:bg-secondary p-10 rounded-[4rem] border-2 dark:border-white/10 shadow-sm">
         <h4 className="text-2xl font-black dark:text-white mb-10 flex items-center gap-4"><History size={28} className="text-primary"/> الفواتير الأخيرة</h4>
         <div className="space-y-4">
            {sales.map(sale => (
               <div key={sale.id} className="p-8 bg-brandGray dark:bg-white/5 rounded-3xl flex justify-between items-center border-2 border-transparent hover:border-primary/20 transition-all">
                  <div className="text-right"><p className="font-black dark:text-white text-xl">{sale.id}</p><p className="text-sm text-gray-400 font-bold">{new Date(sale.date).toLocaleString('ar-EG')}</p></div>
                  <div className="flex items-center gap-8"><span className={`px-6 py-2 rounded-xl text-xs font-black text-white ${sale.paymentMethod === 'Cash' ? 'bg-orange-500' : 'bg-blue-500'}`}>{sale.paymentMethod}</span><span className="text-3xl font-black text-primary">{sale.total} ج.م</span></div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, setUser, settings, updateSettings, menu } = useStore();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'finance' | 'settings'>('pos');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '123@gmail.com' && pass === '1234') setUser({ name: 'المدير التنفيذي', email, isAdmin: true });
    else setUser({ name: email.split('@')[0], email, isAdmin: false });
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-brandGray dark:bg-black/40 transition-colors">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-secondary p-12 rounded-[4rem] text-center max-w-md w-full shadow-2xl border dark:border-white/10">
        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20"><User size={48} /></div>
        <h2 className="text-3xl font-black dark:text-white mb-2 tracking-tighter">نظام إدارة لذيذ</h2>
        <p className="text-gray-400 mb-8 font-medium">سجل الدخول للوصول إلى لوحة التحكم</p>
        <form onSubmit={handleLogin} className="space-y-4 text-right">
          <input type="email" placeholder="البريد الإلكتروني" className="w-full p-5 rounded-2xl bg-brandGray dark:bg-white/5 dark:text-white border-none outline-none focus:ring-2 ring-primary/20 font-bold" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="كلمة المرور" className="w-full p-5 rounded-2xl bg-brandGray dark:bg-white/5 dark:text-white border-none outline-none focus:ring-2 ring-primary/20 font-bold" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">دخول النظام</button>
        </form>
      </motion.div>
    </div>
  );

  if (user.isAdmin) return (
    <div className="min-h-screen bg-brandGray dark:bg-[#0f1115] flex flex-col transition-colors overflow-x-hidden">
      <header className="h-24 bg-white dark:bg-secondary border-b-2 dark:border-white/10 px-12 flex items-center justify-between shadow-lg sticky top-0 z-[100] backdrop-blur-xl bg-opacity-90">
         <div className="flex items-center gap-12">
            <span className="text-3xl font-black text-primary tracking-tighter">LAZEZ HQ</span>
            <nav className="hidden lg:flex gap-2">
               {[{id: 'pos', icon: ShoppingCart, label: 'نظام الكاشير'}, {id: 'inventory', icon: Box, label: 'إدارة المخزون'}, {id: 'finance', icon: BarChart3, label: 'التقارير المالية'}, {id: 'settings', icon: Settings, label: 'إدارة الموقع'}].map(tab => (
                 <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:bg-brandGray dark:hover:bg-white/5'}`}>
                    <tab.icon size={20}/> {tab.label}
                 </button>
               ))}
            </nav>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block"><p className="text-lg font-black dark:text-white leading-none">{user.name}</p><p className="text-xs text-primary font-black uppercase mt-1">Super Admin Account</p></div>
            <button onClick={() => setUser(null)} className="p-5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><LogOut size={24}/></button>
         </div>
      </header>
      <main className="flex-grow p-12 w-full max-w-[1920px] mx-auto">
         <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
               {activeTab === 'pos' && <POSSystem />}
               {activeTab === 'inventory' && <InventoryControl />}
               {activeTab === 'finance' && <FinanceControl />}
               {activeTab === 'settings' && (
                  <div className="max-w-3xl bg-white dark:bg-secondary p-16 rounded-[5xl] border-2 dark:border-white/10 shadow-2xl mx-auto">
                     <h3 className="text-4xl font-black dark:text-white mb-10 flex items-center gap-4"><Settings className="text-primary"/> إعدادات المنصة</h3>
                     <div className="space-y-8 text-right">
                        <div className="space-y-3"><label className="font-black text-sm text-gray-400">عنوان الترحيب</label><input className="w-full p-6 rounded-3xl bg-brandGray dark:bg-white/5 dark:text-white font-black text-xl border-2 border-transparent focus:border-primary outline-none" value={settings.heroTitle} onChange={e => updateSettings({ heroTitle: e.target.value })} /></div>
                        <div className="space-y-3"><label className="font-black text-sm text-gray-400">وصف المتجر</label><textarea className="w-full p-6 rounded-3xl bg-brandGray dark:bg-white/5 dark:text-white font-bold text-lg h-40 border-2 border-transparent focus:border-primary outline-none" value={settings.heroSubtitle} onChange={e => updateSettings({ heroSubtitle: e.target.value })} /></div>
                        <div className="flex items-center justify-between p-10 bg-brandGray dark:bg-white/5 rounded-[3rem] border-2 border-dashed dark:border-white/10">
                           <div><p className="font-black text-xl dark:text-white">وضع الطوارئ (إغلاق الفرع)</p><p className="text-sm text-gray-400 font-bold mt-1">سيتم منع استقبال الطلبات فور تفعيل هذا الوضع</p></div>
                           <button onClick={() => updateSettings({ isClosed: !settings.isClosed })} className={`w-20 h-10 rounded-full p-1.5 transition-all duration-500 shadow-inner ${settings.isClosed ? 'bg-red-500' : 'bg-gray-300'}`}><div className={`w-7 h-7 bg-white rounded-full shadow-lg transition-transform duration-500 ${settings.isClosed ? 'translate-x-10' : 'translate-x-0'}`} /></button>
                        </div>
                     </div>
                  </div>
               )}
            </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
  return null;
};

export default Profile;

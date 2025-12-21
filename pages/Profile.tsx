
import React, { useState } from 'react';
// Added Home icon to the lucide-react imports
import { User, Package, MapPin, Award, LogOut, ChevronRight, Edit2, Phone, Mail, Plus, ShieldCheck, CheckCircle, Clock, Truck, Trash2, LayoutGrid, Tag, Power, Home } from 'lucide-react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../types';

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useApp();
  const steps = [
    { key: 'Order Placed', label: t.profile.orderPlaced, icon: CheckCircle },
    { key: 'Kitchen', label: t.profile.preparing, icon: Clock },
    { key: 'On the way', label: t.profile.onWay, icon: Truck },
    { key: 'Delivered', label: t.profile.delivered, icon: Award }
  ];

  const currentIdx = steps.findIndex(s => s.key === status);

  return (
    <div className="flex justify-between items-center max-w-lg mx-auto py-10 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 -z-0"></div>
      {steps.map((step, idx) => {
        const isActive = idx <= currentIdx;
        return (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
              isActive ? 'bg-primary text-white scale-110' : 'bg-white text-gray-300'
            }`}>
              <step.icon size={24} />
            </div>
            <span className={`text-[10px] font-black uppercase mt-3 tracking-wider ${isActive ? 'text-brandDark' : 'text-gray-300'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const { t, menu, addMenuItem, deleteMenuItem, updateMenuItem } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '', price: 0, description: '', category: Category.BURGERS, image: ''
  });

  const handleAdd = () => {
    if (newItem.name && newItem.price > 0) {
      addMenuItem({ ...newItem, id: Date.now().toString() });
      setIsAdding(false);
      setNewItem({ name: '', price: 0, description: '', category: Category.BURGERS, image: '' });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-black">{t.admin.manageMenu}</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center space-x-2 rtl:space-x-reverse hover-scale shadow-lg shadow-red-100"
        >
          <Plus size={18} />
          <span>{t.admin.addItem}</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 p-8 rounded-[3rem] space-y-6 overflow-hidden border-2 border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder={t.admin.itemTitle} className="w-full p-4 rounded-xl border-none font-bold" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
              <input type="number" placeholder={t.admin.itemPrice} className="w-full p-4 rounded-xl border-none font-bold" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} />
              <select className="w-full p-4 rounded-xl border-none font-bold bg-white" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value as Category})}>
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" placeholder={t.admin.itemImg} className="w-full p-4 rounded-xl border-none font-bold" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
              <textarea className="w-full p-4 rounded-xl border-none font-bold col-span-1 md:col-span-2" placeholder={t.admin.itemDesc} value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button onClick={handleAdd} className="bg-primary text-white px-8 py-4 rounded-2xl font-black">{t.admin.addItem}</button>
              <button onClick={() => setIsAdding(false)} className="bg-white text-gray-500 px-8 py-4 rounded-2xl font-black">{t.menu.clearFilters}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {menu.map(item => (
          <div key={item.id} className="flex items-center space-x-6 rtl:space-x-reverse bg-white p-6 rounded-[2.5rem] border border-gray-100 group shadow-sm hover:shadow-md transition-shadow">
            <img src={item.image} className="w-24 h-24 rounded-[1.5rem] object-cover" alt="" />
            <div className="flex-grow">
              <h4 className="text-xl font-black text-brandDark">{item.name}</h4>
              <p className="text-gray-400 font-bold">${item.price}</p>
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button onClick={() => deleteMenuItem(item.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { t, lang, user, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'rewards' | 'addresses' | 'admin'>('info');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <User size={48} className="text-gray-300" />
          </div>
          <h2 className="text-4xl font-black text-brandDark">Login to your account</h2>
          <p className="text-gray-400 font-bold max-w-sm mx-auto">Access your orders, rewards, and personalized Lazez experience.</p>
        </div>
      </div>
    );
  }

  const orders = [
    { id: '#LZ-4921', date: 'Oct 24, 2023', total: '$42.50', status: 'On the way', items: '2x Supreme Burger, 1x Gold Fries' },
    { id: '#LZ-4810', date: 'Oct 12, 2023', total: '$18.99', status: 'Delivered', items: '1x Truffle Pizza' }
  ];

  const tabs = [
    { id: 'info', label: t.nav.profile, icon: User },
    { id: 'orders', label: t.profile.orders, icon: Package },
    { id: 'rewards', label: t.profile.rewards, icon: Award },
    { id: 'addresses', label: t.profile.addresses, icon: MapPin },
    ...(user.isAdmin ? [{ id: 'admin', label: t.profile.adminTools, icon: ShieldCheck }] : []),
  ];

  return (
    <div className="min-h-screen bg-brandLight py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-[3rem] soft-shadow p-10 sticky top-32 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
              <div className="text-center mb-12 relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="w-28 h-28 bg-primary/10 rounded-[2.5rem] flex items-center justify-center border-[6px] border-white shadow-2xl">
                    <User size={56} className="text-primary" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-accent rounded-2xl border-4 border-white text-brandDark shadow-lg hover-scale">
                    <Edit2 size={16} />
                  </button>
                </div>
                <h2 className="text-3xl font-black text-brandDark">{user.name}</h2>
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.isAdmin ? 'bg-primary text-white' : 'bg-accent text-brandDark'}`}>
                    {user.isAdmin ? 'Master Admin' : 'Gold Member'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-5 rtl:space-x-reverse p-5 rounded-[1.5rem] font-black transition-all group ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-2xl shadow-red-100' 
                        : 'text-gray-400 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <tab.icon size={22} className={activeTab === tab.id ? 'animate-bounce' : ''} />
                    <span className="text-sm tracking-widest uppercase">{tab.label}</span>
                  </button>
                ))}
                <button onClick={logout} className="w-full flex items-center space-x-5 rtl:space-x-reverse p-5 rounded-[1.5rem] font-black text-red-500 hover:bg-red-50 mt-10 transition-all uppercase text-sm tracking-widest">
                  <LogOut size={22} />
                  <span>{t.profile.logout}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-[4rem] soft-shadow min-h-[700px] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0"></div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative z-10"
                >
                  {activeTab === 'info' && (
                    <div className="space-y-12">
                      <div className="flex justify-between items-end">
                        <h3 className="text-4xl font-black">{t.nav.profile}</h3>
                        <div className="w-16 h-1 bg-accent rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                          { icon: Mail, label: "Email Address", value: user.email },
                          { icon: Phone, label: "Phone Number", value: "+20 100 000 0000" },
                          { icon: LayoutGrid, label: "Account ID", value: "#LZ-990234" },
                          { icon: Tag, label: "Member Since", value: "January 2024" }
                        ].map((field, i) => (
                          <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] group hover:bg-white border-2 border-transparent hover:border-gray-100 transition-all shadow-sm">
                            <div className="flex items-center text-gray-400 space-x-3 rtl:space-x-reverse mb-4">
                              <field.icon size={18} className="group-hover:text-primary transition-colors" />
                              <span className="text-xs font-black uppercase tracking-widest">{field.label}</span>
                            </div>
                            <p className="text-xl font-black text-brandDark">{field.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="space-y-10">
                      <h3 className="text-4xl font-black">{t.profile.orders}</h3>
                      <div className="space-y-12">
                        {orders.map(order => (
                          <div key={order.id} className="bg-white rounded-[3rem] p-10 border-2 border-gray-50 hover:border-primary/20 transition-all shadow-sm hover:shadow-xl group">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                              <div>
                                <h4 className="text-primary font-black text-4xl mb-2">{order.id}</h4>
                                <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-400 font-bold">
                                  <Clock size={16} />
                                  <span>{order.date}</span>
                                </div>
                              </div>
                              <button className="px-8 py-3 bg-brandDark text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary transition-colors">
                                {t.profile.reorder}
                              </button>
                            </div>
                            
                            <div className="bg-gray-50 rounded-[2rem] p-8 mb-10">
                              <p className="text-xl font-bold text-gray-500 mb-2 italic">"{order.items}"</p>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-black uppercase text-xs tracking-widest">Final Total</span>
                                <span className="text-3xl font-black text-brandDark">{order.total}</span>
                              </div>
                            </div>

                            <div className="border-t border-gray-100 pt-10">
                              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                                <Tag size={18} className="text-primary" />
                                <h5 className="text-sm font-black uppercase tracking-widest text-gray-400">{t.profile.trackOrder}</h5>
                              </div>
                              <OrderStatus status={order.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'rewards' && (
                    <div className="text-center space-y-12 py-10">
                      <div className="inline-block relative">
                        <div className="absolute -inset-10 bg-accent rounded-full opacity-5 blur-3xl animate-pulse"></div>
                        <div className="relative p-12 bg-white rounded-[4rem] shadow-2xl border-4 border-accent/20">
                          <Award size={96} className="text-accent mx-auto mb-6" />
                          <h3 className="text-7xl font-black text-brandDark mb-2">2,450</h3>
                          <p className="text-2xl font-black text-accent uppercase tracking-[0.2em]">{t.profile.points}</p>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xl max-w-md mx-auto font-medium leading-relaxed">{t.profile.pointsDesc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { val: 10, points: 500 },
                          { val: 25, points: 1200 },
                          { val: 50, points: 2000 }
                        ].map((reward, i) => (
                          <div key={i} className="p-10 bg-gray-50 rounded-[3rem] border-2 border-transparent hover:border-accent hover:bg-white transition-all group cursor-pointer shadow-sm">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 transition-transform">
                              <Tag size={32} />
                            </div>
                            <span className="text-brandDark font-black text-4xl block mb-2">${reward.val}</span>
                            <span className="text-gray-400 text-sm font-black uppercase tracking-widest">OFF VOUCHER</span>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <span className="text-accent font-black">{reward.points} Points</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'addresses' && (
                    <div className="space-y-10">
                      <div className="flex justify-between items-center">
                        <h3 className="text-4xl font-black">{t.profile.addresses}</h3>
                        <button className="bg-primary text-white p-5 rounded-3xl hover-scale shadow-xl shadow-red-200">
                          <Plus size={24} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-8">
                        {[
                          { type: 'Home', address: 'Apartment 42, Nile View Plaza, Zamalek, Cairo', icon: Home },
                          { type: 'Work', address: 'Tech Square, Building 5, Sheikh Zayed City', icon: LayoutGrid }
                        ].map((addr, i) => (
                          <div key={i} className="bg-gray-50 p-10 rounded-[3rem] flex items-center justify-between group hover:bg-white border-2 border-transparent hover:border-gray-100 transition-all shadow-sm">
                            <div className="flex items-center space-x-8 rtl:space-x-reverse">
                              <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <addr.icon size={32} />
                              </div>
                              <div>
                                <h4 className="font-black text-2xl text-brandDark mb-2">{addr.type}</h4>
                                <p className="text-gray-500 font-bold text-lg max-w-md">{addr.address}</p>
                              </div>
                            </div>
                            <button className="text-gray-300 hover:text-primary transition-colors p-4">
                              <ChevronRight className="rtl:rotate-180" size={32} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'admin' && <AdminPanel />}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


import React, { useState } from 'react';
// Added Plus to the import list from lucide-react
import { User, Package, MapPin, Award, LogOut, ChevronRight, Edit2, Phone, Mail, Plus } from 'lucide-react';
import { useApp } from '../AppContext';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { t, lang } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'rewards' | 'addresses'>('info');

  const orders = [
    { id: '#LZ-4921', date: 'Oct 24, 2023', total: '$42.50', status: 'Completed', items: '2x Supreme Burger, 1x Gold Fries' },
    { id: '#LZ-4810', date: 'Oct 12, 2023', total: '$18.99', status: 'In Transit', items: '1x Truffle Pizza' }
  ];

  const addresses = [
    { type: 'Home', address: '123 Nile St, Zamalek, Cairo' },
    { type: 'Work', address: 'Tech Park, Building B, Sheikh Zayed' }
  ];

  const tabs = [
    { id: 'info', label: t.nav.profile, icon: User },
    { id: 'orders', label: t.profile.orders, icon: Package },
    { id: 'rewards', label: t.profile.rewards, icon: Award },
    { id: 'addresses', label: t.profile.addresses, icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-brandLight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-[2.5rem] soft-shadow p-8 sticky top-32">
              <div className="text-center mb-10">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <User size={48} className="text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-accent rounded-full border-2 border-white text-brandDark shadow-md">
                    <Edit2 size={12} />
                  </button>
                </div>
                <h2 className="text-2xl font-black text-brandDark">Ahmed Lazez</h2>
                <p className="text-gray-400 font-bold">Gold Member</p>
              </div>

              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl font-bold transition-all ${
                      activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 mt-8 transition-all">
                  <LogOut size={20} />
                  <span>{t.profile.logout}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-[3rem] soft-shadow min-h-[600px] p-8 md:p-12">
              
              {activeTab === 'info' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  <h3 className="text-3xl font-black mb-8">{t.nav.profile}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-gray-50 rounded-[2rem] space-y-2">
                      <div className="flex items-center text-gray-400 space-x-2 rtl:space-x-reverse mb-1">
                        <Mail size={16} />
                        <span className="text-xs font-black uppercase">Email Address</span>
                      </div>
                      <p className="text-lg font-bold text-brandDark">ahmed@lazez.com</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-[2rem] space-y-2">
                      <div className="flex items-center text-gray-400 space-x-2 rtl:space-x-reverse mb-1">
                        <Phone size={16} />
                        <span className="text-xs font-black uppercase">Phone Number</span>
                      </div>
                      <p className="text-lg font-bold text-brandDark">+20 100 000 0000</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-3xl font-black mb-8">{t.profile.orders}</h3>
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border-2 border-gray-50 rounded-[2rem] p-8 hover:border-primary/20 transition-colors group">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                          <div>
                            <span className="text-primary font-black text-xl">{order.id}</span>
                            <p className="text-gray-400 font-bold">{order.date}</p>
                          </div>
                          <div className={`px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-gray-500 font-medium max-w-md">{order.items}</p>
                          <div className="text-right">
                            <span className="text-gray-400 text-sm block">{t.cart.total}</span>
                            <span className="text-2xl font-black text-brandDark">{order.total}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                  <div className="inline-block p-10 bg-accent/10 rounded-[4rem] mb-8">
                    <Award size={80} className="text-accent mx-auto mb-4" />
                    <h3 className="text-5xl font-black text-brandDark mb-2">2,450</h3>
                    <p className="text-xl font-bold text-accent uppercase tracking-widest">{t.profile.points}</p>
                  </div>
                  <p className="text-gray-500 text-lg max-w-sm mx-auto font-medium mb-10">{t.profile.pointsDesc}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[10, 20, 50].map(val => (
                      <div key={val} className="p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent hover:border-primary transition-all">
                        <span className="text-primary font-black text-2xl mb-1 block">${val}</span>
                        <span className="text-gray-400 text-xs font-black uppercase">Voucher</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-black">{t.profile.addresses}</h3>
                    <button className="bg-primary text-white p-3 rounded-full hover-scale">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {addresses.map((addr, i) => (
                      <div key={i} className="bg-gray-50 p-8 rounded-[2rem] flex items-start justify-between group">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className="p-3 bg-white rounded-xl shadow-sm">
                            <MapPin size={24} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-black text-xl text-brandDark mb-1">{addr.type}</h4>
                            <p className="text-gray-500 font-medium">{addr.address}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-primary p-2">
                          <ChevronRight className="rtl:rotate-180" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

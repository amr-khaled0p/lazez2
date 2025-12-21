
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Category } from './types';
import { translations } from './translations';
import { MENU_ITEMS as DEFAULT_MENU } from './constants';

interface CartItem extends MenuItem {
  quantity: number;
}

interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AppContextType {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  t: any;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  menu: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Persistent Menu State
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('lazez_menu');
    return saved ? JSON.parse(saved) : DEFAULT_MENU;
  });

  useEffect(() => {
    localStorage.setItem('lazez_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = lang === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif';
  }, [lang]);

  const t = translations[lang];

  const login = (email: string) => {
    const isAdmin = email.toLowerCase() === 'admin@lazez.com';
    const newUser = {
      email,
      name: isAdmin ? 'Master Chef' : email.split('@')[0],
      isAdmin
    };
    setUser(newUser);
    localStorage.setItem('lazez_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lazez_user');
  };

  // Recovery of user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('lazez_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  // CMS Logic
  const addMenuItem = (item: MenuItem) => setMenu(prev => [...prev, item]);
  const updateMenuItem = (item: MenuItem) => setMenu(prev => prev.map(i => i.id === item.id ? item : i));
  const deleteMenuItem = (id: string) => setMenu(prev => prev.filter(i => i.id !== id));

  return (
    <AppContext.Provider value={{
      lang, setLang, t, cart, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen,
      user, login, logout, menu, addMenuItem, updateMenuItem, deleteMenuItem
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

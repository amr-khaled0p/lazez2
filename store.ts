
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, Category, Sale, SiteSettings } from './types';
import { MENU_ITEMS } from './constants';

interface AppState {
  menu: MenuItem[];
  sales: Sale[];
  cart: any[];
  lang: 'ar' | 'en';
  isDarkMode: boolean;
  user: any | null;
  settings: SiteSettings;
  isCartOpen: boolean;
  toggleCart: (open?: boolean) => void;
  toggleDarkMode: () => void;
  setUser: (user: any) => void;
  setLang: (lang: 'ar' | 'en') => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  addSale: (sale: Sale) => void;
  updateStock: (id: string, amount: number) => void;
  updateModifierStock: (itemId: string, modifierId: string, amount: number) => void;
  addToCart: (item: MenuItem) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      menu: MENU_ITEMS,
      sales: [],
      cart: [],
      lang: 'ar',
      isDarkMode: false,
      user: null,
      isCartOpen: false,
      settings: {
        heroTitle: 'تذوق اللا مثيل له',
        heroSubtitle: 'نرفع مستوى طعام الشارع بمكونات فاخرة، وصفات حرفية، ولمسة من الكمال الذهبي.',
        primaryColor: '#FF6B35',
        isClosed: false
      },

      toggleCart: (open) => set((state) => ({ isCartOpen: open ?? !state.isCartOpen })),

      toggleDarkMode: () => set((state) => {
        const next = !state.isDarkMode;
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { isDarkMode: next };
      }),

      setUser: (user) => set({ user }),
      
      setLang: (lang) => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        set({ lang });
      },

      updateSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),

      addSale: (sale) => set((state) => ({ sales: [sale, ...state.sales] })),
      
      updateStock: (id, amount) => set((state) => ({
        menu: state.menu.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + amount) } : i)
      })),

      updateModifierStock: (itemId, modifierId, amount) => set((state) => ({
        menu: state.menu.map(item => item.id === itemId ? {
          ...item,
          modifiers: item.modifiers?.map(m => m.id === modifierId ? { ...m, stock: Math.max(0, m.stock + amount) } : m)
        } : item)
      })),

      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),
    }),
    { name: 'lazez-erp-v2-storage' }
  )
);

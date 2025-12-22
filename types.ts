
export enum Category {
  ALL = 'All',
  BURGERS = 'Burgers',
  PIZZA = 'Pizza',
  SIDES = 'Sides',
  DRINKS = 'Drinks'
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Exclusion {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isBestSeller?: boolean;
  stock: number;
  modifiers?: Modifier[];
  exclusions?: Exclusion[]; // المكونات التي يمكن إزالتها
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
}

export interface Sale {
  id: string;
  items: { 
    name: string; 
    quantity: number; 
    price: number;
    extras?: string[];
    removals?: string[];
  }[];
  total: number;
  date: string;
  paymentMethod: 'Cash' | 'Card';
  type: 'Online' | 'POS';
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  isClosed: boolean;
}

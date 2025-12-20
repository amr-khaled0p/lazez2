
export enum Category {
  ALL = 'All',
  BURGERS = 'Burgers',
  PIZZA = 'Pizza',
  SIDES = 'Sides',
  DRINKS = 'Drinks'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isBestSeller?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
}

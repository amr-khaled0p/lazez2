
import { Category, MenuItem, Branch } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'The Lazez Supreme',
    description: 'Double Wagyu beef, melted cheddar, caramelized onions, and our secret gold sauce.',
    price: 14.99,
    category: Category.BURGERS,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Truffle Mushroom Pizza',
    description: 'Authentic Neapolitan crust, wild mushrooms, truffle oil, and fresh mozzarella.',
    price: 18.50,
    category: Category.PIZZA,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Spicy Zinger Crunch',
    description: 'Ultra-crispy chicken breast, jalapeno slaw, and spicy mayo on a toasted brioche bun.',
    price: 11.99,
    category: Category.BURGERS,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Garden Fresh Veggie',
    description: 'Bell peppers, olives, mushrooms, onions, and sweet corn on a thin crust.',
    price: 15.99,
    category: Category.PIZZA,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Loaded Gold Fries',
    description: 'Hand-cut fries topped with liquid gold cheese, bacon bits, and spring onions.',
    price: 6.99,
    category: Category.SIDES,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Buffalo Hot Wings',
    description: '10 pieces of juicy wings tossed in our signature buffalo glaze.',
    price: 12.50,
    category: Category.SIDES,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    name: 'Passion Fruit Mojito',
    description: 'Refreshing blend of passion fruit, mint, lime, and soda water.',
    price: 5.50,
    category: Category.DRINKS,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    name: 'Double Choco Shake',
    description: 'Rich Belgian chocolate ice cream blended with fudge brownies.',
    price: 7.99,
    category: Category.DRINKS,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800'
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'Downtown Flagship',
    address: '123 Nile Street, City Center',
    phone: '+20 123 456 7890',
    hours: '10:00 AM - 02:00 AM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.647573623916!2d31.233513!3d30.044420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjkiTiAzMcKwMTQnMDAuNyJF!5e0!3m2!1sen!2seg!4v1622548232490!5m2!1sen!2seg'
  },
  {
    id: 'b2',
    name: 'Sheikh Zayed Branch',
    address: 'Arkan Plaza, 6th of October',
    phone: '+20 123 456 7891',
    hours: '12:00 PM - 03:00 AM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123456789!2d30.987654!3d29.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjkuOTg3NjU0LCAzMC45ODc2NTQ!5e0!3m2!1sen!2seg!4v1622548232490!5m2!1sen!2seg'
  }
];

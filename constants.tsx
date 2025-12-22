
import { Category, MenuItem, Branch } from './types';

// قوالب الإضافات والنواقص المخصصة
const B_MODS = [{ id: 'm1', name: 'لحم زيادة', price: 45, stock: 50 }, { id: 'm2', name: 'جبنة شيدر', price: 15, stock: 100 }];
const B_EXC = [{ id: 'e1', name: 'بدون بصل' }, { id: 'e2', name: 'بدون طماطم' }];

const P_MODS = [{ id: 'm3', name: 'أطراف جبنة', price: 30, stock: 40 }, { id: 'm4', name: 'موزاريلا زيادة', price: 20, stock: 80 }];
const P_EXC = [{ id: 'e3', name: 'بدون زيتون' }, { id: 'e4', name: 'بدون فلفل' }];

const D_MODS = [{ id: 'm5', name: 'نكهة إضافية', price: 10, stock: 50 }, { id: 'm6', name: 'ثلج زيادة', price: 0, stock: 999 }];

export const MENU_ITEMS: MenuItem[] = [
  // --- Burgers (7) ---
  { id: 'b1', name: 'Wagyu Gold Burger', description: 'Premium wagyu beef with truffle oil.', price: 190, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', stock: 20, modifiers: B_MODS, exclusions: B_EXC, isBestSeller: true },
  { id: 'b2', name: 'Classic Smokehouse', description: 'Smoked beef with BBQ sauce.', price: 145, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800', stock: 25, modifiers: B_MODS, exclusions: B_EXC },
  { id: 'b3', name: 'Crispy Zinger Pro', description: 'Double crispy chicken breast.', price: 130, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=800', stock: 15, modifiers: B_MODS, exclusions: B_EXC },
  { id: 'b4', name: 'Mushroom Swiss', description: 'Sauteed mushrooms and swiss cheese.', price: 155, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800', stock: 12, modifiers: B_MODS, exclusions: B_EXC },
  { id: 'b5', name: 'Avocado Turkey', description: 'Fresh avocado and grilled turkey.', price: 165, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=800', stock: 10 },
  { id: 'b6', name: 'Inferno Spicy', description: 'Ghost pepper sauce and jalapenos.', price: 140, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800', stock: 18 },
  { id: 'b7', name: 'Diet Veggie', description: 'Quinoa and black bean patty.', price: 115, category: Category.BURGERS, image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800', stock: 30 },

  // --- Pizza (6) ---
  { id: 'p1', name: 'Truffle Funghi', description: 'Wild mushroom and white cream.', price: 210, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800', stock: 12, modifiers: P_MODS, exclusions: P_EXC, isBestSeller: true },
  { id: 'p2', name: 'Pepperoni King', description: 'Triple layered beef pepperoni.', price: 185, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800', stock: 20, modifiers: P_MODS, exclusions: P_EXC },
  { id: 'p3', name: 'Quattro Formaggi', description: 'Four premium Italian cheeses.', price: 230, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1573821663912-56990ae35742?q=80&w=800', stock: 15 },
  { id: 'p4', name: 'BBQ Chicken', description: 'Grilled chicken with hickory BBQ.', price: 195, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800', stock: 18 },
  { id: 'p5', name: 'Seafood Marinara', description: 'Shrimp, calamari, and garlic.', price: 280, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d415?q=80&w=800', stock: 8 },
  { id: 'p6', name: 'Vegetarian Garden', description: 'Bell peppers, olives, and corn.', price: 160, category: Category.PIZZA, image: 'https://images.unsplash.com/photo-1574071318508-1cdbcd804ffb?q=80&w=800', stock: 22 },

  // --- Sides (6) ---
  { id: 's1', name: 'Gold Loaded Fries', description: 'Cheese, bacon, and chives.', price: 85, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800', stock: 100, isBestSeller: true },
  { id: 's2', name: 'Buffalo Wings (10pcs)', description: 'Classic spicy buffalo glaze.', price: 125, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800', stock: 40 },
  { id: 's3', name: 'Mozzarella Sticks', description: 'Melty cheese with marinara.', price: 90, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1531749910660-179888262751?q=80&w=800', stock: 50 },
  { id: 's4', name: 'Onion Rings', description: 'Extra crispy beer-battered.', price: 65, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=800', stock: 80 },
  { id: 's5', name: 'Chicken Tenders', description: '5 pieces of premium breast.', price: 110, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800', stock: 35 },
  { id: 's6', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons.', price: 95, category: Category.SIDES, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800', stock: 20 },

  // --- Drinks (6) ---
  { id: 'd1', name: 'Passion Mojito', description: 'Fresh mint and passion fruit.', price: 65, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800', stock: 200, modifiers: D_MODS },
  { id: 'd2', name: 'Belgian Choco Shake', description: 'Rich dark chocolate blend.', price: 90, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800', stock: 45, modifiers: D_MODS },
  { id: 'd3', name: 'Iced Spanish Latte', description: 'Sweetened condensed milk latte.', price: 85, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800', stock: 60 },
  { id: 'd4', name: 'Berry Smoothie', description: 'Mix of forest berries and yogurt.', price: 75, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=800', stock: 40 },
  { id: 'd5', name: 'Fresh Orange', description: '100% cold pressed oranges.', price: 55, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800', stock: 50 },
  { id: 'd6', name: 'Iced Hibiscus', description: 'Traditional Egyptian blend.', price: 40, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800', stock: 100 }
];

export const BRANCHES: Branch[] = [
  { id: 'b1', name: 'Downtown Flagship', address: '123 Nile Street, City Center', phone: '+20 123 456 7890', hours: '10:00 AM - 02:00 AM', mapUrl: '' },
  { id: 'b2', name: 'Sheikh Zayed Branch', address: 'Arkan Plaza, 6th of October', phone: '+20 123 456 7891', hours: '12:00 PM - 03:00 AM', mapUrl: '' }
];

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  type: 'course' | 'mentorship';
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  get itemCount(): number;
  get totalAmount(): number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Prevent adding duplicate items
        if (state.items.some(i => i.id === item.id)) {
          return state;
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter((item) => item.id !== id) 
      })),
      clearCart: () => set({ items: [] }),
      get itemCount() {
        return get().items.length;
      },
      get totalAmount() {
        return get().items.reduce((total, item) => total + item.price, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);

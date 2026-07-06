import { create } from 'zustand';

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  thumbnail: string;
  type: 'course' | 'session';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  
  // Notification State
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial Cart State
  cart: [],
  
  // Cart Actions
  addToCart: (item) => set((state) => {
    // Check if item already exists to prevent duplicates
    if (state.cart.some(cartItem => cartItem.id === item.id)) {
      return state;
    }
    
    // Add success notification automatically when adding to cart
    state.addNotification({
      title: "Added to Cart",
      message: `${item.title} has been added to your cart.`
    });
    
    return { cart: [...state.cart, item] };
  }),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  // Initial Notification State (mocking some initial notifications)
  notifications: [
    {
      id: "notif-1",
      title: "Welcome to BlueBoxx!",
      message: "Complete your profile to get personalized recommendations.",
      read: false,
      timestamp: new Date().toISOString()
    }
  ],
  
  // Notification Actions
  addNotification: (notif) => set((state) => ({
    notifications: [
      {
        ...notif,
        id: `notif-${Date.now()}`,
        read: false,
        timestamp: new Date().toISOString()
      },
      ...state.notifications
    ]
  })),
  
  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  
  clearNotifications: () => set({ notifications: [] })
}));

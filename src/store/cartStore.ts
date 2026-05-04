// store/cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (
    productId: string,
    color: string,
    size: string,
    quantity: number,
  ) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
  totalPrice: () => number;
  itemsCount: () => number;
  fetchServerCart: () => Promise<void>;
  syncToServer: () => Promise<void>;
  _loaded: boolean;
  _setLoaded: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _loaded: false,

      _setLoaded: () => set({ _loaded: true }),

      addItem: (item) => {
        const qty = item.quantity || 1;
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.color === item.color &&
              i.size === item.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.color === item.color &&
                i.size === item.size
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.color === color &&
                i.size === size
              ),
          ),
        }));
      },

      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color && i.size === size
              ? { ...i, quantity }
              : i,
          ),
        }));
      },

      setItems: (items) => set({ items }),

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },

      itemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // store/cartStore.ts

      fetchServerCart: async () => {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            if (data.items && data.items.length > 0) {
              // Сервер — источник правды
              set({ items: data.items });
            }
          }
        } catch {
          // Не авторизован
        }
      },

      syncToServer: async () => {
        try {
          const items = get().items;
          const totalPrice = get().totalPrice();
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items, totalPrice }),
          });
          if (res.ok) {
            const data = await res.json();
            // Синхронизируем локальное с серверным
            set({ items: data.items });
          }
        } catch {
          // Не авторизован
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }), // сохраняем только items
    },
  ),
);

function mergeCartItems(local: CartItem[], server: CartItem[]): CartItem[] {
  const merged = new Map<string, CartItem>();

  for (const item of server) {
    const key = `${item.productId}-${item.color}-${item.size}`;
    merged.set(key, { ...item });
  }

  for (const item of local) {
    const key = `${item.productId}-${item.color}-${item.size}`;
    const existing = merged.get(key);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      merged.set(key, { ...item });
    }
  }

  return Array.from(merged.values());
}

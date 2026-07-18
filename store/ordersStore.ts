import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mockOrders } from '@/data/orders';
import { getProductById } from '@/data/products';
import type { CartItem, Order, OrderStatusEntry } from '@/data/types';
import { asyncStorage } from '@/lib/storage';

type OrdersState = {
  localOrders: Order[];
  placeOrder: (items: CartItem[], notes?: string) => Order;
  getAllOrders: () => Order[];
};

export function mergeOrders(localOrders: Order[]): Order[] {
  const mockIds = new Set(mockOrders.map((o) => o.id));
  const uniqueLocal = localOrders.filter((o) => !mockIds.has(o.id));
  return [...uniqueLocal, ...mockOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      localOrders: [],
      placeOrder: (items, notes) => {
        const now = new Date().toISOString();
        const trimmedNotes = notes?.trim();
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          total: calcTotal(items),
          status: 'processing',
          createdAt: now,
          statusHistory: [{ status: 'processing', date: now }] as OrderStatusEntry[],
          ...(trimmedNotes ? { notes: trimmedNotes } : {}),
        };
        set((state) => ({ localOrders: [order, ...state.localOrders] }));
        return order;
      },
      getAllOrders: () => mergeOrders(get().localOrders),
    }),
    {
      name: 'orders-storage',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
);

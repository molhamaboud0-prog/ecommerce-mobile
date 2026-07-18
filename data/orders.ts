import type { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    items: [{ productId: 'prod-001', quantity: 2 }],
    total: 89.98,
    status: 'delivered',
    createdAt: '2026-07-01T10:00:00Z',
    statusHistory: [
      { status: 'processing', date: '2026-07-01T10:00:00Z' },
      { status: 'shipping', date: '2026-07-02T08:00:00Z' },
      { status: 'delivered', date: '2026-07-04T14:00:00Z' },
    ],
  },
  {
    id: 'ORD-1002',
    items: [
      { productId: 'prod-005', quantity: 1 },
      { productId: 'prod-012', quantity: 3 },
    ],
    total: 156.5,
    status: 'shipping',
    createdAt: '2026-07-10T15:30:00Z',
    statusHistory: [
      { status: 'processing', date: '2026-07-10T15:30:00Z' },
      { status: 'shipping', date: '2026-07-11T09:00:00Z' },
    ],
  },
  {
    id: 'ORD-1003',
    items: [{ productId: 'prod-020', quantity: 1 }],
    total: 45.0,
    status: 'processing',
    createdAt: '2026-07-13T08:00:00Z',
    statusHistory: [{ status: 'processing', date: '2026-07-13T08:00:00Z' }],
  },
];

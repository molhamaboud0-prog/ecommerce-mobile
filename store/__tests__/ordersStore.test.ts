import { act, renderHook } from '@testing-library/react-native';

import { mockOrders } from '@/data/orders';
import { useOrdersStore } from '@/store/ordersStore';

describe('useOrdersStore', () => {
  beforeEach(() => {
    useOrdersStore.setState({ localOrders: [] });
  });

  it('places a new order', () => {
    const { result } = renderHook(() => useOrdersStore());

    act(() => {
      const order = result.current.placeOrder([{ productId: 'prod-001', quantity: 1 }]);
      expect(order.id).toMatch(/^ORD-/);
      expect(order.status).toBe('processing');
    });

    expect(result.current.localOrders).toHaveLength(1);
  });

  it('saves order notes when provided', () => {
    const { result } = renderHook(() => useOrdersStore());

    act(() => {
      const order = result.current.placeOrder(
        [{ productId: 'prod-001', quantity: 1 }],
        '  Leave at door  ',
      );
      expect(order.notes).toBe('Leave at door');
    });
  });

  it('omits empty order notes', () => {
    const { result } = renderHook(() => useOrdersStore());

    act(() => {
      const order = result.current.placeOrder(
        [{ productId: 'prod-001', quantity: 1 }],
        '   ',
      );
      expect(order.notes).toBeUndefined();
    });
  });

  it('merges local orders with mock orders', () => {
    const { result } = renderHook(() => useOrdersStore());

    act(() => {
      result.current.placeOrder([{ productId: 'prod-002', quantity: 2 }]);
    });

    const all = result.current.getAllOrders();
    expect(all.length).toBeGreaterThan(mockOrders.length);
  });
});

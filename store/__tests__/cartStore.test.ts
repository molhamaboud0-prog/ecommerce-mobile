import { act, renderHook } from '@testing-library/react-native';

import { useCartStore } from '@/store/cartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], notes: '' });
  });

  it('adds new item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ productId: 'p1', quantity: 1 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.productId).toBe('p1');
  });

  it('increments quantity for existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ productId: 'p1', quantity: 1 });
      result.current.addItem({ productId: 'p1', quantity: 2 });
    });

    expect(result.current.items[0]?.quantity).toBe(3);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ productId: 'p1', quantity: 1 });
      result.current.removeItem('p1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem({ productId: 'p1', quantity: 1 });
      result.current.setNotes('Leave at door');
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.notes).toBe('');
  });

  it('stores order notes', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.setNotes('Call before delivery');
    });

    expect(result.current.notes).toBe('Call before delivery');
  });
});

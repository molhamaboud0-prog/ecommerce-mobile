import { renderHook, act } from '@testing-library/react-native';

import { usePaginatedList } from '@/hooks/usePaginatedList';

describe('usePaginatedList', () => {
  const source = Array.from({ length: 45 }, (_, i) => ({ id: String(i) }));

  it('returns first page of 20 items by default', () => {
    const { result } = renderHook(() => usePaginatedList(source));

    expect(result.current.items).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.totalCount).toBe(45);
  });

  it('loads more items when loadMore is called', () => {
    const { result } = renderHook(() => usePaginatedList(source));

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.items).toHaveLength(40);
    expect(result.current.hasMore).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.items).toHaveLength(45);
    expect(result.current.hasMore).toBe(false);
  });

  it('resets to first page', () => {
    const { result } = renderHook(() => usePaginatedList(source));

    act(() => {
      result.current.loadMore();
      result.current.reset();
    });

    expect(result.current.items).toHaveLength(20);
    expect(result.current.page).toBe(1);
  });

  it('respects custom pageSize', () => {
    const { result } = renderHook(() => usePaginatedList(source, { pageSize: 10 }));

    expect(result.current.items).toHaveLength(10);
  });
});

import { useCallback, useMemo, useState } from 'react';

import { listConfig } from '@/lib/theme';

type UsePaginatedListOptions = {
  pageSize?: number;
};

type UsePaginatedListResult<T> = {
  items: T[];
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  page: number;
  totalCount: number;
};

export function usePaginatedList<T>(
  sourceItems: T[],
  options: UsePaginatedListOptions = {},
): UsePaginatedListResult<T> {
  const pageSize = options.pageSize ?? listConfig.pageSize;
  const [page, setPage] = useState(1);

  const items = useMemo(
    () => sourceItems.slice(0, page * pageSize),
    [sourceItems, page, pageSize],
  );

  const hasMore = items.length < sourceItems.length;

  const loadMore = useCallback(() => {
    if (items.length < sourceItems.length) {
      setPage((current) => current + 1);
    }
  }, [items.length, sourceItems.length]);

  const reset = useCallback(() => {
    setPage(1);
  }, []);

  return {
    items,
    hasMore,
    loadMore,
    reset,
    page,
    totalCount: sourceItems.length,
  };
}

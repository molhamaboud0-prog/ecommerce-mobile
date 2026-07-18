import { useCallback, useState } from 'react';

const REFRESH_DELAY_MS = 700;

export function usePullToRefresh(onRefresh?: () => void | Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh?.();
      await new Promise((resolve) => setTimeout(resolve, REFRESH_DELAY_MS));
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return { refreshing, onRefresh: handleRefresh };
}

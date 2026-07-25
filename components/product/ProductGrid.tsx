import { useCallback } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import type { Product } from '@/data/types';
import { usePaginatedList } from '@/hooks/usePaginatedList';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useThemeColors } from '@/hooks/useThemeColors';
import { listConfig, spacing } from '@/lib/theme';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

type ProductGridProps = {
  products: Product[];
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  onRefresh?: () => void | Promise<void>;
};

const GRID_GAP = spacing.sm;

export function ProductGrid({
  products,
  ListHeaderComponent,
  ListEmptyComponent,
  onRefresh,
}: ProductGridProps) {
  const c = useThemeColors();
  const { items, hasMore, loadMore, reset } = usePaginatedList(products);
  const handleGridRefresh = useCallback(async () => {
    reset();
    await onRefresh?.();
  }, [onRefresh, reset]);
  const { refreshing, onRefresh: handleRefresh } = usePullToRefresh(handleGridRefresh);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={{ flex: 1, padding: GRID_GAP / 2 }}>
        <ProductCard product={item} fullWidth />
      </View>
    ),
    [],
  );

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      onEndReached={() => {
        if (hasMore) loadMore();
      }}
      onEndReachedThreshold={listConfig.onEndReachedThreshold}
      contentContainerStyle={{
        paddingHorizontal: spacing.md - GRID_GAP / 2,
        paddingTop: GRID_GAP,
        paddingBottom: GRID_GAP,
        ...(ListEmptyComponent ? { flexGrow: 1 } : {}),
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={c.accent}
          colors={[c.accent]}
        />
      }
      ListHeaderComponent={ListHeaderComponent ?? undefined}
      ListEmptyComponent={ListEmptyComponent ?? undefined}
      ListFooterComponent={
        hasMore ? (
          <View className="flex-row px-2 py-4">
            <View style={{ flex: 1, padding: GRID_GAP / 2 }}>
              <ProductSkeleton fullWidth />
            </View>
            <View style={{ flex: 1, padding: GRID_GAP / 2 }}>
              <ProductSkeleton fullWidth />
            </View>
          </View>
        ) : (
          <View className="h-4" />
        )
      }
    />
  );
}

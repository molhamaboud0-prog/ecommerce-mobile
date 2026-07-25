import { View } from 'react-native';

import { Skeleton } from '@/components/ui/Skeleton';

export function ProductSkeleton({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <View
      className={`overflow-hidden rounded-2xl bg-surface ${fullWidth ? 'w-full' : 'mb-3 w-[48%]'}`}
    >
      <Skeleton height={160} rounded="lg" />
      <View className="p-3">
        <Skeleton height={14} width="90%" className="mb-2" />
        <Skeleton height={14} width="60%" />
        <Skeleton height={18} width="40%" className="mt-2" />
      </View>
    </View>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <View className="flex-row flex-wrap justify-between px-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </View>
  );
}

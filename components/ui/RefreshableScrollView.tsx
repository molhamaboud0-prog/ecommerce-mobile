import { RefreshControl, ScrollView, type ScrollViewProps } from 'react-native';

import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useThemeColors } from '@/hooks/useThemeColors';

type RefreshableScrollViewProps = ScrollViewProps & {
  onRefresh?: () => void | Promise<void>;
};

export function RefreshableScrollView({
  onRefresh,
  children,
  ...props
}: RefreshableScrollViewProps) {
  const { refreshing, onRefresh: handleRefresh } = usePullToRefresh(onRefresh);
  const c = useThemeColors();

  return (
    <ScrollView
      {...props}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={c.accent}
          colors={[c.accent]}
        />
      }
    >
      {children}
    </ScrollView>
  );
}

import { useMemo } from 'react';
import { View } from 'react-native';
import { Package } from 'lucide-react-native';
import { Stack, router } from 'expo-router';

import { OrderCard } from '@/components/orders/OrderCard';
import { EmptyState, RefreshableScrollView } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigationOptions } from '@/lib/navigation';
import { mergeOrders, useOrdersStore } from '@/store/ordersStore';

export default function OrdersScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const { titledScreenOptions } = useNavigationOptions();
  const localOrders = useOrdersStore((s) => s.localOrders);
  const orders = useMemo(() => mergeOrders(localOrders), [localOrders]);

  return (
    <>
      <Stack.Screen options={titledScreenOptions(t('common.orders'))} />
      <View className="flex-1 bg-background">
        <RefreshableScrollView
          className="px-4 py-4"
          contentContainerStyle={orders.length === 0 ? { flexGrow: 1 } : undefined}
        >
          {orders.length === 0 ? (
            <EmptyState
              title={t('common.emptyOrders')}
              description={t('common.emptyOrdersDescription')}
              icon={<Package size={34} color={c.muted} />}
              actionLabel={t('common.browseShop')}
              onAction={() => router.push('/(drawer)/(tabs)/categories')}
            />
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </RefreshableScrollView>
      </View>
    </>
  );
}

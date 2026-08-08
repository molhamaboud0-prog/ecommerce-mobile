import { View } from 'react-native';
import { Check } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { Badge } from '@/components/ui/Badge';
import { getProductById } from '@/data/products';
import type { Order, OrderStatus } from '@/data/types';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

const STATUS_ORDER: OrderStatus[] = ['processing', 'shipping', 'delivered'];

const STATUS_BADGE_VARIANT: Record<OrderStatus, 'warning' | 'accent' | 'success'> = {
  processing: 'warning',
  shipping: 'accent',
  delivered: 'success',
};

type OrderStatusTimelineProps = {
  order: Order;
};

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const currentIndex = STATUS_ORDER.indexOf(order.status ?? 'processing');

  const labels: Record<OrderStatus, string> = {
    processing: t('common.processing'),
    shipping: t('common.shipping'),
    delivered: t('common.delivered'),
  };

  return (
    <View className="flex-row items-center justify-between py-2">
      {STATUS_ORDER.map((status, index) => {
        const isActive = index <= currentIndex;
        return (
          <View key={status} className="flex-1 items-center">
            <View
              className={`h-8 w-8 items-center justify-center rounded-full ${
                isActive ? 'bg-accent' : 'bg-surface-alt'
              }`}
            >
              {isActive ? <Check size={14} color="#fff" /> : null}
            </View>
            <Text
              className={`mt-1 text-center text-xs ${
                isActive ? 'font-medium text-ink' : 'text-muted'
              }`}
            >
              {labels[status]}
            </Text>
            {index < STATUS_ORDER.length - 1 ? (
              <View
                className="absolute left-[60%] top-4 h-0.5 w-[80%]"
                style={{ backgroundColor: index < currentIndex ? c.accent : c.border }}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function OrderItemThumbnails({ order }: { order: Order }) {
  const items = order.items ?? [];
  const shown = items.slice(0, 4);
  const extra = items.length - shown.length;

  if (shown.length === 0) return null;

  return (
    <View className="mb-3 flex-row items-center">
      {shown.map((item, index) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return (
          <View
            key={item.productId}
            className="overflow-hidden rounded-lg border-2 border-surface"
            style={{ marginLeft: index === 0 ? 0 : -10 }}
          >
            <AppImage
              source={{ uri: product.images[0] }}
              style={{ width: 44, height: 44 }}
              contentFit="cover"
            />
          </View>
        );
      })}
      {extra > 0 ? <Text className="ml-2 text-xs text-muted">+{extra}</Text> : null}
    </View>
  );
}

type OrderCardProps = {
  order: Order;
};

export function OrderCard({ order }: OrderCardProps) {
  const { t } = useAppTranslation();
  const date = new Date(order.createdAt).toLocaleDateString();
  const total = Number(order.total) || 0;
  const status = order.status ?? 'processing';

  const statusLabels: Record<OrderStatus, string> = {
    processing: t('common.processing'),
    shipping: t('common.shipping'),
    delivered: t('common.delivered'),
  };

  return (
    <View className="mb-4 rounded-2xl bg-surface p-4" style={shadowCard}>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-bold text-ink">{order.id}</Text>
        <Badge label={statusLabels[status]} variant={STATUS_BADGE_VARIANT[status]} />
      </View>
      <OrderItemThumbnails order={order} />
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-bold text-accent">${total.toFixed(2)}</Text>
        <Text className="text-sm text-muted">{date}</Text>
      </View>
      {order.notes ? (
        <View className="mb-3 rounded-xl bg-surface-alt px-3 py-2">
          <Text className="font-medium text-xs text-muted">{t('common.orderNotes')}</Text>
          <Text className="mt-1 text-sm text-ink">{order.notes}</Text>
        </View>
      ) : null}
      <OrderStatusTimeline order={order} />
    </View>
  );
}

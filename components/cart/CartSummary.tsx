import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { useAppTranslation } from '@/hooks/useLocalized';
import { shadowCard } from '@/lib/theme';

type CartSummaryProps = {
  subtotal: number;
  itemCount?: number;
};

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const { t } = useAppTranslation();

  return (
    <View className="rounded-2xl bg-surface p-4" style={shadowCard}>
      <View className="flex-row justify-between">
        <Text className="text-muted">{t('common.subtotal')}</Text>
        <Text className="font-medium text-ink">${subtotal.toFixed(2)}</Text>
      </View>
      {itemCount !== undefined ? (
        <View className="mt-1 flex-row justify-between">
          <Text className="text-muted">
            {t('common.itemsCount', { count: itemCount })}
          </Text>
        </View>
      ) : null}
      <View className="mt-2 flex-row justify-between border-t border-border pt-2">
        <Text className="font-bold text-lg text-ink">{t('common.total')}</Text>
        <Text className="font-bold text-lg text-accent">${subtotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

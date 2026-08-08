import { useMemo, useState } from 'react';
import { Modal, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CheckCircle2, ShoppingCart } from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { CartItemRow, CartNotes, CartSummary } from '@/components/cart';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button, EmptyState, RefreshableScrollView, showToast } from '@/components/ui';
import { getProductById } from '@/data/products';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';

function OrderSuccessModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t } = useAppTranslation();
  const c = useThemeColors();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-8">
        <View
          className="w-full items-center rounded-3xl bg-surface p-8"
          style={shadowCard}
        >
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-success-soft">
            <CheckCircle2 size={44} color={c.success} />
          </View>
          <Text className="text-center font-bold text-xl text-ink">
            {t('common.orderPlaced')}
          </Text>
          <Text className="mt-2 text-center text-muted">
            {t('common.orderPlacedMessage')}
          </Text>
          <View className="mt-6 w-full gap-3">
            <Button
              title={t('common.viewOrders')}
              onPress={() => {
                onClose();
                router.push('/orders');
              }}
            />
            <Button
              title={t('common.continueShopping')}
              variant="ghost"
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function CartScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const items = useCartStore((s) => s.items);
  const notes = useCartStore((s) => s.notes);
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrdersStore((s) => s.placeOrder);
  const [successVisible, setSuccessVisible] = useState(false);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [items],
  );
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const handlePlaceOrder = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    placeOrder(items, notes);
    clearCart();
    showToast(t('common.orderPlaced'));
    setSuccessVisible(true);
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <ScreenHeader title={t('common.cart')} />
        <RefreshableScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <EmptyState
            title={t('common.emptyCart')}
            description={t('common.emptyCartDescription')}
            icon={<ShoppingCart size={34} color={c.muted} />}
            actionLabel={t('common.browseShop')}
            onAction={() => router.push('/(drawer)/(tabs)/categories')}
          />
        </RefreshableScrollView>
        <OrderSuccessModal
          visible={successVisible}
          onClose={() => setSuccessVisible(false)}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.cart')} />
      <RefreshableScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return <CartItemRow key={item.productId} item={item} product={product} />;
        })}
        <CartSummary subtotal={subtotal} itemCount={itemCount} />
        <CartNotes />
      </RefreshableScrollView>

      <SafeAreaView
        edges={['bottom']}
        className="border-t border-border bg-surface px-4 py-3"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-muted">{t('common.total')}</Text>
            <Text className="font-bold text-xl text-accent">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="w-48">
            <Button title={t('common.checkout')} onPress={handlePlaceOrder} />
          </View>
        </View>
      </SafeAreaView>

      <OrderSuccessModal
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
      />
    </View>
  );
}

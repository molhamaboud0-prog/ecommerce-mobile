import { Pressable, View } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import type { CartItem, Product } from '@/data/types';
import { useAppTranslation, useLocalizedProduct } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';
import { useCartStore } from '@/store/cartStore';

type CartItemRowProps = {
  item: CartItem;
  product: Product;
};

export function CartItemRow({ item, product }: CartItemRowProps) {
  const { title } = useLocalizedProduct(product);
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <View className="mb-3 flex-row rounded-2xl bg-surface p-3" style={shadowCard}>
      <AppImage
        source={{ uri: product.images[0] }}
        className="h-24 w-24 rounded-xl"
        contentFit="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="font-medium text-ink" numberOfLines={2}>
          {title}
        </Text>
        <Text className="mt-0.5 text-xs text-muted">
          {t('common.unitPrice', { price: `$${product.price.toFixed(2)}` })}
        </Text>
        <Text className="mt-1 font-bold text-accent">
          ${(product.price * item.quantity).toFixed(2)}
        </Text>
        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center rounded-lg bg-surface-alt">
            <Pressable
              onPress={() => updateQuantity(item.productId, item.quantity - 1)}
              className="px-3 py-1.5 active:opacity-60"
            >
              <Minus size={16} color={c.ink} />
            </Pressable>
            <Text className="px-2 font-semibold text-ink">{item.quantity}</Text>
            <Pressable
              onPress={() => updateQuantity(item.productId, item.quantity + 1)}
              className="px-3 py-1.5 active:opacity-60"
            >
              <Plus size={16} color={c.ink} />
            </Pressable>
          </View>
          <Pressable
            onPress={() => removeItem(item.productId)}
            className="p-2 active:opacity-60"
          >
            <Trash2 size={18} color={c.accent} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

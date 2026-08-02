import { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { RatingStars } from '@/components/ui/RatingStars';
import type { Product } from '@/data/types';
import { useAppTranslation, useLocalizedProduct } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';
import { useWishlistStore } from '@/store/wishlistStore';

type ProductCardProps = {
  product: Product;
  width?: number | `${number}%`;
  fullWidth?: boolean;
};

function ProductCardComponent({ product, width, fullWidth }: ProductCardProps) {
  const { title } = useLocalizedProduct(product);
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const heartScale = useSharedValue(1);
  const cardScale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  const handlePress = useCallback(() => {
    router.push(`/product/${product.id}`);
  }, [product.id]);

  const handleToggleWishlist = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    heartScale.value = withSequence(
      withSpring(1.35, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 12, stiffness: 300 }),
    );
    toggle(product.id);
  }, [heartScale, product.id, toggle]);

  return (
    <Animated.View
      style={[
        fullWidth ? undefined : { width: width ?? '48%' },
        cardStyle,
        shadowCard,
      ]}
      className={fullWidth ? 'w-full' : 'mb-3'}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={() => {
          cardScale.value = withSpring(0.97, { damping: 18, stiffness: 320 });
        }}
        onPressOut={() => {
          cardScale.value = withSpring(1, { damping: 16, stiffness: 280 });
        }}
        className="overflow-hidden rounded-2xl border border-border bg-surface active:opacity-95"
      >
        <View className="relative aspect-square w-full bg-surface-alt">
          <AppImage
            source={{ uri: product.images[0] }}
            className="h-full w-full"
            contentFit="cover"
          />
          <Pressable
            onPress={handleToggleWishlist}
            className="absolute right-2 top-2 rounded-full bg-white/95 p-2"
            hitSlop={6}
          >
            <Animated.View style={heartStyle}>
              <Heart
                size={18}
                color={isWishlisted ? c.accent : c.muted}
                fill={isWishlisted ? c.accent : 'transparent'}
              />
            </Animated.View>
          </Pressable>
          {discount > 0 ? (
            <View className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-1">
              <Text className="text-xs font-bold text-white">-{discount}%</Text>
            </View>
          ) : null}
          {!product.inStock ? (
            <View className="absolute inset-x-0 bottom-0 bg-black/55 py-1.5">
              <Text className="text-center text-xs font-semibold text-white">
                {t('common.outOfStock')}
              </Text>
            </View>
          ) : null}
        </View>
        <View className="px-3 pb-3.5 pt-2.5">
          <Text className="text-sm font-medium leading-5 text-ink" numberOfLines={2}>
            {title}
          </Text>
          <View className="mt-1.5">
            <RatingStars rating={product.rating} size={12} />
          </View>
          <View className="mt-2 flex-row items-center gap-2">
            <Text className="text-base font-bold text-ink">
              ${product.price.toFixed(2)}
            </Text>
            {product.originalPrice ? (
              <Text className="text-sm text-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export const ProductCard = memo(ProductCardComponent);

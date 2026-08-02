import { useMemo, useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart } from 'lucide-react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { HorizontalProductList } from '@/components/product/HorizontalProductList';
import {
  Badge,
  Button,
  RatingStars,
  RefreshableScrollView,
  SectionHeader,
  showToast,
  TagChip,
} from '@/components/ui';
import { getCategoryById } from '@/data/categories';
import { getProductById, getProductsByCategory } from '@/data/products';
import {
  useAppTranslation,
  useLocalizedCategory,
  useLocalizedProduct,
} from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigationOptions } from '@/lib/navigation';
import { shadowElevated } from '@/lib/theme';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const EMPTY_PRODUCT = {
  id: '',
  title: '',
  titleAr: '',
  description: '',
  descriptionAr: '',
  price: 0,
  images: [],
  categoryId: '',
  tags: [],
  features: [],
  featuresAr: [],
  rating: 0,
  reviewCount: 0,
  inStock: false,
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const { titledScreenOptions } = useNavigationOptions();
  const product = getProductById(id ?? '');
  const { title, description, features } = useLocalizedProduct(product ?? EMPTY_PRODUCT);
  const category = product ? getCategoryById(product.categoryId) : undefined;
  const { name: categoryName } = useLocalizedCategory(
    category ?? { id: '', name: '', nameAr: '', slug: '', image: '' },
  );
  const addItem = useCartStore((s) => s.addItem);
  const cartQuantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product?.id)?.quantity ?? 0,
  );
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product?.id ?? ''));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const [imageIndex, setImageIndex] = useState(0);
  const inCart = cartQuantity > 0;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.categoryId)
      .filter((p) => p.id !== product.id)
      .slice(0, 8);
  }, [product]);

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted">{t('common.productNotFound')}</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addItem({ productId: product.id, quantity: 1 });
    showToast(t('common.addedToCartToast'));
  };

  const handleToggleWishlist = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const willAdd = !isWishlisted;
    toggleWishlist(product.id);
    showToast(
      willAdd ? t('common.addedToFavoritesToast') : t('common.removedFromFavoritesToast'),
    );
  };

  const favoriteButtonTitle = isWishlisted
    ? t('common.removeFromFavorites')
    : t('common.addToFavorites');

  const cartButtonTitle = inCart
    ? cartQuantity > 1
      ? t('common.inCartCount', { count: cartQuantity })
      : t('common.addedToCart')
    : t('common.addToCart');

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Stack.Screen
        options={{
          ...titledScreenOptions(title),
          headerRight: () => (
            <Pressable
              onPress={handleToggleWishlist}
              hitSlop={8}
              className="active:opacity-70"
            >
              <Heart
                size={22}
                color={isWishlisted ? c.accent : c.muted}
                fill={isWishlisted ? c.accent : 'transparent'}
              />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 bg-background">
        <RefreshableScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <View className="relative bg-surface-alt">
            <AppImage
              source={{ uri: product.images[imageIndex] }}
              className="aspect-square w-full"
              contentFit="cover"
            />
            {product.images.length > 1 ? (
              <View
                className="absolute bottom-4 w-full flex-row justify-center"
                style={{ gap: 7 }}
              >
                {product.images.map((img, i) => (
                  <View
                    key={img}
                    className={`h-1.5 rounded-full ${
                      i === imageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/55'
                    }`}
                  />
                ))}
              </View>
            ) : null}
          </View>

          {product.images.length > 1 ? (
            <ScrollView
              horizontal
              className="border-b border-border px-4 py-3"
              showsHorizontalScrollIndicator={false}
            >
              {product.images.map((img, i) => (
                <Pressable key={img} onPress={() => setImageIndex(i)} className="mr-2.5">
                  <AppImage
                    source={{ uri: img }}
                    className={`h-16 w-16 rounded-xl bg-surface-alt ${
                      i === imageIndex ? 'border-2 border-accent' : 'border border-border opacity-75'
                    }`}
                    contentFit="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          ) : null}

          <View className="px-4 py-5">
            <View className="flex-row flex-wrap items-center" style={{ gap: 8 }}>
              <Badge
                label={product.inStock ? t('common.inStock') : t('common.outOfStock')}
                variant={product.inStock ? 'success' : 'accent'}
              />
              {discount > 0 ? <Badge label={`-${discount}%`} variant="accent" /> : null}
            </View>

            <Text className="mt-3 text-2xl font-bold leading-8 text-ink">{title}</Text>

            <View className="mt-2.5">
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size={16}
              />
            </View>

            <View className="mt-4 flex-row items-baseline gap-2.5">
              <Text className="text-2xl font-bold text-ink">
                ${product.price.toFixed(2)}
              </Text>
              {product.originalPrice ? (
                <Text className="text-lg text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </Text>
              ) : null}
            </View>

            <Pressable
              onPress={() => router.push(`/category/${product.categoryId}`)}
              className="mt-4 self-start rounded-full border border-border bg-surface px-3.5 py-1.5 active:opacity-70"
            >
              <Text className="text-sm text-ink">
                {t('common.category')}: {categoryName}
              </Text>
            </Pressable>

            <View className="mt-6 border-t border-border pt-5">
              <Text className="text-base leading-6 text-muted">{description}</Text>
            </View>

            <View className="mt-6 border-t border-border pt-5">
              <Text className="text-lg font-bold text-ink">{t('common.features')}</Text>
              <View className="mt-3 rounded-2xl border border-border bg-surface p-4">
                {features.map((f, i) => (
                  <View
                    key={f}
                    className={`flex-row items-start ${i > 0 ? 'mt-3 border-t border-border pt-3' : ''}`}
                  >
                    <View className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <Text className="flex-1 text-muted leading-5">{f}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mt-6 border-t border-border pt-5">
              <Text className="text-lg font-bold text-ink">{t('common.tags')}</Text>
              <View className="mt-3 flex-row flex-wrap">
                {product.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </View>
            </View>
          </View>

          {relatedProducts.length > 0 ? (
            <View className="border-t border-border pb-4 pt-6">
              <SectionHeader
                title={t('common.relatedProducts')}
                subtitle={t('common.relatedSubtitle')}
              />
              <HorizontalProductList products={relatedProducts} />
            </View>
          ) : null}
        </RefreshableScrollView>

        <SafeAreaView
          edges={['bottom']}
          className="border-t border-border bg-surface px-4 pt-3"
          style={shadowElevated}
        >
          <View className="pb-1">
            <View className="mb-3 flex-row items-end justify-between">
              <View>
                <Text className="text-xs text-muted">{t('common.total')}</Text>
                <Text className="text-xl font-bold text-ink">
                  ${product.price.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2.5">
              <View className="flex-1">
                <Button
                  title={favoriteButtonTitle}
                  variant={isWishlisted ? 'secondary' : 'ghost'}
                  onPress={handleToggleWishlist}
                  className="py-3.5"
                />
              </View>
              <View className="flex-[1.2]">
                <Button
                  title={cartButtonTitle}
                  variant={inCart ? 'success' : 'primary'}
                  onPress={handleAddToCart}
                  disabled={!product.inStock}
                  className="py-3.5"
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

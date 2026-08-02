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
    toggleWishlist(product.id);
  };

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
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View className="relative">
            <AppImage
              source={{ uri: product.images[imageIndex] }}
              className="aspect-square w-full"
              contentFit="cover"
            />
            {product.images.length > 1 ? (
              <View
                className="absolute bottom-3 w-full flex-row justify-center"
                style={{ gap: 6 }}
              >
                {product.images.map((img, i) => (
                  <View
                    key={img}
                    className={`h-2 rounded-full ${i === imageIndex ? 'w-5 bg-accent' : 'w-2 bg-white/70'}`}
                  />
                ))}
              </View>
            ) : null}
          </View>
          {product.images.length > 1 ? (
            <ScrollView
              horizontal
              className="px-4 py-3"
              showsHorizontalScrollIndicator={false}
            >
              {product.images.map((img, i) => (
                <Pressable key={img} onPress={() => setImageIndex(i)} className="mr-2">
                  <AppImage
                    source={{ uri: img }}
                    className={`h-16 w-16 rounded-xl ${i === imageIndex ? 'border-2 border-accent' : 'opacity-70'}`}
                    contentFit="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          ) : null}

          <View className="px-4 py-4">
            <View className="flex-row flex-wrap items-center" style={{ gap: 8 }}>
              <Badge
                label={product.inStock ? t('common.inStock') : t('common.outOfStock')}
                variant={product.inStock ? 'success' : 'accent'}
              />
              {discount > 0 ? <Badge label={`-${discount}%`} variant="accent" /> : null}
            </View>

            <Text className="mt-2 text-2xl font-bold text-ink">{title}</Text>

            <View className="mt-2">
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size={16}
              />
            </View>

            <View className="mt-3 flex-row items-center gap-2">
              <Text className="text-2xl font-bold text-accent">
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
              className="mt-3 self-start rounded-full bg-surface-alt px-3 py-1.5 active:opacity-70"
            >
              <Text className="text-sm text-ink">
                {t('common.category')}: {categoryName}
              </Text>
            </Pressable>

            <Text className="mt-4 text-base leading-6 text-muted">{description}</Text>

            <Text className="mt-6 text-lg font-bold text-ink">
              {t('common.features')}
            </Text>
            <View className="mt-2 rounded-2xl bg-surface p-4">
              {features.map((f, i) => (
                <View key={f} className={`flex-row items-start ${i > 0 ? 'mt-2' : ''}`}>
                  <View className="mr-2 mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <Text className="flex-1 text-muted">{f}</Text>
                </View>
              ))}
            </View>

            <Text className="mt-6 text-lg font-bold text-ink">{t('common.tags')}</Text>
            <View className="mt-2 flex-row flex-wrap">
              {product.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </View>
          </View>

          {relatedProducts.length > 0 ? (
            <View className="pb-4">
              <SectionHeader title={t('common.relatedProducts')} />
              <HorizontalProductList products={relatedProducts} />
            </View>
          ) : null}
        </RefreshableScrollView>

        <SafeAreaView
          edges={['bottom']}
          className="border-t border-border bg-surface px-4 py-3"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-accent">
              ${product.price.toFixed(2)}
            </Text>
            <View className="w-52">
              <Button
                title={cartButtonTitle}
                variant={inCart ? 'success' : 'primary'}
                onPress={handleAddToCart}
                disabled={!product.inStock}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

import { useMemo } from 'react';
import { View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Stack, router } from 'expo-router';

import { ProductGrid } from '@/components/product/ProductGrid';
import { RequireAuth } from '@/components/auth/RouteGuards';
import { EmptyState, RefreshableScrollView } from '@/components/ui';
import { products } from '@/data/products';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigationOptions } from '@/lib/navigation';
import { useWishlistStore } from '@/store/wishlistStore';

export default function FavoritesScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const { titledScreenOptions } = useNavigationOptions();
  const productIds = useWishlistStore((s) => s.productIds);

  const favoriteProducts = useMemo(
    () => products.filter((p) => productIds.includes(p.id)),
    [productIds],
  );

  return (
    <RequireAuth>
      <>
        <Stack.Screen options={titledScreenOptions(t('common.favorites'))} />
        <View className="flex-1 bg-background">
          {favoriteProducts.length === 0 ? (
            <RefreshableScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <EmptyState
                title={t('common.emptyFavorites')}
                description={t('common.emptyFavoritesDescription')}
                icon={<Heart size={34} color={c.muted} />}
                actionLabel={t('common.browseShop')}
                onAction={() => router.push('/(drawer)/(tabs)/categories')}
              />
            </RefreshableScrollView>
          ) : (
            <ProductGrid products={favoriteProducts} />
          )}
        </View>
      </>
    </RequireAuth>
  );
}

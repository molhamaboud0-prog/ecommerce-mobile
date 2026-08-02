import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Search } from 'lucide-react-native';
import { Stack, router } from 'expo-router';

import { ProductGrid } from '@/components/product/ProductGrid';
import { RequireAuth } from '@/components/auth/RouteGuards';
import { EmptyState, Input } from '@/components/ui';
import { products } from '@/data/products';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigationOptions } from '@/lib/navigation';

export default function SearchScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const { titledScreenOptions } = useNavigationOptions();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleAr.includes(query.trim()) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionAr.includes(query.trim()),
    );
  }, [query]);

  return (
    <RequireAuth>
      <>
        <Stack.Screen options={titledScreenOptions(t('common.search'))} />
        <View className="flex-1 bg-background">
          <View className="border-b border-border bg-surface px-4 pb-1 pt-2">
            <Input
              value={query}
              onChangeText={setQuery}
              placeholder={t('common.searchPlaceholder')}
              autoFocus
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
          {filtered.length === 0 ? (
            <EmptyState
              title={t('common.searchEmpty')}
              description={t('common.searchEmptyDescription')}
              icon={<Search size={34} color={c.muted} />}
              actionLabel={t('common.browseShop')}
              onAction={() => router.push('/(drawer)/(tabs)/categories')}
            />
          ) : (
            <ProductGrid products={filtered} />
          )}
        </View>
      </>
    </RequireAuth>
  );
}

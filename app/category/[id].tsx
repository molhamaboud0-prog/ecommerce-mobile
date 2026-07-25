import { View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { ProductGrid } from '@/components/product/ProductGrid';
import { getCategoryById } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { useAppTranslation, useLocalizedCategory } from '@/hooks/useLocalized';
import { useNavigationOptions } from '@/lib/navigation';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useAppTranslation();
  const { titledScreenOptions } = useNavigationOptions();
  const category = getCategoryById(id ?? '');
  const { name } = useLocalizedCategory(
    category ?? { id: '', name: '', nameAr: '', slug: '', image: '' },
  );
  const products = getProductsByCategory(id ?? '');

  return (
    <>
      <Stack.Screen options={titledScreenOptions(name || t('common.category'))} />
      <View className="flex-1 bg-background">
        <ProductGrid products={products} />
      </View>
    </>
  );
}

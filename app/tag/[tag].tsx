import { View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

import { ProductGrid } from '@/components/product/ProductGrid';
import { getProductsByTag } from '@/data/products';
import { useNavigationOptions } from '@/lib/navigation';

export default function TagScreen() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  const { titledScreenOptions } = useNavigationOptions();
  const products = getProductsByTag(tag ?? '');

  return (
    <>
      <Stack.Screen options={titledScreenOptions(`#${tag ?? ''}`)} />
      <View className="flex-1 bg-background">
        <ProductGrid products={products} />
      </View>
    </>
  );
}

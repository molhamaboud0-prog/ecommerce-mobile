import { ScrollView } from 'react-native';

import type { Product } from '@/data/types';

import { ProductCard } from './ProductCard';

type HorizontalProductListProps = {
  products: Product[];
};

export function HorizontalProductList({ products }: HorizontalProductListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 12 }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} width={160} />
      ))}
    </ScrollView>
  );
}

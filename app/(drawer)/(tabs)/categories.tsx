import { View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { HorizontalProductList } from '@/components/product/HorizontalProductList';
import { RefreshableScrollView } from '@/components/ui';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { useAppTranslation, useLocalizedCategory } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

function CategorySection({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId);
  const { name } = useLocalizedCategory(category!);
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const products = getProductsByCategory(categoryId).slice(0, 6);

  if (!category) return null;

  return (
    <View className="mb-6">
      <Pressable
        onPress={() => router.push(`/category/${category.id}`)}
        className="mx-4 mb-3 flex-row items-center rounded-2xl bg-surface p-3 active:opacity-80"
        style={shadowCard}
      >
        <AppImage
          source={{ uri: category.image }}
          className="h-14 w-14 rounded-xl"
          contentFit="cover"
        />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-lg text-ink">{name}</Text>
          <Text className="text-sm text-accent">{t('common.viewAll')}</Text>
        </View>
        <ChevronRight size={20} color={c.muted} />
      </Pressable>
      <HorizontalProductList products={products} />
    </View>
  );
}

export default function CategoriesScreen() {
  const { t } = useAppTranslation();

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.categories')} />
      <RefreshableScrollView showsVerticalScrollIndicator={false}>
        {categories.map((cat) => (
          <CategorySection key={cat.id} categoryId={cat.id} />
        ))}
        <View className="h-6" />
      </RefreshableScrollView>
    </View>
  );
}

import { ScrollView, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { HorizontalProductList } from '@/components/product/HorizontalProductList';
import { Button, RefreshableScrollView, SectionHeader } from '@/components/ui';
import { categories } from '@/data/categories';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';
import { useAppTranslation, useLocalizedCategory } from '@/hooks/useLocalized';
import { shadowCard } from '@/lib/theme';

function CategoryChip({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId);
  const { name } = useLocalizedCategory(category!);

  if (!category) return null;

  return (
    <Pressable
      onPress={() => router.push(`/category/${category.id}`)}
      className="mr-4 items-center active:opacity-80"
    >
      <View className="rounded-full border-2 border-accent-soft p-1" style={shadowCard}>
        <AppImage
          source={{ uri: category.image }}
          className="h-20 w-20 rounded-full"
          contentFit="cover"
        />
      </View>
      <Text className="mt-2 text-xs font-medium text-ink">{name}</Text>
    </Pressable>
  );
}

function HeroBanner() {
  const { t } = useAppTranslation();

  return (
    <View className="mx-4 mb-6 overflow-hidden rounded-3xl" style={shadowCard}>
      <LinearGradient
        colors={['#1A1A2E', '#3D2C5A', '#E94560']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.2, y: 1.2 }}
        style={{ padding: 24 }}
      >
        <Text className="text-2xl font-bold text-white">{t('common.heroTitle')}</Text>
        <Text className="mt-2 text-sm text-white/80">{t('common.heroSubtitle')}</Text>
        <View className="mt-5 self-start">
          <Button
            title={t('common.shopNow')}
            variant="light"
            className="px-8"
            onPress={() => router.push('/(drawer)/(tabs)/categories')}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  const { t } = useAppTranslation();
  const trending = getFeaturedProducts(10);
  const newArrivals = getNewArrivals(10);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.home')} />
      <RefreshableScrollView showsVerticalScrollIndicator={false}>
        <HeroBanner />

        <SectionHeader title={t('common.categories')} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 20,
            paddingTop: 4,
          }}
        >
          {categories.map((cat) => (
            <CategoryChip key={cat.id} categoryId={cat.id} />
          ))}
        </ScrollView>

        <SectionHeader
          title={t('common.trending')}
          onViewAll={() => router.push('/tag/trending')}
          viewAllLabel={t('common.viewAll')}
        />
        <HorizontalProductList products={trending} />

        <View className="h-6" />

        <SectionHeader
          title={t('common.newArrivals')}
          onViewAll={() => router.push('/tag/new')}
          viewAllLabel={t('common.viewAll')}
        />
        <HorizontalProductList products={newArrivals} />

        <View className="h-8" />
      </RefreshableScrollView>
    </View>
  );
}

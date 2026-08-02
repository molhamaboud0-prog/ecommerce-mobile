import { ScrollView, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { HorizontalProductList } from '@/components/product/HorizontalProductList';
import { Button, RefreshableScrollView, SectionHeader } from '@/components/ui';
import { categories } from '@/data/categories';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';
import { useAppTranslation, useLocalizedCategory } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=700&q=80';

function SearchBar() {
  const { t } = useAppTranslation();
  const c = useThemeColors();

  return (
    <Pressable
      onPress={() => router.push('/search')}
      className="mx-4 mb-5 flex-row items-center rounded-2xl border border-border bg-surface px-4 py-3.5 active:opacity-80"
      style={shadowCard}
      accessibilityRole="search"
      accessibilityLabel={t('common.searchPlaceholder')}
    >
      <Search size={20} color={c.muted} />
      <Text className="ml-3 flex-1 text-base text-muted">{t('common.searchPlaceholder')}</Text>
    </Pressable>
  );
}

function CategoryTile({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId);
  const { name } = useLocalizedCategory(category!);

  if (!category) return null;

  return (
    <Pressable
      onPress={() => router.push(`/category/${category.id}`)}
      className="mr-3 w-36 overflow-hidden rounded-2xl border border-border bg-surface active:opacity-90"
      style={shadowCard}
    >
      <View className="relative h-24 w-full bg-surface-alt">
        <AppImage
          source={{ uri: category.image }}
          className="h-full w-full"
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(11,31,58,0.65)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 52 }}
        />
        <Text
          className="absolute bottom-2 left-2 right-2 text-sm font-semibold text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
}

function HeroBanner() {
  const { t } = useAppTranslation();

  return (
    <View className="mx-4 mb-7 overflow-hidden rounded-3xl" style={shadowCard}>
      <View className="relative min-h-[210px]">
        <AppImage
          source={{ uri: HERO_IMAGE }}
          className="absolute inset-0 h-full w-full"
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(11,31,58,0.35)', 'rgba(11,31,58,0.78)', 'rgba(22,58,95,0.92)']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <View className="justify-end p-6 pt-16">
          <Text className="text-2xl font-bold leading-8 text-white">
            {t('common.heroTitle')}
          </Text>
          <Text className="mt-2 text-sm leading-5 text-white/85">
            {t('common.heroSubtitle')}
          </Text>
          <View className="mt-5 self-start">
            <Button
              title={t('common.shopNow')}
              variant="light"
              className="px-8"
              onPress={() => router.push('/(drawer)/(tabs)/categories')}
            />
          </View>
        </View>
      </View>
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
        <View className="h-4" />
        <SearchBar />
        <HeroBanner />

        <SectionHeader
          title={t('common.categories')}
          subtitle={t('common.categoriesSubtitle')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 28,
            paddingTop: 2,
          }}
        >
          {categories.map((cat) => (
            <CategoryTile key={cat.id} categoryId={cat.id} />
          ))}
        </ScrollView>

        <SectionHeader
          title={t('common.trending')}
          subtitle={t('common.trendingSubtitle')}
          onViewAll={() => router.push('/tag/trending')}
          viewAllLabel={t('common.viewAll')}
        />
        <HorizontalProductList products={trending} />

        <View className="h-8" />

        <SectionHeader
          title={t('common.newArrivals')}
          subtitle={t('common.newArrivalsSubtitle')}
          onViewAll={() => router.push('/tag/new')}
          viewAllLabel={t('common.viewAll')}
        />
        <HorizontalProductList products={newArrivals} />

        <View className="h-10" />
      </RefreshableScrollView>
    </View>
  );
}

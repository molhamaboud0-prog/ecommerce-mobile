import { Tabs } from 'expo-router';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { fontFamilies } from '@/lib/theme';
import { useCartStore } from '@/store/cartStore';

export default function TabLayout() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.accent,
        tabBarInactiveTintColor: c.muted,
        tabBarLabelStyle: { fontFamily: fontFamilies.semibold },
        tabBarStyle: {
          backgroundColor: c.surface,
          borderTopColor: c.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('common.home'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: t('common.categories'),
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('common.cart'),
          tabBarIcon: ({ color, size }) => (
            <View>
              <ShoppingCart color={color} size={size} />
              {itemCount > 0 ? (
                <View className="absolute -right-2 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1">
                  <Text className="text-[10px] font-bold text-white">{itemCount}</Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('common.profile'),
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

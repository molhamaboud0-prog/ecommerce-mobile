import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Info,
  LayoutGrid,
  LogOut,
  Mail,
  Package,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Alert, I18nManager, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui';
import { goToDrawerHome } from '@/components/layout/DrawerBackToHomeButton';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useAuthStore } from '@/store/authStore';

type DrawerNavItem = {
  key: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  destructive?: boolean;
  onPress: () => void;
};

function DrawerSectionLabel({ label }: { label: string }) {
  return (
    <Text className="mb-2 mt-4 px-5 text-xs font-semibold uppercase tracking-wide text-muted">
      {label}
    </Text>
  );
}

function DrawerNavRow({ item, isRTL }: { item: DrawerNavItem; isRTL: boolean }) {
  const c = useThemeColors();
  const Icon = item.icon;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const handlePress = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    item.onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`mx-3 mb-1 flex-row items-center rounded-2xl px-3 py-3 active:opacity-80 ${
        item.active ? 'bg-accent-soft' : ''
      } ${isRTL ? 'flex-row-reverse' : ''}`}
      style={
        item.active
          ? {
              borderStartWidth: 3,
              borderStartColor: c.accent,
            }
          : undefined
      }
      accessibilityRole="button"
      accessibilityState={{ selected: item.active }}
    >
      <View
        className={`h-10 w-10 items-center justify-center rounded-xl ${
          item.active ? 'bg-accent/15' : 'bg-surface-alt'
        }`}
      >
        <Icon
          size={20}
          color={item.destructive ? c.accent : item.active ? c.accent : c.ink}
        />
      </View>
      <Text
        className={`flex-1 text-base ${isRTL ? 'mr-3 text-right' : 'ml-3'} ${
          item.destructive
            ? 'font-medium text-accent'
            : item.active
              ? 'font-semibold text-accent'
              : 'text-ink'
        }`}
      >
        {item.label}
      </Text>
      {!item.destructive ? (
        <Chevron size={18} color={c.muted} style={{ opacity: item.active ? 1 : 0.5 }} />
      ) : null}
    </Pressable>
  );
}

function DrawerProfileHeader({
  onPress,
  isRTL,
}: {
  onPress: () => void;
  isRTL: boolean;
}) {
  const user = useAuthStore((s) => s.user);
  const { t } = useAppTranslation();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <Pressable
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className={`active:opacity-90 ${isRTL ? 'flex-row-reverse' : ''}`}
      accessibilityRole="button"
      accessibilityLabel={t('common.viewProfile')}
    >
      <LinearGradient
        colors={['#1A1A2E', '#3D2C5A', '#E94560']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 }}
      >
        <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <View className="rounded-full border-2 border-white/25 p-0.5">
            <Avatar name={user?.name} size={56} className="bg-white/20" />
          </View>
          <View className={`flex-1 ${isRTL ? 'mr-3 items-end' : 'ml-3'}`}>
            <Text className="text-lg font-bold text-white" numberOfLines={1}>
              {user?.name ?? t('common.profile')}
            </Text>
            <Text className="mt-0.5 text-sm text-white/75" numberOfLines={1}>
              {user?.email}
            </Text>
            <View
              className={`mt-2 flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Text className="text-xs font-medium text-white/90">
                {t('common.viewProfile')}
              </Text>
              <Chevron size={14} color="rgba(255,255,255,0.9)" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function getActiveTabName(props: DrawerContentComponentProps): string | undefined {
  const drawerRoute = props.state.routes[props.state.index];
  if (drawerRoute?.name !== '(tabs)') return undefined;
  const tabState = drawerRoute.state;
  if (!tabState || tabState.index === undefined) return 'index';
  return tabState.routes[tabState.index]?.name;
}

export function DrawerContent(props: DrawerContentComponentProps) {
  const { t, isRTL } = useAppTranslation();
  const logout = useAuthStore((s) => s.logout);

  const activeDrawerRoute = props.state.routes[props.state.index]?.name;
  const activeTab = getActiveTabName(props);

  const closeAnd = (action: () => void) => {
    props.navigation.closeDrawer();
    action();
  };

  const handleLogout = () => {
    Alert.alert(t('common.logout'), t('common.confirmLogout'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.yes'),
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const shopItems: DrawerNavItem[] = [
    {
      key: 'home',
      icon: Home,
      label: t('common.home'),
      active: activeDrawerRoute === '(tabs)' && activeTab === 'index',
      onPress: () => closeAnd(goToDrawerHome),
    },
    {
      key: 'categories',
      icon: LayoutGrid,
      label: t('common.categories'),
      active: activeDrawerRoute === '(tabs)' && activeTab === 'categories',
      onPress: () => closeAnd(() => router.replace('/(drawer)/(tabs)/categories')),
    },
    {
      key: 'orders',
      icon: Package,
      label: t('common.orders'),
      onPress: () => closeAnd(() => router.push('/orders')),
    },
    {
      key: 'favorites',
      icon: Heart,
      label: t('common.favorites'),
      onPress: () => closeAnd(() => router.push('/favorites')),
    },
  ];

  const supportItems: DrawerNavItem[] = [
    {
      key: 'about',
      icon: Info,
      label: t('common.about'),
      active: activeDrawerRoute === 'about',
      onPress: () => closeAnd(() => router.replace('/(drawer)/about')),
    },
    {
      key: 'contact',
      icon: Mail,
      label: t('common.contact'),
      active: activeDrawerRoute === 'contact',
      onPress: () => closeAnd(() => router.replace('/(drawer)/contact')),
    },
  ];

  const drawerRadiusStyle = I18nManager.isRTL
    ? { borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }
    : { borderTopRightRadius: 24, borderBottomRightRadius: 24 };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="flex-1 bg-surface"
      style={drawerRadiusStyle}
    >
      <DrawerProfileHeader
        isRTL={isRTL}
        onPress={() => closeAnd(() => router.replace('/(drawer)/(tabs)/profile'))}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <DrawerSectionLabel label={t('common.drawerShopSection')} />
        {shopItems.map((item) => (
          <DrawerNavRow key={item.key} item={item} isRTL={isRTL} />
        ))}

        <DrawerSectionLabel label={t('common.drawerSupportSection')} />
        {supportItems.map((item) => (
          <DrawerNavRow key={item.key} item={item} isRTL={isRTL} />
        ))}
      </ScrollView>

      <View className="border-t border-border px-3 pb-2 pt-2">
        <DrawerNavRow
          isRTL={isRTL}
          item={{
            key: 'logout',
            icon: LogOut,
            label: t('common.logout'),
            destructive: true,
            onPress: handleLogout,
          }}
        />
        <Text className="pb-1 text-center text-xs text-muted">
          {t('common.drawerFooter')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

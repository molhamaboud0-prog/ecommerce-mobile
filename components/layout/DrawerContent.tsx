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
  ShoppingBasket,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Alert, I18nManager, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { AppImage } from '@/components/ui/AppImage';
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
    <Text className="mb-2 mt-5 px-5 text-xs font-semibold uppercase tracking-wide text-muted">
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

/** Full-bleed brand banner — app icon spans entire drawer width */
function DrawerBrandHeader({
  onPress,
  isRTL,
}: {
  onPress: () => void;
  isRTL: boolean;
}) {
  const user = useAuthStore((s) => s.user);
  const { t } = useAppTranslation();
  const insets = useSafeAreaInsets();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <Pressable
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className="w-full overflow-hidden active:opacity-95"
      accessibilityRole="button"
      accessibilityLabel={t('common.viewProfile')}
    >
      {/* Icon takes full drawer width */}
      <View className="relative w-full" style={{ height: 168 + Math.max(insets.top, 8) }}>
        <AppImage
          source={require('../../assets/icon.png')}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%' }}
          contentFit="cover"
        />
        <LinearGradient
          colors={[
            'rgba(11,31,58,0.25)',
            'rgba(11,31,58,0.55)',
            'rgba(11,31,58,0.92)',
          ]}
          locations={[0, 0.45, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
          }}
        />

        <View
          className="absolute bottom-0 left-0 right-0 w-full"
          style={{ paddingTop: Math.max(insets.top, 8) }}
        >
          <View className="mb-3 w-full items-center px-4">
            <View className="mb-2 h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/20">
              <ShoppingBasket size={22} color="#FFFFFF" strokeWidth={1.8} />
            </View>
            <Text className="text-center text-base font-bold text-white">
              {t('common.drawerFooter')}
            </Text>
          </View>

          <View className="h-px w-full bg-white/20" />

          <View
            className={`w-full flex-row items-center px-4 py-3.5 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <View className="rounded-full border-2 border-white/35 p-0.5">
              <Avatar name={user?.name} size={44} className="bg-white/20" />
            </View>
            <View className={`flex-1 ${isRTL ? 'mr-3 items-end' : 'ml-3'}`}>
              <Text className="text-base font-bold text-white" numberOfLines={1}>
                {user?.name ?? t('common.profile')}
              </Text>
              <Text className="mt-0.5 text-xs text-white/75" numberOfLines={1}>
                {user?.email}
              </Text>
            </View>
            <View
              className={`flex-row items-center rounded-full border border-white/25 bg-white/15 px-2.5 py-1 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >
              <Text className="text-[11px] font-medium text-white">
                {t('common.viewProfile')}
              </Text>
              <Chevron size={12} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </View>
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
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 overflow-hidden bg-surface" style={drawerRadiusStyle}>
      {/* Edge-to-edge brand header — full drawer width */}
      <DrawerBrandHeader
        isRTL={isRTL}
        onPress={() => closeAnd(() => router.replace('/(drawer)/(tabs)/profile'))}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
        className="flex-1"
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

      <View
        className="border-t border-border px-3 pt-2"
        style={{ paddingBottom: Math.max(insets.bottom, 10) }}
      >
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
    </View>
  );
}

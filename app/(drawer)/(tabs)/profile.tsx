import { useMemo, useState } from 'react';
import { Alert, Pressable, Switch, View } from 'react-native';
import {
  ChevronRight,
  Globe,
  Heart,
  LogOut,
  MapPin,
  Moon,
  Package,
  Pencil,
  Phone,
} from 'lucide-react-native';
import { router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { EditProfileModal } from '@/components/profile';
import { Avatar, RefreshableScrollView } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';
import { mergeOrders, useOrdersStore } from '@/store/ordersStore';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useSettingsStore, type Language } from '@/store/settingsStore';
import { useWishlistStore } from '@/store/wishlistStore';

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-xl font-bold text-ink">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}

function ProfileRow({
  icon,
  label,
  onPress,
  right,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
  destructive?: boolean;
}) {
  const c = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between border-b border-border px-4 py-4 active:bg-surface-alt"
    >
      <View className="flex-row items-center">
        {icon}
        <Text className={`ml-3 text-base ${destructive ? 'text-accent' : 'text-ink'}`}>
          {label}
        </Text>
      </View>
      {right ?? (onPress ? <ChevronRight size={18} color={c.muted} /> : null)}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const theme = useSettingsStore((s) => s.theme);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const [editVisible, setEditVisible] = useState(false);

  const localOrders = useOrdersStore((s) => s.localOrders);
  const ordersCount = useMemo(() => mergeOrders(localOrders).length, [localOrders]);
  const favoritesCount = useWishlistStore((s) => s.productIds.length);
  const cartCount = useCartStore((s) => s.items.length);

  const toggleLanguage = () => {
    const next: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(next);
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

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.profile')} />
      <RefreshableScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View
          className="mx-4 mb-4 items-center rounded-3xl bg-surface p-6"
          style={shadowCard}
        >
          <View className="relative">
            <Avatar name={user?.name} size={72} />
            <Pressable
              onPress={() => setEditVisible(true)}
              className="absolute -bottom-1 -right-1 h-9 w-9 items-center justify-center rounded-full bg-accent active:opacity-80"
              accessibilityRole="button"
              accessibilityLabel={t('common.editProfile')}
            >
              <Pencil size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text className="mt-3 text-xl font-bold text-ink">{user?.name}</Text>
          <Text className="mt-0.5 text-muted">{user?.email}</Text>
          {user?.phone ? (
            <View className="mt-2 flex-row items-center">
              <Phone size={14} color={c.muted} />
              <Text className="ml-1.5 text-sm text-muted">{user.phone}</Text>
            </View>
          ) : null}
          {user?.location ? (
            <View className="mt-1 flex-row items-center">
              <MapPin size={14} color={c.muted} />
              <Text className="ml-1.5 text-sm text-muted">{user.location}</Text>
            </View>
          ) : null}

          <View className="mt-5 w-full flex-row rounded-2xl bg-surface-alt py-3">
            <StatBox value={ordersCount} label={t('common.orders')} />
            <View className="w-px bg-border" />
            <StatBox value={favoritesCount} label={t('common.favorites')} />
            <View className="w-px bg-border" />
            <StatBox value={cartCount} label={t('common.cart')} />
          </View>
        </View>

        <View className="mx-4 overflow-hidden rounded-3xl bg-surface" style={shadowCard}>
          <ProfileRow
            icon={<Pencil size={20} color={c.ink} />}
            label={t('common.editProfile')}
            onPress={() => setEditVisible(true)}
          />
          <ProfileRow
            icon={<Package size={20} color={c.ink} />}
            label={t('common.orders')}
            onPress={() => router.push('/orders')}
          />
          <ProfileRow
            icon={<Heart size={20} color={c.accent} />}
            label={t('common.favorites')}
            onPress={() => router.push('/favorites')}
          />
          <ProfileRow
            icon={<Globe size={20} color={c.ink} />}
            label={`${t('common.language')}: ${language === 'ar' ? 'العربية' : 'English'}`}
            onPress={toggleLanguage}
          />
          <ProfileRow
            icon={<Moon size={20} color={c.ink} />}
            label={t('common.darkMode')}
            right={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: c.border, true: c.accent }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <ProfileRow
            icon={<LogOut size={20} color={c.accent} />}
            label={t('common.logout')}
            onPress={handleLogout}
            destructive
          />
        </View>
      </RefreshableScrollView>

      <EditProfileModal visible={editVisible} onClose={() => setEditVisible(false)} />
    </View>
  );
}

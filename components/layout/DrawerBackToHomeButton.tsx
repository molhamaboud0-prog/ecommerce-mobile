import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';

export function DrawerBackToHomeButton() {
  const { t, isRTL } = useAppTranslation();
  const c = useThemeColors();

  return (
    <Pressable
      onPress={() => router.replace('/(drawer)/(tabs)')}
      className="flex-row items-center px-3 py-2 active:opacity-70"
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={t('common.home')}
    >
      <ChevronLeft
        size={22}
        color={c.ink}
        style={isRTL ? { transform: [{ scaleX: -1 }] } : undefined}
      />
      <Text className="ml-1 text-base font-medium text-ink">{t('common.home')}</Text>
    </Pressable>
  );
}

export function goToDrawerHome() {
  router.replace('/(drawer)/(tabs)');
}

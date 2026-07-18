import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useThemeColors } from '@/hooks/useThemeColors';
import { fontFamilies } from '@/lib/theme';

/** Theme-aware navigation options for Stack and Drawer headers. */
export function useNavigationOptions() {
  const c = useThemeColors();

  const stackScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerStyle: { backgroundColor: c.surface },
    headerTintColor: c.ink,
    headerTitleStyle: { color: c.ink, fontFamily: fontFamilies.semibold },
    headerShadowVisible: false,
    headerBackVisible: true,
    headerBackTitle: '',
    headerBackButtonDisplayMode: 'minimal',
    contentStyle: { backgroundColor: c.background },
  };

  const drawerHeaderOptions = {
    headerShown: true as const,
    headerStyle: { backgroundColor: c.surface },
    headerTintColor: c.ink,
    headerTitleStyle: { color: c.ink, fontFamily: fontFamilies.semibold },
    headerShadowVisible: false,
  };

  const titledScreenOptions = (title: string): NativeStackNavigationOptions => ({
    ...stackScreenOptions,
    title,
  });

  return { stackScreenOptions, drawerHeaderOptions, titledScreenOptions };
}

import { Drawer } from 'expo-router/drawer';
import { I18nManager } from 'react-native';

import { DrawerContent } from '@/components/layout/DrawerContent';
import { DrawerBackToHomeButton } from '@/components/layout/DrawerBackToHomeButton';
import { RequireAuth } from '@/components/auth/RouteGuards';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useNavigationOptions } from '@/lib/navigation';

export default function DrawerLayout() {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const { drawerHeaderOptions } = useNavigationOptions();

  const drawerRadiusStyle = I18nManager.isRTL
    ? { borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }
    : { borderTopRightRadius: 24, borderBottomRightRadius: 24 };

  return (
    <RequireAuth>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          overlayColor: 'rgba(0,0,0,0.45)',
          swipeEdgeWidth: 48,
          drawerStyle: {
            width: 304,
            backgroundColor: c.surface,
            ...drawerRadiusStyle,
          },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ title: t('common.home') }} />
        <Drawer.Screen
          name="about"
          options={{
            ...drawerHeaderOptions,
            title: t('common.about'),
            headerLeft: () => <DrawerBackToHomeButton />,
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="contact"
          options={{
            ...drawerHeaderOptions,
            title: t('common.contact'),
            headerLeft: () => <DrawerBackToHomeButton />,
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </RequireAuth>
  );
}

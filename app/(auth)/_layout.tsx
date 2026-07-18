import { Stack } from 'expo-router';

import { RequireGuest } from '@/components/auth/RouteGuards';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useNavigationOptions } from '@/lib/navigation';

export default function AuthLayout() {
  const { t } = useAppTranslation();
  const { stackScreenOptions } = useNavigationOptions();

  return (
    <RequireGuest>
      <Stack screenOptions={{ ...stackScreenOptions, headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen
          name="signup"
          options={{
            ...stackScreenOptions,
            headerShown: true,
            title: t('common.signup'),
          }}
        />
      </Stack>
    </RequireGuest>
  );
}

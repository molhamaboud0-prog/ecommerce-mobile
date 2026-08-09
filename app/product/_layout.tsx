import { Stack } from 'expo-router';

import { RequireAuth } from '@/components/auth/RouteGuards';
import { useNavigationOptions } from '@/lib/navigation';

export default function ProductLayout() {
  const { stackScreenOptions } = useNavigationOptions();

  return (
    <RequireAuth>
      <Stack screenOptions={{ ...stackScreenOptions, title: '', headerTitle: '' }}>
        <Stack.Screen name="[id]" options={{ title: '', headerTitle: '' }} />
      </Stack>
    </RequireAuth>
  );
}

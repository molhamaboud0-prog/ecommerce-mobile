import { Redirect } from 'expo-router';

import { AuthLoading, useAuthHydration } from '@/hooks/useAuthHydration';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const hydrated = useAuthHydration();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!hydrated) {
    return <AuthLoading />;
  }

  if (isLoggedIn) {
    return <Redirect href="/(drawer)/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

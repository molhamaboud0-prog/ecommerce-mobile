import { Redirect } from 'expo-router';
import type { ReactNode } from 'react';

import { AuthLoading, useAuthHydration } from '@/hooks/useAuthHydration';
import { useAuthStore } from '@/store/authStore';

export function RequireAuth({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydration();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!hydrated) {
    return <AuthLoading />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydration();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!hydrated) {
    return <AuthLoading />;
  }

  if (isLoggedIn) {
    return <Redirect href="/(drawer)/(tabs)" />;
  }

  return <>{children}</>;
}

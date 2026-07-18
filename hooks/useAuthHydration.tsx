import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useAuthStore } from '@/store/authStore';

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useAuthStore.persist.hasHydrated());
    return unsub;
  }, []);

  return hydrated;
}

export function AuthLoading() {
  const c = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={c.accent} />
    </View>
  );
}

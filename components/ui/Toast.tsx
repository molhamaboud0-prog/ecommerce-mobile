import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { CheckCircle2 } from 'lucide-react-native';
import { create } from 'zustand';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

type ToastState = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  hide: () => set({ message: null }),
}));

export function showToast(message: string) {
  useToastStore.getState().show(message);
}

const TOAST_DURATION_MS = 2200;

export function ToastHost() {
  const message = useToastStore((s) => s.message);
  const hide = useToastStore((s) => s.hide);
  const insets = useSafeAreaInsets();
  const c = useThemeColors();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!message) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(hide, TOAST_DURATION_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [message, hide]);

  if (!message) return null;

  return (
    <View
      pointerEvents="none"
      className="absolute inset-x-0 items-center"
      style={{ bottom: insets.bottom + 88 }}
    >
      <Animated.View
        entering={FadeInDown.springify().damping(16)}
        exiting={FadeOutDown.duration(180)}
        className="flex-row items-center rounded-full bg-primary px-5 py-3"
        style={shadowCard}
      >
        <CheckCircle2 size={18} color={c.success} />
        <Text className="ml-2 text-sm font-semibold text-white">{message}</Text>
      </Animated.View>
    </View>
  );
}

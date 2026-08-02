import '../global.css';
import '@/lib/i18n';
import '@/components/ui/AppImage';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { colorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastHost } from '@/components/ui/Toast';
import { applyGlobalDubaiFont } from '@/lib/fonts';
import { useNavigationOptions } from '@/lib/navigation';
import { useSettingsStore } from '@/store/settingsStore';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const theme = useSettingsStore((s) => s.theme);
  const { stackScreenOptions } = useNavigationOptions();

  const [fontsLoaded] = useFonts({
    'Dubai-Light': require('../assets/fonts/Dubai-Light.ttf'),
    'Dubai-Regular': require('../assets/fonts/Dubai-Regular.ttf'),
    'Dubai-Medium': require('../assets/fonts/Dubai-Medium.ttf'),
    'Dubai-Bold': require('../assets/fonts/Dubai-Bold.ttf'),
  });

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  useEffect(() => {
    Appearance.setColorScheme(theme);
    colorScheme.set(theme);
  }, [theme]);

  useEffect(() => {
    if (fontsLoaded) {
      applyGlobalDubaiFont();
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} animated />
        <Stack screenOptions={stackScreenOptions}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false, title: '' }} />
        </Stack>
        <ToastHost />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Appearance, I18nManager } from 'react-native';
import { colorScheme } from 'nativewind';

import { asyncStorage } from '@/lib/storage';
import i18n from '@/lib/i18n';

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

type SettingsState = {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isRTL: () => boolean;
};

function applyColorScheme(theme: Theme) {
  Appearance.setColorScheme(theme);
  colorScheme.set(theme);
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      language: 'en',
      theme: 'light',
      setLanguage: (lang) => {
        const isRTL = lang === 'ar';
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
        void i18n.changeLanguage(lang);
        set({ language: lang });
      },
      setTheme: (theme) => {
        applyColorScheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        get().setTheme(get().theme === 'dark' ? 'light' : 'dark');
      },
      isRTL: () => get().language === 'ar',
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => asyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyColorScheme(state.theme);
        }
      },
    },
  ),
);

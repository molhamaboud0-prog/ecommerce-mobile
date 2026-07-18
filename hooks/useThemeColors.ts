import { getColors, type ThemePalette } from '@/lib/theme';
import { useSettingsStore } from '@/store/settingsStore';

/** Returns the color palette matching the current theme (light/dark). */
export function useThemeColors(): ThemePalette {
  const theme = useSettingsStore((s) => s.theme);
  return getColors(theme);
}

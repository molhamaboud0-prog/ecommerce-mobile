import type { ViewStyle } from 'react-native';

export type ThemePalette = {
  primary: string;
  ink: string;
  accent: string;
  surface: string;
  surfaceAlt: string;
  background: string;
  muted: string;
  success: string;
  border: string;
};

/** Dark blue + cool gray brand system */
export const lightColors: ThemePalette = {
  primary: '#0B1F3A',
  ink: '#0B1726',
  accent: '#1B4F8A',
  surface: '#FFFFFF',
  surfaceAlt: '#E9EFF6',
  background: '#F5F7FA',
  muted: '#5B6B7C',
  success: '#0D9488',
  border: '#D5DEE9',
};

export const darkColors: ThemePalette = {
  primary: '#0B1F3A',
  ink: '#E8EEF6',
  accent: '#5B9BD5',
  surface: '#121C2E',
  surfaceAlt: '#1A2740',
  background: '#0A1220',
  muted: '#94A3B8',
  success: '#2DD4BF',
  border: '#243247',
};

/** Hero / drawer brand gradient (deep navy → steel blue) */
export const brandGradient = ['#0B1F3A', '#163A5F', '#2B6CB0'] as const;

export function getColors(theme: 'light' | 'dark'): ThemePalette {
  return theme === 'dark' ? darkColors : lightColors;
}

/** Static palette for non-theme-aware contexts (splash, defaults). Prefer useThemeColors(). */
export const colors = lightColors;

/** Soft card elevation — prefer with a light border */
export const shadowCard: ViewStyle = {
  shadowColor: '#0B1F3A',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

/** Sticky bars / elevated chrome */
export const shadowElevated: ViewStyle = {
  shadowColor: '#0B1F3A',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
  elevation: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
} as const;

export const fontFamilies = {
  regular: 'Dubai-Regular',
  medium: 'Dubai-Medium',
  semibold: 'Dubai-Bold',
  bold: 'Dubai-Bold',
} as const;

export const listConfig = {
  pageSize: 20,
  onEndReachedThreshold: 0.3,
  estimatedItemSize: 280,
} as const;

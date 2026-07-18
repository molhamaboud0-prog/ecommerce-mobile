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

export const lightColors: ThemePalette = {
  primary: '#1A1A2E',
  ink: '#1A1A2E',
  accent: '#E94560',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F3F5',
  background: '#F8F9FA',
  muted: '#6B7280',
  success: '#10B981',
  border: '#E5E7EB',
};

export const darkColors: ThemePalette = {
  primary: '#1A1A2E',
  ink: '#F3F4F6',
  accent: '#F25C76',
  surface: '#1A1D26',
  surfaceAlt: '#232733',
  background: '#0F1117',
  muted: '#9CA3AF',
  success: '#34D399',
  border: '#2A2F3A',
};

export function getColors(theme: 'light' | 'dark'): ThemePalette {
  return theme === 'dark' ? darkColors : lightColors;
}

/** Static palette for non-theme-aware contexts (splash, defaults). Prefer useThemeColors(). */
export const colors = lightColors;

export const shadowCard: ViewStyle = {
  shadowColor: '#1A1A2E',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.07,
  shadowRadius: 12,
  elevation: 3,
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
  regular: 'Cairo_400Regular',
  medium: 'Cairo_500Medium',
  semibold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
} as const;

export const listConfig = {
  pageSize: 20,
  onEndReachedThreshold: 0.3,
  estimatedItemSize: 280,
} as const;

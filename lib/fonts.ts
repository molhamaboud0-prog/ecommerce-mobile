import { TextInput, type TextStyle } from 'react-native';

import { fontFamilies } from '@/lib/theme';

/**
 * Default Dubai face for bare TextInput instances (AppText already maps Text).
 * Avoid mutating Text.defaultProps — it fights NativeWind style merges.
 */
export function applyGlobalDubaiFont(): void {
  const baseStyle: TextStyle = { fontFamily: fontFamilies.regular };

  const inputDefaults =
    (TextInput as { defaultProps?: { style?: TextStyle | TextStyle[] } }).defaultProps ??
    {};

  // Only set once so re-renders / Fast Refresh do not nest style arrays forever.
  const alreadyApplied =
    Array.isArray(inputDefaults.style) &&
    inputDefaults.style.some(
      (s) =>
        !!s &&
        typeof s === 'object' &&
        'fontFamily' in s &&
        (s as TextStyle).fontFamily === fontFamilies.regular,
    );

  if (alreadyApplied) {
    return;
  }

  (TextInput as { defaultProps?: unknown }).defaultProps = {
    ...inputDefaults,
    style: [inputDefaults.style, baseStyle],
  };
}

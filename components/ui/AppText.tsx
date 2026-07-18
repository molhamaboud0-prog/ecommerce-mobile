import { Text as RNText, StyleSheet, type TextProps, type TextStyle } from 'react-native';
import { cssInterop } from 'nativewind';

// Each Cairo weight is registered as its own font family, so we translate
// fontWeight (from Tailwind classes like font-bold) into the matching face.
const CAIRO_BY_WEIGHT: Record<string, string> = {
  '100': 'Cairo_400Regular',
  '200': 'Cairo_400Regular',
  '300': 'Cairo_400Regular',
  '400': 'Cairo_400Regular',
  normal: 'Cairo_400Regular',
  '500': 'Cairo_500Medium',
  '600': 'Cairo_600SemiBold',
  '700': 'Cairo_700Bold',
  '800': 'Cairo_700Bold',
  '900': 'Cairo_700Bold',
  bold: 'Cairo_700Bold',
};

function AppTextBase({ style, ...props }: TextProps) {
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const weight = String(flat?.fontWeight ?? '400');
  const fontFamily = flat?.fontFamily ?? CAIRO_BY_WEIGHT[weight] ?? 'Cairo_400Regular';

  return <RNText {...props} style={[style, { fontFamily, fontWeight: undefined }]} />;
}

export const Text = cssInterop(AppTextBase, { className: 'style' });

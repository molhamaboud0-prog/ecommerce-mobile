import { Platform, Text as RNText, StyleSheet, type TextProps, type TextStyle } from 'react-native';
import { cssInterop } from 'nativewind';

// Each Dubai weight is registered as its own font family, so we translate
// fontWeight (from Tailwind classes like font-bold) into the matching face.
const DUBAI_BY_WEIGHT: Record<string, string> = {
  '100': 'Dubai-Light',
  '200': 'Dubai-Light',
  '300': 'Dubai-Light',
  '400': 'Dubai-Regular',
  normal: 'Dubai-Regular',
  '500': 'Dubai-Medium',
  '600': 'Dubai-Bold',
  '700': 'Dubai-Bold',
  '800': 'Dubai-Bold',
  '900': 'Dubai-Bold',
  bold: 'Dubai-Bold',
};

function AppTextBase({ style, ...props }: TextProps) {
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const weight = String(flat?.fontWeight ?? '400');
  const fontFamily = flat?.fontFamily ?? DUBAI_BY_WEIGHT[weight] ?? 'Dubai-Regular';

  return (
    <RNText
      {...props}
      style={[
        style,
        {
          fontFamily,
          fontWeight: undefined,
          ...(Platform.OS === 'android' ? { includeFontPadding: false } : null),
        },
      ]}
    />
  );
}

export const Text = cssInterop(AppTextBase, { className: 'style' });

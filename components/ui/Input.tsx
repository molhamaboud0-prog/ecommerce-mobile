import { useState } from 'react';
import { Pressable, TextInput, type TextInputProps, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { fontFamilies } from '@/lib/theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  className,
  secureTextEntry,
  ...props
}: InputProps) {
  const c = useThemeColors();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const isPassword = secureTextEntry === true;

  const borderClass = error
    ? 'border-accent'
    : focused
      ? 'border-accent'
      : 'border-border';

  return (
    <View className="mb-4">
      {label ? <Text className="mb-1 text-sm font-medium text-ink">{label}</Text> : null}
      <View
        className={`flex-row items-center rounded-xl border bg-surface ${borderClass}`}
      >
        <TextInput
          className={`flex-1 px-4 py-3 text-ink ${className ?? ''}`}
          style={{ fontFamily: fontFamilies.regular }}
          placeholderTextColor={c.muted}
          secureTextEntry={isPassword ? hidden : secureTextEntry}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {isPassword ? (
          <Pressable
            onPress={() => setHidden((v) => !v)}
            className="px-3 py-3 active:opacity-60"
            hitSlop={8}
          >
            {hidden ? (
              <EyeOff size={20} color={c.muted} />
            ) : (
              <Eye size={20} color={c.muted} />
            )}
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="mt-1 text-sm text-accent">{error}</Text> : null}
    </View>
  );
}

import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/AppText';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'light';
  loading?: boolean;
};

const variantStyles = {
  primary: 'bg-accent',
  secondary: 'bg-primary',
  ghost: 'bg-transparent border border-ink',
  success: 'bg-success',
  light: 'bg-white',
} as const;

const textStyles = {
  primary: 'text-white',
  secondary: 'text-white',
  ghost: 'text-ink',
  success: 'text-white',
  light: 'text-accent',
} as const;

export function Button({
  title,
  variant = 'primary',
  loading = false,
  className,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const isDisabled = disabled || loading;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={isDisabled}
        onPressIn={(e) => {
          scale.value = withSpring(0.96, { damping: 20, stiffness: 300 });
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          scale.value = withSpring(1, { damping: 20, stiffness: 300 });
          onPressOut?.(e);
        }}
        onPress={(e) => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress?.(e);
        }}
        className={`flex-row items-center justify-center rounded-xl px-6 py-3 ${variantStyles[variant]} ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'light' ? '#E94560' : '#FFFFFF'}
            style={{ marginRight: 8 }}
          />
        ) : null}
        <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

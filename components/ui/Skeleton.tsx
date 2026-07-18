import { useEffect } from 'react';
import { type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type SkeletonProps = ViewProps & {
  width?: number | `${number}%`;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
};

const roundedMap = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
} as const;

export function Skeleton({
  width = '100%',
  height = 16,
  rounded = 'md',
  className,
  style,
  ...props
}: SkeletonProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.45, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      className={`bg-surface-alt ${roundedMap[rounded]} ${className ?? ''}`}
      style={[{ width, height }, animatedStyle, style]}
      {...props}
    />
  );
}

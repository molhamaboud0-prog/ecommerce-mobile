import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';

type BadgeProps = {
  label: string;
  variant?: 'accent' | 'success' | 'muted' | 'warning';
};

const containerStyles = {
  accent: 'bg-accent-soft',
  success: 'bg-success-soft',
  muted: 'bg-surface-alt',
  warning: 'bg-amber-100 dark:bg-amber-950',
} as const;

const textStyles = {
  accent: 'text-accent',
  success: 'text-success',
  muted: 'text-muted',
  warning: 'text-amber-600 dark:text-amber-400',
} as const;

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-2.5 py-0.5 ${containerStyles[variant]}`}>
      <Text className={`text-xs font-semibold ${textStyles[variant]}`}>{label}</Text>
    </View>
  );
}

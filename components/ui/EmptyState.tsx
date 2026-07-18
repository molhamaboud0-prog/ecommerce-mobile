import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      {icon ? (
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-surface-alt">
          {icon}
        </View>
      ) : null}
      <Text className="text-center text-xl font-semibold text-ink">{title}</Text>
      {description ? (
        <Text className="mt-2 text-center text-muted">{description}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <View className="mt-6 w-full">
          <Button title={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

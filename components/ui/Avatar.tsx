import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';

type AvatarProps = {
  name?: string | null;
  size?: number;
  /** Tailwind classes for the circle background (defaults to accent). */
  className?: string;
};

function getInitials(name?: string | null): string {
  if (!name?.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + second).toUpperCase();
}

export function Avatar({ name, size = 56, className }: AvatarProps) {
  return (
    <View
      className={`items-center justify-center rounded-full ${className ?? 'bg-accent'}`}
      style={{ width: size, height: size }}
    >
      <Text className="font-bold text-white" style={{ fontSize: size * 0.36 }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

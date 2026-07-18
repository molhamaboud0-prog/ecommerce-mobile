import { Pressable } from 'react-native';
import { router } from 'expo-router';

import { Text } from '@/components/ui/AppText';

type TagChipProps = {
  tag: string;
  onPress?: () => void;
};

export function TagChip({ tag, onPress }: TagChipProps) {
  const handlePress = onPress ?? (() => router.push(`/tag/${tag}`));

  return (
    <Pressable
      onPress={handlePress}
      className="mb-2 mr-2 rounded-full bg-surface-alt px-3 py-1.5 active:opacity-70"
    >
      <Text className="text-sm text-ink">#{tag}</Text>
    </Pressable>
  );
}

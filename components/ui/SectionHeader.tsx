import { Pressable, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';

type SectionHeaderProps = {
  title: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
};

export function SectionHeader({
  title,
  onViewAll,
  viewAllLabel = 'View All',
}: SectionHeaderProps) {
  const c = useThemeColors();

  return (
    <View className="mb-3 flex-row items-center justify-between px-4">
      <Text className="text-lg font-bold text-ink">{title}</Text>
      {onViewAll ? (
        <Pressable
          onPress={onViewAll}
          className="flex-row items-center active:opacity-70"
        >
          <Text className="mr-1 text-sm font-medium text-accent">{viewAllLabel}</Text>
          <ChevronRight size={16} color={c.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}

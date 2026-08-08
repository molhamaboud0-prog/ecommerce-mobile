import { Pressable, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
};

export function SectionHeader({
  title,
  subtitle,
  onViewAll,
  viewAllLabel = 'View All',
}: SectionHeaderProps) {
  const c = useThemeColors();

  return (
    <View className="mb-4 flex-row items-end justify-between px-4">
      <View className="mr-3 flex-1">
        <Text className="font-bold text-xl text-ink">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 text-sm text-muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {onViewAll ? (
        <Pressable
          onPress={onViewAll}
          className="mb-0.5 flex-row items-center active:opacity-70"
        >
          <Text className="mr-0.5 font-medium text-sm text-accent">{viewAllLabel}</Text>
          <ChevronRight size={16} color={c.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}

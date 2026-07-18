import { View } from 'react-native';
import { Star } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  size?: number;
};

const STAR_COLOR = '#F5A623';

export function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  const c = useThemeColors();
  const full = Math.round(rating);

  return (
    <View className="flex-row items-center">
      <View className="flex-row items-center" style={{ gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            color={i < full ? STAR_COLOR : c.border}
            fill={i < full ? STAR_COLOR : 'transparent'}
          />
        ))}
      </View>
      <Text className="ml-1.5 text-xs text-muted">
        {rating.toFixed(1)}
        {reviewCount !== undefined ? ` (${reviewCount})` : ''}
      </Text>
    </View>
  );
}

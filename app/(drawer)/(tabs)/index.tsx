import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useAppTranslation } from '@/hooks/useLocalized';

/** Placeholder — replaced in Section 2 (Home). */
export default function HomeScreen() {
  const { t } = useAppTranslation();
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.home')} />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-muted">Home — coming in Section 2</Text>
      </View>
    </View>
  );
}

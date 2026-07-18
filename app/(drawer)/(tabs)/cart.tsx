import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useAppTranslation } from '@/hooks/useLocalized';

/** Placeholder — replaced in Section 4 (Cart). */
export default function CartScreen() {
  const { t } = useAppTranslation();
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={t('common.cart')} />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-muted">Cart — coming in Section 4</Text>
      </View>
    </View>
  );
}

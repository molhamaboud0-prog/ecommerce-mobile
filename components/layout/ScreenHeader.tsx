import { Pressable, View } from 'react-native';
import { Menu } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { useThemeColors } from '@/hooks/useThemeColors';

type ScreenHeaderProps = {
  title: string;
  showMenu?: boolean;
};

export function ScreenHeader({ title, showMenu = true }: ScreenHeaderProps) {
  const navigation = useNavigation();
  const c = useThemeColors();

  return (
    <SafeAreaView edges={['top']} className="border-b border-border bg-surface">
      <View className="flex-row items-center px-4 pb-4 pt-3">
        {showMenu ? (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surface-alt active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Menu"
          >
            <Menu size={22} color={c.ink} />
          </Pressable>
        ) : null}
        <Text className="flex-1 font-bold text-xl leading-7 text-ink" numberOfLines={1}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}

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
    <SafeAreaView edges={['top']} className="bg-background">
      <View className="flex-row items-center px-4 py-3">
        {showMenu ? (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surface active:opacity-70"
            style={{
              shadowColor: c.ink,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
            accessibilityRole="button"
            accessibilityLabel="Menu"
          >
            <Menu size={22} color={c.ink} />
          </Pressable>
        ) : null}
        <Text className="text-xl font-bold text-ink">{title}</Text>
      </View>
    </SafeAreaView>
  );
}

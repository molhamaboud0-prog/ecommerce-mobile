import { SafeAreaView } from 'react-native-safe-area-context';

import { AboutPageContent } from '@/components/about';
import { RefreshableScrollView } from '@/components/ui';

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <RefreshableScrollView
        className="px-4 py-4"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <AboutPageContent />
      </RefreshableScrollView>
    </SafeAreaView>
  );
}

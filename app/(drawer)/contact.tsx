import { Linking, Pressable, View } from 'react-native';
import { Instagram, Facebook, Twitter, Phone, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/AppText';
import { RefreshableScrollView } from '@/components/ui';
import { contactInfo } from '@/data/contact';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

function ContactButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-2xl bg-surface p-4 active:opacity-80"
      style={shadowCard}
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-alt">
        {icon}
      </View>
      <Text className="ml-3 text-base font-medium text-ink">{label}</Text>
    </Pressable>
  );
}

export default function ContactScreen() {
  const { t } = useAppTranslation();
  const c = useThemeColors();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <RefreshableScrollView
        className="px-4 py-4"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ContactButton
          icon={<Phone size={22} color={c.accent} />}
          label={`${t('common.callUs')}: ${contactInfo.phone}`}
          onPress={() => void Linking.openURL(`tel:${contactInfo.phone}`)}
        />
        <ContactButton
          icon={<MessageCircle size={22} color={c.success} />}
          label={t('common.whatsapp')}
          onPress={() => void Linking.openURL(contactInfo.whatsapp)}
        />

        <Text className="mb-3 mt-4 text-lg font-bold text-ink">
          {t('common.followUs')}
        </Text>

        {contactInfo.social.instagram ? (
          <ContactButton
            icon={<Instagram size={22} color={c.ink} />}
            label="Instagram"
            onPress={() => void Linking.openURL(contactInfo.social.instagram!)}
          />
        ) : null}
        {contactInfo.social.facebook ? (
          <ContactButton
            icon={<Facebook size={22} color={c.ink} />}
            label="Facebook"
            onPress={() => void Linking.openURL(contactInfo.social.facebook!)}
          />
        ) : null}
        {contactInfo.social.twitter ? (
          <ContactButton
            icon={<Twitter size={22} color={c.ink} />}
            label="Twitter"
            onPress={() => void Linking.openURL(contactInfo.social.twitter!)}
          />
        ) : null}
      </RefreshableScrollView>
    </SafeAreaView>
  );
}

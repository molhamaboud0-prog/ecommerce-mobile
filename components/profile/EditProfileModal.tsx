import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { X } from 'lucide-react-native';

import { Text } from '@/components/ui/AppText';
import { Button, Input, showToast } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';
import { useAuthStore } from '@/store/authStore';

type EditProfileModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function EditProfileModal({ visible, onClose }: EditProfileModalProps) {
  const { t } = useAppTranslation();
  const c = useThemeColors();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone ?? '');
    setLocation(user.location ?? '');
    setError('');
  }, [visible, user]);

  const handleSave = () => {
    setLoading(true);
    setError('');

    const result = updateProfile({
      name,
      email,
      phone,
      location,
    });

    setLoading(false);

    if (!result.success && result.error) {
      setError(t(`errors.${result.error}`));
      return;
    }

    showToast(t('common.profileUpdated'));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end bg-black/50"
      >
        <View
          className="max-h-[90%] rounded-t-3xl bg-background px-4 pb-8 pt-4"
          style={shadowCard}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-ink">{t('common.editProfile')}</Text>
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full bg-surface active:opacity-70"
              accessibilityRole="button"
              accessibilityLabel={t('common.cancel')}
            >
              <X size={20} color={c.ink} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Input
              label={t('common.name')}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <Input
              label={t('common.email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              label={t('common.phone')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder={t('common.phonePlaceholder')}
              returnKeyType="next"
            />
            <Input
              label={t('common.location')}
              value={location}
              onChangeText={setLocation}
              placeholder={t('common.locationPlaceholder')}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
            {error ? (
              <Text className="-mt-2 mb-4 text-sm text-accent">{error}</Text>
            ) : null}

            <Button
              title={t('common.saveChanges')}
              onPress={handleSave}
              loading={loading}
            />
            <Button
              title={t('common.cancel')}
              variant="ghost"
              onPress={onClose}
              className="mt-2"
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

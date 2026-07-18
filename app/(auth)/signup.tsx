import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { Link, router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { AuthFormLayout } from '@/components/auth/AuthFormLayout';
import { Button, Input } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useAuthStore } from '@/store/authStore';

export default function SignupScreen() {
  const { t } = useAppTranslation();
  const signup = useAuthStore((s) => s.signup);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    const result = signup(name, email.trim(), password, confirmPassword);
    if (!result.success && result.error) {
      setError(t(`errors.${result.error}`));
      setLoading(false);
      return;
    }
    router.replace('/(drawer)/(tabs)');
  };

  return (
    <AuthFormLayout>
      <View className="mb-8 items-center">
        <View className="h-20 w-20 items-center justify-center rounded-3xl bg-accent">
          <UserPlus size={36} color="#FFFFFF" />
        </View>
        <Text className="mt-5 text-3xl font-bold text-ink">{t('common.signup')}</Text>
        <Text className="mt-1 text-muted">{t('common.signupSubtitle')}</Text>
      </View>

      <Input
        label={t('common.name')}
        value={name}
        onChangeText={setName}
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
        label={t('common.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="next"
      />
      <Input
        label={t('common.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSignup}
      />
      {error ? <Text className="mb-4 text-sm text-accent">{error}</Text> : null}

      <Button title={t('common.signup')} onPress={handleSignup} loading={loading} />

      <View className="mt-6 flex-row justify-center">
        <Text className="text-muted">{t('common.hasAccount')} </Text>
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text className="font-semibold text-accent">{t('common.login')}</Text>
          </Pressable>
        </Link>
      </View>
    </AuthFormLayout>
  );
}

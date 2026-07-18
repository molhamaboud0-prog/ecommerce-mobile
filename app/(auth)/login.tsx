import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { Link, router } from 'expo-router';

import { Text } from '@/components/ui/AppText';
import { AuthFormLayout } from '@/components/auth/AuthFormLayout';
import { Button, Input } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const { t } = useAppTranslation();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const result = login(email.trim(), password);
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
          <ShoppingBag size={38} color="#FFFFFF" />
        </View>
        <Text className="mt-5 text-3xl font-bold text-ink">{t('common.login')}</Text>
        <Text className="mt-1 text-muted">{t('common.loginSubtitle')}</Text>
      </View>

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
        returnKeyType="done"
        onSubmitEditing={handleLogin}
      />
      {error ? <Text className="mb-4 text-sm text-accent">{error}</Text> : null}

      <Button title={t('common.login')} onPress={handleLogin} loading={loading} />

      <View className="mt-6 flex-row justify-center">
        <Text className="text-muted">{t('common.noAccount')} </Text>
        <Link href="/(auth)/signup" asChild>
          <Pressable>
            <Text className="font-semibold text-accent">{t('common.signup')}</Text>
          </Pressable>
        </Link>
      </View>
    </AuthFormLayout>
  );
}

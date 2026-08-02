import { Slot } from 'expo-router';

import { RequireAuth } from '@/components/auth/RouteGuards';

export default function TagLayout() {
  return (
    <RequireAuth>
      <Slot />
    </RequireAuth>
  );
}

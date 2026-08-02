import { Slot } from 'expo-router';

import { RequireAuth } from '@/components/auth/RouteGuards';

export default function ProductLayout() {
  return (
    <RequireAuth>
      <Slot />
    </RequireAuth>
  );
}

import { Slot } from 'expo-router';

import { RequireAuth } from '@/components/auth/RouteGuards';

export default function OrdersLayout() {
  return (
    <RequireAuth>
      <Slot />
    </RequireAuth>
  );
}

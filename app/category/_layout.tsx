import { Slot } from 'expo-router';

import { RequireAuth } from '@/components/auth/RouteGuards';

export default function CategoryLayout() {
  return (
    <RequireAuth>
      <Slot />
    </RequireAuth>
  );
}

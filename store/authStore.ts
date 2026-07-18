import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/data/types';
import { asyncStorage } from '@/lib/storage';

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => { success: boolean; error?: string };
  updateProfile: (data: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length >= 8;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (email, password) => {
        if (!isValidEmail(email)) {
          return { success: false, error: 'invalidEmail' };
        }
        if (password.length < 6) {
          return { success: false, error: 'passwordTooShort' };
        }
        const user: User = {
          id: `user-${email}`,
          name: email.split('@')[0] ?? 'User',
          email,
        };
        set({ user, isLoggedIn: true });
        return { success: true };
      },
      signup: (name, email, password, confirmPassword) => {
        if (!name.trim()) {
          return { success: false, error: 'nameRequired' };
        }
        if (!isValidEmail(email)) {
          return { success: false, error: 'invalidEmail' };
        }
        if (password.length < 6) {
          return { success: false, error: 'passwordTooShort' };
        }
        if (password !== confirmPassword) {
          return { success: false, error: 'passwordMismatch' };
        }
        const user: User = { id: `user-${Date.now()}`, name: name.trim(), email };
        set({ user, isLoggedIn: true });
        return { success: true };
      },
      updateProfile: (data) => {
        const name = data.name.trim();
        const email = data.email.trim();
        const phone = data.phone?.trim() ?? '';
        const location = data.location?.trim() ?? '';

        if (!name) {
          return { success: false, error: 'nameRequired' };
        }
        if (!isValidEmail(email)) {
          return { success: false, error: 'invalidEmail' };
        }
        if (phone && !isValidPhone(phone)) {
          return { success: false, error: 'invalidPhone' };
        }

        const currentUser = get().user;
        if (!currentUser) {
          return { success: false, error: 'nameRequired' };
        }

        const user: User = {
          ...currentUser,
          name,
          email,
          phone: phone || undefined,
          location: location || undefined,
        };
        set({ user });

        return { success: true };
      },
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
);

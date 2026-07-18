import { act, renderHook } from '@testing-library/react-native';

import { useAuthStore } from '@/store/authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isLoggedIn: false });
  });

  it('logs in with valid credentials', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      const res = result.current.login('test@email.com', 'password123');
      expect(res.success).toBe(true);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.email).toBe('test@email.com');
  });

  it('rejects invalid email', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      const res = result.current.login('bad-email', 'password123');
      expect(res.success).toBe(false);
      expect(res.error).toBe('invalidEmail');
    });
  });

  it('rejects short password', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      const res = result.current.login('test@email.com', '123');
      expect(res.success).toBe(false);
      expect(res.error).toBe('passwordTooShort');
    });
  });

  it('signs up with valid data', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      const res = result.current.signup(
        'John',
        'john@email.com',
        'password123',
        'password123',
      );
      expect(res.success).toBe(true);
    });

    expect(result.current.user?.name).toBe('John');
  });

  it('rejects password mismatch on signup', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      const res = result.current.signup(
        'John',
        'john@email.com',
        'password123',
        'different',
      );
      expect(res.success).toBe(false);
      expect(res.error).toBe('passwordMismatch');
    });
  });

  it('logs out', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login('test@email.com', 'password123');
      result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('updates profile fields', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.signup('John', 'john@email.com', 'password123', 'password123');
    });

    act(() => {
      const res = result.current.updateProfile({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+966501234567',
        location: 'Riyadh, SA',
      });
      expect(res.success).toBe(true);
    });

    expect(result.current.user?.name).toBe('John Doe');
    expect(result.current.user?.email).toBe('john.doe@email.com');
    expect(result.current.user?.phone).toBe('+966501234567');
    expect(result.current.user?.location).toBe('Riyadh, SA');
  });

  it('rejects invalid phone on profile update', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login('test@email.com', 'password123');
    });

    act(() => {
      const res = result.current.updateProfile({
        name: 'Test',
        email: 'test@email.com',
        phone: '123',
      });
      expect(res.success).toBe(false);
      expect(res.error).toBe('invalidPhone');
    });
  });
});

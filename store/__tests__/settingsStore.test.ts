import { act, renderHook } from '@testing-library/react-native';
import { Appearance } from 'react-native';

import { useSettingsStore } from '@/store/settingsStore';

jest.mock('nativewind', () => ({
  colorScheme: { set: jest.fn() },
  cssInterop: jest.fn((component: unknown) => component),
}));

describe('useSettingsStore theme', () => {
  beforeEach(() => {
    useSettingsStore.setState({ theme: 'light' });
    jest.spyOn(Appearance, 'setColorScheme').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('defaults to light theme', () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.theme).toBe('light');
  });

  it('sets theme explicitly', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(Appearance.setColorScheme).toHaveBeenCalledWith('dark');
  });

  it('toggles between light and dark', () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
    expect(Appearance.setColorScheme).toHaveBeenCalledWith('light');
  });
});

import { colors, listConfig, spacing } from '@/lib/theme';

describe('theme', () => {
  it('exports brand colors', () => {
    expect(colors.primary).toBe('#1A1A2E');
    expect(colors.accent).toBe('#E94560');
  });

  it('exports list pagination config', () => {
    expect(listConfig.pageSize).toBe(20);
    expect(listConfig.onEndReachedThreshold).toBe(0.3);
  });

  it('exports spacing scale', () => {
    expect(spacing.md).toBe(16);
  });
});

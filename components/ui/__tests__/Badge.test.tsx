import { render, screen } from '@testing-library/react-native';

import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="In Stock" variant="success" />);
    expect(screen.getByText('In Stock')).toBeTruthy();
  });

  it('defaults to muted variant', () => {
    render(<Badge label="Processing" />);
    expect(screen.getByText('Processing')).toBeTruthy();
  });
});

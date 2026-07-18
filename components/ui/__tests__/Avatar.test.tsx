import { render, screen } from '@testing-library/react-native';

import { Avatar } from '@/components/ui/Avatar';

describe('Avatar', () => {
  it('renders initials from full name', () => {
    render(<Avatar name="Sara Ahmed" />);
    expect(screen.getByText('SA')).toBeTruthy();
  });

  it('renders single initial for one-word names', () => {
    render(<Avatar name="Sara" />);
    expect(screen.getByText('S')).toBeTruthy();
  });

  it('renders placeholder when name is missing', () => {
    render(<Avatar name={null} />);
    expect(screen.getByText('?')).toBeTruthy();
  });
});

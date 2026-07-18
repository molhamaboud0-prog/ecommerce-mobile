import { render, screen } from '@testing-library/react-native';

import { EmptyState } from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState title="No products found" description="Try adjusting your filters" />,
    );

    expect(screen.getByText('No products found')).toBeTruthy();
    expect(screen.getByText('Try adjusting your filters')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const onAction = jest.fn();

    render(
      <EmptyState title="Empty cart" actionLabel="Browse shop" onAction={onAction} />,
    );

    const button = screen.getByText('Browse shop');
    expect(button).toBeTruthy();
  });
});

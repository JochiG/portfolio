import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from '../Skills';

describe('Skills', () => {
  it('renders category headings', () => {
    render(<Skills />);
    expect(screen.getByText('Lenguajes')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
});

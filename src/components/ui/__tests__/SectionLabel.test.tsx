import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionLabel } from '../SectionLabel';

describe('SectionLabel', () => {
  it('renders its label text', () => {
    render(<SectionLabel text="lo que hice" />);
    expect(screen.getByText('lo que hice')).toBeInTheDocument();
  });
});

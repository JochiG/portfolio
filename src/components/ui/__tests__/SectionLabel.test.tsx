import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionLabel } from '../SectionLabel';

describe('SectionLabel', () => {
  it('shows number and text', () => {
    render(<SectionLabel index={2} text="Proyectos" />);
    expect(screen.getByText(/02/)).toBeInTheDocument();
    expect(screen.getByText(/Proyectos/)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders anchor links', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute('href', '#proyectos');
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '#contacto');
  });
});

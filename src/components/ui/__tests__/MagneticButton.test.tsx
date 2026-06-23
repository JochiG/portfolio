import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MagneticButton } from '../MagneticButton';

describe('MagneticButton', () => {
  it('renders as a link when href is given', () => {
    render(<MagneticButton href="#proyectos">Ver proyectos</MagneticButton>);
    const link = screen.getByRole('link', { name: 'Ver proyectos' });
    expect(link).toHaveAttribute('href', '#proyectos');
  });
});

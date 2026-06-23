import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('renders a heading and the photo with alt text', () => {
    render(<About />);
    expect(screen.getByRole('img', { name: /José/i })).toBeInTheDocument();
  });
});

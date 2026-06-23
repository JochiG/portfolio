import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('plays with the nickname and shows the full legal name', () => {
    render(<Hero />);
    expect(screen.getByText(/Jochi/)).toBeInTheDocument();
    expect(screen.getByText(/José Ignacio García Olmos/)).toBeInTheDocument();
  });
});

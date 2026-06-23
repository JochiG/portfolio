import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact', () => {
  it('links to whatsapp, instagram, github and email', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', 'https://wa.me/542478407856');
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', 'https://instagram.com/jochigarcia_');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/JochiG');
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:josegarciaolmos@outlook.com');
  });
});

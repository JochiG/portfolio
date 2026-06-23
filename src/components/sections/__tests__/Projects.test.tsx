import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from '../Projects';
import { projects } from '@/data/projects';

describe('Projects', () => {
  it('renders a clickable card linking to each project detail page', () => {
    render(<Projects />);
    for (const p of projects) {
      const link = screen.getByRole('link', { name: new RegExp(p.title, 'i') });
      expect(link.getAttribute('href')).toMatch(new RegExp(`^/proyectos/${p.slug}/?$`));
    }
  });
});

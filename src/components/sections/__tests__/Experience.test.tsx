import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from '../Experience';
import { experience } from '@/data/experience';

describe('Experience', () => {
  it('renders each timeline item title', () => {
    render(<Experience />);
    for (const item of experience) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });
});

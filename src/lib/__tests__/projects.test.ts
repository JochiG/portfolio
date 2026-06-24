import { describe, it, expect } from 'vitest';
import { getProjectBySlug, getAdjacentProjects } from '../projects';

describe('project lookup', () => {
  it('finds a project by slug', () => {
    expect(getProjectBySlug('beacon-ia')?.title).toBe('Beacon AI');
  });
  it('returns prev/next neighbours', () => {
    const { prev, next } = getAdjacentProjects('beacon-ia');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('nsinversiones');
  });
});

import { describe, it, expect } from 'vitest';
import { getProjectBySlug, getAdjacentProjects } from '../projects';

describe('project lookup', () => {
  it('finds a project by slug', () => {
    expect(getProjectBySlug('proyecto-uno')?.title).toBe('Proyecto Uno');
  });
  it('returns prev/next neighbours', () => {
    const { prev, next } = getAdjacentProjects('proyecto-uno');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('proyecto-dos');
  });
});

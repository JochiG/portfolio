import { describe, it, expect } from 'vitest';
import { projects } from '../projects';
import { jochiMessages } from '../jochi-messages';

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it('every project has at least one description paragraph and a cover', () => {
    for (const p of projects) {
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.cover).toMatch(/^\/images\//);
    }
  });
});

describe('jochi messages', () => {
  it('cover the required anchors', () => {
    const anchors = jochiMessages.map((m) => m.anchor);
    for (const a of ['hero', 'about', 'proyectos', 'stack', 'experiencia', 'contacto']) {
      expect(anchors).toContain(a);
    }
  });
});

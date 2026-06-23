import { describe, it, expect } from 'vitest';
import { interpolatePath, type Anchor } from '../path';

const anchors: Anchor[] = [
  { at: 0, position: [0, 0, 0], rotation: [0, 0, 0] },
  { at: 1, position: [10, -10, 0], rotation: [0, 6.28, 0] },
];

describe('interpolatePath', () => {
  it('returns the first anchor at progress 0', () => {
    const r = interpolatePath(0, anchors);
    expect(r.position).toEqual([0, 0, 0]);
  });
  it('returns the last anchor at progress 1', () => {
    const r = interpolatePath(1, anchors);
    expect(r.position).toEqual([10, -10, 0]);
  });
  it('linearly interpolates at the midpoint', () => {
    const r = interpolatePath(0.5, anchors);
    expect(r.position[0]).toBeCloseTo(5);
    expect(r.position[1]).toBeCloseTo(-5);
  });
  it('clamps out-of-range progress', () => {
    expect(interpolatePath(-1, anchors).position).toEqual([0, 0, 0]);
    expect(interpolatePath(2, anchors).position).toEqual([10, -10, 0]);
  });
});

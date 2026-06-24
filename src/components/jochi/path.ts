export type Vec3 = [number, number, number];
export type Anchor = { at: number; position: Vec3; rotation: Vec3 };
export type PathPose = { position: Vec3; rotation: Vec3 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function interpolatePath(progress: number, anchors: Anchor[]): PathPose {
  const p = clamp01(progress);
  const sorted = [...anchors].sort((a, b) => a.at - b.at);
  let lo = sorted[0];
  let hi = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (p >= sorted[i].at && p <= sorted[i + 1].at) {
      lo = sorted[i];
      hi = sorted[i + 1];
      break;
    }
  }
  const span = hi.at - lo.at || 1;
  const t = clamp01((p - lo.at) / span);
  const mix = (a: Vec3, b: Vec3): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  return { position: mix(lo.position, hi.position), rotation: mix(lo.rotation, hi.rotation) };
}

// Jochi stays in the RIGHT margin lane (positive x) and drifts gently in y/z
// as you scroll, so it never crosses over the left-aligned text. The motion is
// a soft float — small, smooth deltas between anchors — rather than side-to-side.
export const jochiAnchors: Anchor[] = [
  { at: 0.0, position: [2.9, 0.25, 0.0], rotation: [0, 0, 0] },
  { at: 0.2, position: [3.0, -0.15, 0.3], rotation: [0.1, 0.4, 0.05] },
  { at: 0.4, position: [2.8, 0.2, 0.1], rotation: [-0.08, 0.9, -0.05] },
  { at: 0.6, position: [3.0, -0.2, 0.25], rotation: [0.1, 1.3, 0.05] },
  { at: 0.8, position: [2.85, 0.15, 0.0], rotation: [-0.08, 1.7, -0.05] },
  { at: 1.0, position: [2.9, -0.1, 0.15], rotation: [0, 2.1, 0] },
];

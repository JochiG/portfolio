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

// Default flight path across the page (tweak visually during integration).
export const jochiAnchors: Anchor[] = [
  { at: 0.0, position: [2.2, 0, 0], rotation: [0, 0, 0] },
  { at: 0.2, position: [-2.2, -0.5, 0], rotation: [0.3, 1.6, 0] },
  { at: 0.45, position: [2.4, 0.3, -1], rotation: [0, 3.1, 0.2] },
  { at: 0.7, position: [-2.0, 0, 0], rotation: [0.2, 4.7, 0] },
  { at: 1.0, position: [0, -0.4, 0.5], rotation: [0, 6.28, 0] },
];

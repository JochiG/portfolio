'use client';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

'use client';
import { interpolatePath, jochiAnchors, type PathPose } from './path';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';

export function useJochiPath(): PathPose {
  const progress = useScrollProgress();
  return interpolatePath(progress, jochiAnchors);
}

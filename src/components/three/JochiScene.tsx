'use client';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { ChromeOrb } from './ChromeOrb';
import { useJochiPath } from '@/components/jochi/useJochiPath';

function OrbDriver() {
  const pose = useJochiPath();
  return <ChromeOrb position={pose.position} rotation={pose.rotation} />;
}

export function JochiScene() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <OrbDriver />
      </Canvas>
    </div>
  );
}

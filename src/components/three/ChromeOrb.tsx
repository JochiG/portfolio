'use client';
import { Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

/** Self-contained chrome sphere: spins idly, bobs gently and tilts slightly
 *  toward the pointer. It lives inside a small canvas — the travel down the
 *  page is handled by the DOM widget, not the 3D position. */
export function ChromeOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    ref.current.rotation.x += (state.pointer.y * 0.3 - ref.current.rotation.x) * 0.05;
  });
  return (
    <>
      <Environment preset="studio" />
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial metalness={1} roughness={0.08} color="#cfd2d6" envMapIntensity={1.5} />
      </mesh>
    </>
  );
}

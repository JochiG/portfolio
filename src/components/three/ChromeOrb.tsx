'use client';
import { Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

type Props = { position: [number, number, number]; rotation: [number, number, number] };

export function ChromeOrb({ position, rotation }: Props) {
  const ref = useRef<Mesh>(null);
  // subtle idle spin layered on top of scroll-driven rotation
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <>
      <Environment preset="studio" />
      <mesh ref={ref} position={position} rotation={rotation}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial metalness={1} roughness={0.08} color="#cfd2d6" envMapIntensity={1.5} />
      </mesh>
    </>
  );
}

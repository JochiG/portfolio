'use client';
import { Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

type Props = { position: [number, number, number]; rotation: [number, number, number] };

export function ChromeOrb({ position, rotation }: Props) {
  const ref = useRef<Mesh>(null);
  const idleSpin = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    idleSpin.current += delta * 0.15;
    ref.current.position.set(position[0], position[1], position[2]);
    ref.current.rotation.set(rotation[0], rotation[1] + idleSpin.current, rotation[2]);
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

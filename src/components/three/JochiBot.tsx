'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group, Mesh, Vector3 } from 'three';
import { useJochiPath } from '@/components/jochi/useJochiPath';

type Props = {
  message: string | null;
  muted: boolean;
  onToggleMute: () => void;
};

/** "Jochi": a chrome assistant head with a glowing eye and an orbiting ring.
 *  Follows the scroll-driven path smoothly (lerp) and bobs gently so it reads
 *  as floating. The dialogue bubble is anchored beside it via drei <Html>, so
 *  it looks like Jochi is speaking. */
export function JochiBot({ message, muted, onToggleMute }: Props) {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const current = useRef(new Vector3(2.9, 0.7, 0));
  const target = useRef(new Vector3());
  const pose = useJochiPath();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Smoothly chase the scroll target (kills erratic jumps).
    target.current.set(pose.position[0], pose.position[1], pose.position[2]);
    current.current.lerp(target.current, 1 - Math.pow(0.001, delta));
    if (group.current) {
      group.current.position.set(
        current.current.x,
        current.current.y + Math.sin(t * 1.1) * 0.09,
        current.current.z,
      );
    }
    // Slow head turn for shifting reflections; ring orbits for a robotic feel.
    if (head.current) head.current.rotation.y += delta * 0.12;
    if (ring.current) {
      ring.current.rotation.x += delta * 0.5;
      ring.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={group}>
      {/* chrome head */}
      <mesh ref={head}>
        <icosahedronGeometry args={[0.82, 8]} />
        <meshStandardMaterial metalness={1} roughness={0.05} color="#dfe3e7" envMapIntensity={1.9} />
      </mesh>

      {/* glowing "eye" facing the camera (HAL-like, on brand oxblood) */}
      <mesh position={[0, 0.04, 0.8]}>
        <circleGeometry args={[0.16, 40]} />
        <meshStandardMaterial color="#c2261d" emissive="#7c2128" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      {/* eye outer glow ring */}
      <mesh position={[0, 0.04, 0.79]}>
        <ringGeometry args={[0.17, 0.22, 40]} />
        <meshStandardMaterial color="#1c1916" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* orbiting chrome halo */}
      <mesh ref={ring} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[1.18, 0.022, 16, 96]} />
        <meshStandardMaterial color="#cfd2d6" metalness={1} roughness={0.12} envMapIntensity={1.5} />
      </mesh>

      {/* dialogue bubble anchored beside Jochi */}
      {message && !muted && (
        <Html position={[-1.7, 0.7, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="w-[220px] -translate-x-1/2 rounded-2xl rounded-br-sm border border-bone/20 bg-espresso px-4 py-3 text-sm leading-snug text-bone shadow-xl">
            {message}
          </div>
        </Html>
      )}

      {/* mute control under Jochi */}
      {!muted && (
        <Html position={[0, -1.35, 0]} center style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onToggleMute}
            className="whitespace-nowrap rounded-full border border-bone/40 bg-espresso/70 px-3 py-1 font-[family-name:var(--font-label)] text-xs text-bone backdrop-blur transition hover:bg-espresso"
          >
            ⏸ silenciar
          </button>
        </Html>
      )}
    </group>
  );
}

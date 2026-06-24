'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, Vector3 } from 'three';
import { useJochiPath } from '@/components/jochi/useJochiPath';

/** Drag state shared with the DOM overlay. Deltas are accumulated in pixels and
 *  converted to world units here each frame. */
export type DragState = { x: number; y: number; active: boolean };

/** "Jochi": a small polished chrome sphere with a glowing eye and an orbiting
 *  ring. Floats along the scroll path in the right margin (gentle bob) and can
 *  be nudged by the DOM drag handle; the offset eases back when released. The
 *  canvas is purely visual — all interactivity lives in the DOM overlay. */
export function JochiBot({ dragRef }: { dragRef: React.MutableRefObject<DragState> }) {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const current = useRef(new Vector3(2.9, 0.2, 0));
  const target = useRef(new Vector3());
  const pose = useJochiPath();
  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = dragRef.current;
    // when not dragging, decay the pixel offset back to zero (returns to lane)
    if (!d.active) {
      const k = Math.pow(0.02, delta);
      d.x *= k;
      d.y *= k;
    }
    const offX = (d.x / size.width) * viewport.width;
    const offY = -(d.y / size.height) * viewport.height;
    target.current.set(pose.position[0] + offX, pose.position[1] + offY, pose.position[2]);
    current.current.lerp(target.current, 1 - Math.pow(0.0015, delta));

    if (group.current) {
      group.current.position.set(
        current.current.x,
        current.current.y + Math.sin(t * 1.1) * 0.08,
        current.current.z,
      );
    }
    if (head.current) head.current.rotation.y += delta * 0.15;
    if (ring.current) {
      ring.current.rotation.x += delta * 0.5;
      ring.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      {/* polished chrome head */}
      <mesh ref={head}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={0.22} color="#cfd3d8" envMapIntensity={1} />
      </mesh>
      {/* dark eye socket + glowing eye */}
      <mesh position={[0, 0.03, 0.5]}>
        <circleGeometry args={[0.16, 40]} />
        <meshStandardMaterial color="#0e0d0c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.03, 0.52]}>
        <circleGeometry args={[0.1, 40]} />
        <meshStandardMaterial color="#e24b3f" emissive="#c2261d" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* orbiting chrome halo */}
      <mesh ref={ring} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[0.92, 0.018, 16, 100]} />
        <meshStandardMaterial color="#dfe3e7" metalness={1} roughness={0.15} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

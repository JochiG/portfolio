'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group, Mesh, Vector3 } from 'three';
import { useJochiPath } from '@/components/jochi/useJochiPath';

type Props = {
  message: string | null;
  muted: boolean;
  onToggleMute: () => void;
};

const ZERO = new Vector3();

/** "Jochi": a small chrome assistant — a polished sphere with a glowing eye and
 *  an orbiting ring. Floats along the scroll-driven path in the right margin and
 *  can also be dragged with the mouse (the drag offset eases back afterwards).
 *  The dialogue bubble is anchored beside it via drei <Html>. */
export function JochiBot({ message, muted, onToggleMute }: Props) {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  const current = useRef(new Vector3(2.9, 0.7, 0));
  const target = useRef(new Vector3());
  const dragOffset = useRef(new Vector3());
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const pose = useJochiPath();
  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // base scroll target + user drag offset
    target.current.set(
      pose.position[0] + dragOffset.current.x,
      pose.position[1] + dragOffset.current.y,
      pose.position[2],
    );
    current.current.lerp(target.current, 1 - Math.pow(0.0015, delta));
    // ease the drag offset back to zero when not actively dragging
    if (!dragging.current) dragOffset.current.lerp(ZERO, 1 - Math.pow(0.55, delta));

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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    dragOffset.current.x += (dx / size.width) * viewport.width;
    dragOffset.current.y -= (dy / size.height) * viewport.height;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <group ref={group}>
      {/* polished chrome head */}
      <mesh ref={head}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={0.22} color="#cfd3d8" envMapIntensity={1} />
      </mesh>

      {/* dark eye socket + glowing eye facing the camera */}
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

      {/* invisible drag handle (tracks the orb on screen) */}
      <Html center style={{ pointerEvents: 'auto' }}>
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="h-24 w-24 cursor-grab rounded-full active:cursor-grabbing"
          aria-hidden
        />
      </Html>

      {/* dialogue bubble beside Jochi */}
      {message && !muted && (
        <Html position={[-1.5, 0.6, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="w-[210px] rounded-2xl rounded-br-sm border border-bone/20 bg-espresso px-4 py-3 text-sm leading-snug text-bone shadow-xl">
            {message}
          </div>
        </Html>
      )}

      {/* mute control under Jochi */}
      {!muted && (
        <Html position={[0, -1, 0]} center style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onToggleMute}
            className="whitespace-nowrap rounded-full border border-espresso/30 bg-cream/80 px-2.5 py-0.5 font-[family-name:var(--font-label)] text-[11px] text-espresso/80 backdrop-blur transition hover:bg-cream"
          >
            ⏸ silenciar
          </button>
        </Html>
      )}
    </group>
  );
}

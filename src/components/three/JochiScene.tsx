'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { JochiBot } from './JochiBot';

type Props = {
  message: string | null;
  muted: boolean;
  onToggleMute: () => void;
};

/** Persistent full-viewport canvas. Renders in front of content (pointer-events
 *  none, so it never blocks clicks) with Jochi confined to the right margin. A
 *  procedural lightformer environment gives the chrome real reflections (no CDN
 *  HDR, so it never renders black). */
export function JochiScene({ message, muted, onToggleMute }: Props) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        {/* Big, soft lightformers wrap the chrome in broad smooth reflections
            (small/sparse lights produce blotches on a mirror) */}
        <Environment resolution={512} frames={1}>
          <Lightformer intensity={2.2} position={[0, 6, 6]} scale={[14, 14, 1]} color="#ffffff" />
          <Lightformer intensity={1.1} position={[-7, 2, 3]} scale={[10, 14, 1]} color="#e6ebf0" />
          <Lightformer intensity={1.3} position={[7, 0, 4]} scale={[10, 12, 1]} color="#d4e2f4" />
          <Lightformer intensity={0.6} position={[0, -7, 3]} scale={[14, 8, 1]} color="#caa089" />
        </Environment>
        <JochiBot message={message} muted={muted} onToggleMute={onToggleMute} />
      </Canvas>
    </div>
  );
}

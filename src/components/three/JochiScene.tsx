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
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={3} position={[0, 3, 4]} scale={[8, 8, 1]} color="#ffffff" />
          <Lightformer intensity={1.4} position={[-5, 1, 2]} scale={[3, 8, 1]} color="#e9ecef" />
          <Lightformer intensity={1.8} position={[5, -1, 3]} scale={[4, 5, 1]} color="#cfe0ff" />
          <Lightformer intensity={1} position={[0, -4, 2]} scale={[8, 3, 1]} color="#c2261d" />
        </Environment>
        <JochiBot message={message} muted={muted} onToggleMute={onToggleMute} />
      </Canvas>
    </div>
  );
}

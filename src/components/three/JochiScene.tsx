'use client';
import { Canvas } from '@react-three/fiber';
import { ChromeOrb } from './ChromeOrb';

/** Small canvas that fills its parent. The parent DOM widget positions and
 *  moves it down the right side of the page. */
export function JochiScene() {
  return (
    <div aria-hidden className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <ChromeOrb />
      </Canvas>
    </div>
  );
}

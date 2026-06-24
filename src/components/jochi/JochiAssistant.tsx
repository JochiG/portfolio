'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { DialogueBubble } from './DialogueBubble';
import { useJochiMessage } from './useJochiMessages';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const JochiScene = dynamic(() => import('@/components/three/JochiScene').then((m) => m.JochiScene), { ssr: false });

/** "Jochi": the chrome sphere assistant. Lives in a fixed lane on the RIGHT
 *  edge of the page and glides downward as you scroll, with its speech bubble
 *  attached to the left so it looks like the sphere is talking. Rendered in
 *  front of the content (not behind it), so it never washes out the text. */
export function JochiAssistant() {
  const reduced = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [muted, setMuted] = useState(false);
  const message = useJochiMessage();

  // Travel down the right side: map page scroll (0..1) to a vertical position.
  const { scrollYProgress } = useScroll();
  const yNum = useSpring(useTransform(scrollYProgress, [0, 1], [24, 76]), {
    stiffness: 55,
    damping: 18,
  });
  const top = useMotionTemplate`${yNum}vh`;

  useEffect(() => {
    setUse3D(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
  }, []);

  if (reduced) return null; // static fallback handled in Hero; no orb, no bubbles

  return (
    <motion.div
      style={{ top }}
      className="pointer-events-none fixed right-2 z-40 flex -translate-y-1/2 items-center gap-2 md:right-5"
    >
      {!muted && (
        <div className="hidden md:block">
          <DialogueBubble text={message?.text ?? null} />
        </div>
      )}

      <div className="relative h-16 w-16 md:h-28 md:w-28">
        <div className="h-full w-full drop-shadow-2xl">
          {use3D ? (
            <JochiScene />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/jochi-static.svg" alt="" className="h-full w-full" />
          )}
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Activar comentarios de Jochi' : 'Silenciar a Jochi'}
          className="pointer-events-auto absolute -bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-bg/85 px-2 py-0.5 font-[family-name:var(--font-label)] text-[10px] opacity-70 backdrop-blur transition hover:opacity-100 md:block"
        >
          {muted ? '🔊 Jochi' : '⏸ Jochi'}
        </button>
      </div>
    </motion.div>
  );
}

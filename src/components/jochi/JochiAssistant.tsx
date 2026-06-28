'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { DialogueBubble } from './DialogueBubble';
import { JochiChat } from './JochiChat';
import { useJochiMessage } from './useJochiMessages';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const JochiScene = dynamic(() => import('@/components/three/JochiScene').then((m) => m.JochiScene), {
  ssr: false,
});

/** "Jochi": the chrome sphere assistant. Travels down the RIGHT side of the
 *  page as you scroll, dropping contextual comments. Clicking it opens a chat
 *  panel where visitors can ask about José. Degrades to a static, clickable
 *  bubble on mobile / reduced-motion so the chat is always reachable. */
export function JochiAssistant() {
  const reduced = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [open, setOpen] = useState(false);
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

  const chat = (
    <AnimatePresence>{open && <JochiChat onClose={() => setOpen(false)} />}</AnimatePresence>
  );

  // Reduced motion: a simple fixed button (no travel, no 3D) that opens the chat.
  if (reduced) {
    return (
      <>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir chat con Jochi"
            className="fixed right-5 bottom-5 z-40 h-14 w-14 overflow-hidden rounded-full border border-border bg-bg shadow-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/jochi-static.svg" alt="" className="h-full w-full" />
          </button>
        )}
        {chat}
      </>
    );
  }

  return (
    <>
      {!open && (
        <motion.div
          style={{ top }}
          className="pointer-events-none fixed right-2 z-40 flex -translate-y-1/2 items-center gap-2 md:right-5"
        >
          <div className="hidden md:block">
            <DialogueBubble text={message?.text ?? null} />
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir chat con Jochi"
              className="pointer-events-auto block h-16 w-16 cursor-pointer drop-shadow-2xl md:h-28 md:w-28"
            >
              {use3D ? (
                <JochiScene />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/images/jochi-static.svg" alt="" className="h-full w-full" />
              )}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="pointer-events-auto absolute -bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-bg/85 px-2.5 py-0.5 font-[family-name:var(--font-label)] text-[10px] whitespace-nowrap opacity-80 backdrop-blur transition hover:border-accent hover:text-accent hover:opacity-100 md:block"
            >
              💬 preguntame
            </button>
          </div>
        </motion.div>
      )}
      {chat}
    </>
  );
}

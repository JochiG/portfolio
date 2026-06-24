'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DialogueBubble } from './DialogueBubble';
import { useJochiMessage } from './useJochiMessages';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const JochiScene = dynamic(() => import('@/components/three/JochiScene').then((m) => m.JochiScene), {
  ssr: false,
});

export function JochiAssistant() {
  const reduced = useReducedMotion();
  const [is3D, setIs3D] = useState(false);
  const [muted, setMuted] = useState(false);
  const message = useJochiMessage();

  useEffect(() => {
    setIs3D(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
  }, []);

  if (reduced) return null; // static orb fallback lives in Hero; no bubbles

  // Desktop: the 3D scene renders Jochi + the bubble + mute (all anchored together).
  if (is3D) {
    return <JochiScene message={message?.text ?? null} muted={muted} onToggleMute={() => setMuted(true)} />;
  }

  // Mobile / coarse pointer: lightweight DOM companion (small orb + bubble beside it).
  if (muted) return null;
  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-end gap-2">
      <DialogueBubble text={message?.text ?? null} />
      <div className="flex flex-col items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/jochi-static.svg" alt="" className="h-14 w-14 drop-shadow-lg" />
        <button
          onClick={() => setMuted(true)}
          className="rounded-full border border-espresso/30 bg-cream/80 px-2 py-0.5 font-[family-name:var(--font-label)] text-[10px] opacity-70 backdrop-blur"
        >
          ⏸ silenciar
        </button>
      </div>
    </div>
  );
}

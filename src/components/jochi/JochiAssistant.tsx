'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DialogueBubble } from './DialogueBubble';
import { useJochiMessage } from './useJochiMessages';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const JochiScene = dynamic(() => import('@/components/three/JochiScene').then((m) => m.JochiScene), { ssr: false });

export function JochiAssistant() {
  const reduced = useReducedMotion();
  const [is3D, setIs3D] = useState(false);
  const [muted, setMuted] = useState(false);
  const message = useJochiMessage();

  useEffect(() => {
    setIs3D(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
  }, []);

  if (reduced) return null; // static fallback handled in Hero; no orb, no bubbles

  return (
    <>
      {is3D && <JochiScene />}
      {!muted && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          <DialogueBubble text={message?.text ?? null} />
          <button
            onClick={() => setMuted(true)}
            className="rounded-full border border-espresso/30 bg-cream/80 px-3 py-1 font-[family-name:var(--font-label)] text-xs opacity-70 backdrop-blur hover:opacity-100"
          >
            ⏸ silenciar a Jochi
          </button>
        </div>
      )}
    </>
  );
}

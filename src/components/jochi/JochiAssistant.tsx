'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useJochiMessage } from './useJochiMessages';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import type { DragState } from '@/components/three/JochiBot';

const JochiScene = dynamic(() => import('@/components/three/JochiScene').then((m) => m.JochiScene), {
  ssr: false,
});

export function JochiAssistant() {
  const reduced = useReducedMotion();
  const [is3D, setIs3D] = useState(false);
  const [muted, setMuted] = useState(false);
  const message = useJochiMessage();
  const drag = useRef<DragState>({ x: 0, y: 0, active: false });
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIs3D(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
  }, []);

  if (reduced) return null; // static orb fallback lives in Hero

  // Mobile / coarse pointer: lightweight DOM companion, no 3D.
  if (!is3D) {
    if (muted) return null;
    return (
      <div className="fixed bottom-5 right-4 z-40 flex items-end gap-2">
        {message?.text && (
          <div className="max-w-[220px] rounded-2xl border border-bone/20 bg-espresso px-4 py-3 text-sm leading-snug text-bone shadow-xl">
            {message.text}
          </div>
        )}
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

  // Desktop: visual-only 3D canvas + tiny DOM overlay anchored over the orb.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.x += e.clientX - last.current.x;
    drag.current.y += e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  return (
    <>
      <JochiScene dragRef={drag} />
      {/* Small overlay anchored at the orb's approx screen position (right of
          center). pointer-events-none container; only the grab handle and mute
          re-enable events, so the rest of the page stays clickable. */}
      <div className="pointer-events-none fixed right-[13%] top-1/2 z-40 -translate-y-1/2">
        {message?.text && !muted && (
          <div className="absolute right-[64px] top-1/2 w-[210px] -translate-y-1/2 rounded-2xl rounded-br-sm border border-bone/20 bg-espresso px-4 py-3 text-sm leading-snug text-bone shadow-xl">
            {message.text}
          </div>
        )}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="pointer-events-auto h-28 w-28 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full active:cursor-grabbing"
          aria-hidden
        />
        {!muted && (
          <button
            onClick={() => setMuted(true)}
            className="pointer-events-auto absolute left-1/2 top-[66px] -translate-x-1/2 whitespace-nowrap rounded-full border border-espresso/30 bg-cream/80 px-2.5 py-0.5 font-[family-name:var(--font-label)] text-[11px] text-espresso/80 backdrop-blur transition hover:bg-cream"
          >
            ⏸ silenciar
          </button>
        )}
      </div>
    </>
  );
}

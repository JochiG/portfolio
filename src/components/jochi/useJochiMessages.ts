'use client';
import { useEffect, useMemo, useState } from 'react';
import { jochiMessages } from '@/data/jochi-messages';
import type { JochiMessage } from '@/data/types';

export function pickMessage(anchor: string, messages: JochiMessage[]): JochiMessage | null {
  return messages.find((m) => m.anchor === anchor) ?? null;
}

/** Tracks which section anchor is currently most in view. */
export function useActiveAnchor(anchors: string[]): string {
  const [active, setActive] = useState(anchors[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.4, 0.6] },
    );
    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [anchors]);
  return active;
}

export function useJochiMessage(): JochiMessage | null {
  const anchors = useMemo(() => jochiMessages.map((m) => m.anchor), []);
  const active = useActiveAnchor(anchors);
  return pickMessage(active, jochiMessages);
}

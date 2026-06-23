'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function MagneticButton({ children, href, onClick, className }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    'inline-flex items-center gap-2 rounded-full border border-oxblood px-6 py-3 font-[family-name:var(--font-label)] text-sm font-semibold text-oxblood transition-colors hover:bg-oxblood hover:text-bone';

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${className ?? ''}`}
    >
      {children}
    </motion.a>
  );
}

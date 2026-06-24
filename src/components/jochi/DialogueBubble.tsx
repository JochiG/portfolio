'use client';
import { AnimatePresence, motion } from 'framer-motion';

/** Speech bubble that sits to the LEFT of the orb, with a tail pointing right
 *  toward it, so it reads as the sphere talking. Solid background keeps the
 *  text readable over any section. */
export function DialogueBubble({ text }: { text: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, x: 10, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          className="relative max-w-[200px] rounded-2xl bg-fg px-4 py-2.5 text-sm leading-snug text-bg shadow-xl ring-1 ring-border md:max-w-[240px]"
        >
          {text}
          <span className="absolute top-1/2 right-[-4px] h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-fg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';
import { AnimatePresence, motion } from 'framer-motion';

export function DialogueBubble({ text }: { text: string | null }) {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="max-w-[240px] rounded-2xl bg-espresso px-4 py-3 text-sm leading-snug text-bone shadow-xl"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

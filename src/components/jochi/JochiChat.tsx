'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { jochiGreeting, jochiFallback, jochiKnowledge } from '@/data/jochi-knowledge';
import { matchAnswer } from './match';

type Msg = { from: 'jochi' | 'user'; text: string };

const suggestions = jochiKnowledge.filter((q) => q.suggestion).map((q) => q.suggestion!);

export function JochiChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([{ from: 'jochi', text: jochiGreeting }]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const hit = matchAnswer(text, jochiKnowledge);
    setMessages((m) => [
      ...m,
      { from: 'user', text },
      { from: 'jochi', text: hit ? hit.answer : jochiFallback },
    ]);
    setInput('');
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Chat con Jochi"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-auto fixed right-4 bottom-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-bg shadow-2xl sm:w-96"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/jochi-static.svg" alt="" className="h-7 w-7" />
          <div className="leading-tight">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold">Jochi</p>
            <p className="text-[11px] opacity-55">preguntame sobre José</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Cerrar chat"
          className="grid h-7 w-7 place-items-center rounded-full border border-border text-sm opacity-70 transition hover:opacity-100"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <span
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                m.from === 'user'
                  ? 'bg-accent text-on-accent'
                  : 'bg-surface text-fg ring-1 ring-border'
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 border-t border-border px-4 pt-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => ask(s)}
            className="rounded-full border border-border px-3 py-1 font-[family-name:var(--font-label)] text-xs opacity-75 transition hover:border-accent hover:text-accent hover:opacity-100"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu pregunta…"
          aria-label="Tu pregunta para Jochi"
          className="min-w-0 flex-1 rounded-full border border-border bg-transparent px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          aria-label="Enviar"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition hover:opacity-90"
        >
          ↑
        </button>
      </form>
    </motion.div>
  );
}

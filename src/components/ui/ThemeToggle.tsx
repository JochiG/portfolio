'use client';
import { useEffect, useState } from 'react';

/** Toggles the `.dark` class on <html> and persists the choice. The initial
 *  class is set pre-paint by the inline script in the layout (no flash). */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="grid h-8 w-8 place-items-center rounded-full border border-border text-base leading-none transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? '☀' : '☾'}
    </button>
  );
}

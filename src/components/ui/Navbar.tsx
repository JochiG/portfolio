'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#inicio', label: 'inicio' },
  { href: '#proyectos', label: 'proyectos' },
  { href: '#stack', label: 'stack' },
  { href: '#contacto', label: 'contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 font-[family-name:var(--font-label)] text-sm transition-all ${
        scrolled ? 'bg-bg/80 py-3 backdrop-blur' : 'py-5'
      }`}
    >
      <a href="#inicio" className="font-semibold text-accent">{site.domain}</a>
      <div className="flex items-center gap-3 md:gap-5">
        <nav className="flex gap-3 md:gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-70 transition-opacity hover:opacity-100">{l.label}</a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

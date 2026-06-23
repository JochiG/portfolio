# Portfolio de José García (Jochi) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, animation-rich personal portfolio for José "Jochi" García Olmos using Next.js 15 (App Router) with a scroll-driven chrome 3D assistant ("Jochi"), exported as a fully static frontend.

**Architecture:** Single-page scrolling site assembled from isolated section components driven by local TS data files, plus statically-generated `/proyectos/[slug]` detail pages. A persistent React Three Fiber canvas renders the chrome "Jochi" orb whose position/rotation interpolate from scroll progress. Animation primitives (Reveal, MagneticButton) wrap Framer Motion so sections stay declarative. Everything degrades for mobile and `prefers-reduced-motion`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, React Three Fiber + drei + three, Vitest + React Testing Library. Static export (`output: 'export'`), deploy on Vercel.

**Spec:** `docs/superpowers/specs/2026-06-23-portfolio-design.md`

**Design tokens (use everywhere):**
- `cream` `#efe7d8`, `espresso` `#1c1916`, `oxblood` `#7c2128`, `bone` `#f2ede3`
- chrome gradient: `#ffffff → #8a9099 → #5e636b`
- Fonts: Archivo (headings), Inter (body), Space Grotesk (labels)

---

## Phase 0 — Foundation

### Task 1: Scaffold project, git, tooling

**Files:**
- Create: whole Next.js app at repo root
- Create: `.gitignore`, `next.config.mjs`, `.prettierrc`

- [ ] **Step 1: Scaffold Next.js app into current directory**

Run (from repo root `c:\Users\janin\OneDrive\Escritorio\Mi portfolio`):
```bash
npx create-next-app@latest . --ts --app --eslint --src-dir --import-alias "@/*" --no-tailwind --use-npm --yes
```
Expected: creates `src/app`, `package.json`, `tsconfig.json`. (We add Tailwind v4 manually in Task 3 because create-next-app ships v3.)

If the directory is non-empty and the CLI refuses, move `docs/` and `.superpowers/` aside temporarily, scaffold, then move them back.

- [ ] **Step 2: Initialize git**

Run:
```bash
git init
git add -A
git commit -m "chore: scaffold Next.js app"
```
Expected: first commit created.

- [ ] **Step 3: Configure static export**

Replace `next.config.mjs` (or `.ts`) with:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

- [ ] **Step 4: Add Prettier**

Run:
```bash
npm i -D prettier
```
Create `.prettierrc`:
```json
{ "singleQuote": true, "semi": true, "trailingComma": "all", "printWidth": 100 }
```

- [ ] **Step 5: Verify dev server boots**

Run: `npm run build`
Expected: build succeeds, `out/` directory produced.

- [ ] **Step 6: Commit**
```bash
git add -A
git commit -m "chore: configure static export and prettier"
```

---

### Task 2: Testing setup (Vitest + RTL)

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)
- Test: `src/lib/__tests__/smoke.test.ts`

- [ ] **Step 1: Install deps**
```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**
```ts
import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia; provide a default (no reduced motion, desktop)
window.matchMedia = window.matchMedia || ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia;
```

- [ ] **Step 4: Add scripts to `package.json`**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 5: Write a smoke test** — `src/lib/__tests__/smoke.test.ts`
```ts
import { describe, it, expect } from 'vitest';

describe('test harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run it**

Run: `npm test`
Expected: 1 passing test.

- [ ] **Step 7: Commit**
```bash
git add -A
git commit -m "chore: add vitest + react testing library"
```

---

### Task 3: Tailwind v4 + design tokens + fonts

**Files:**
- Create: `postcss.config.mjs`, `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install Tailwind v4**
```bash
npm i -D tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 2: Create `postcss.config.mjs`**
```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

- [ ] **Step 3: Replace `src/app/globals.css`**
```css
@import 'tailwindcss';

@theme {
  --color-cream: #efe7d8;
  --color-espresso: #1c1916;
  --color-oxblood: #7c2128;
  --color-bone: #f2ede3;

  --font-display: var(--font-archivo);
  --font-body: var(--font-inter);
  --font-label: var(--font-space-grotesk);
}

:root {
  color-scheme: light;
}

html {
  background-color: var(--color-cream);
  color: var(--color-espresso);
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Chrome gradient utility for metallic text */
.text-chrome {
  background: linear-gradient(160deg, #fff 0%, #cfd2d6 18%, #8a9099 38%, #eef1f4 52%, #9aa0a8 68%, #5e636b 84%, #e9ecef 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Wire fonts + globals in `src/app/layout.tsx`**
```tsx
import type { Metadata } from 'next';
import { Archivo, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', weight: ['600', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500', '600'] });

export const metadata: Metadata = {
  title: 'José García (Jochi) — Fullstack Engineer',
  description: 'Portfolio de José Ignacio García Olmos, fullstack / software engineer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Verify build picks up Tailwind**

Replace `src/app/page.tsx` with a temporary check:
```tsx
export default function Home() {
  return <main className="min-h-screen bg-cream text-espresso grid place-items-center">
    <h1 className="font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight text-oxblood">Tailwind OK</h1>
  </main>;
}
```
Run: `npm run dev` and open http://localhost:3000 — expect oxblood bold heading on cream.

- [ ] **Step 6: Commit**
```bash
git add -A
git commit -m "feat: tailwind v4 tokens + fonts"
```

---

## Phase 1 — Hooks & animation primitives

### Task 4: Motion hooks (`useReducedMotion`, `useScrollProgress`)

**Files:**
- Create: `src/lib/hooks/useReducedMotion.ts`, `src/lib/hooks/useScrollProgress.ts`
- Test: `src/lib/hooks/__tests__/useReducedMotion.test.tsx`

- [ ] **Step 1: Write failing test** — `src/lib/hooks/__tests__/useReducedMotion.test.tsx`
```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('useReducedMotion', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('returns false when user has no reduced-motion preference', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when user prefers reduced motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect FAIL** (module not found)

Run: `npm test -- useReducedMotion`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/lib/hooks/useReducedMotion.ts`
```ts
'use client';
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

- [ ] **Step 4: Implement `useScrollProgress`** — `src/lib/hooks/useScrollProgress.ts`
```ts
'use client';
import { useEffect, useState } from 'react';

/** Returns whole-document scroll progress 0..1. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}
```

- [ ] **Step 5: Run test — expect PASS**

Run: `npm test -- useReducedMotion`
Expected: 2 passing.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: motion hooks (reduced-motion, scroll progress)"
```

---

### Task 5: SmoothScroll provider (Lenis)

**Files:**
- Create: `src/components/motion/SmoothScroll.tsx`

- [ ] **Step 1: Install Lenis**
```bash
npm i lenis
```

- [ ] **Step 2: Implement** — `src/components/motion/SmoothScroll.tsx`
```tsx
'use client';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run build`
Expected: build passes (component not yet used, but type-checks).

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: Lenis smooth scroll provider"
```

---

### Task 6: `Reveal` primitive (Framer Motion)

**Files:**
- Create: `src/components/ui/Reveal.tsx`
- Test: `src/components/ui/__tests__/Reveal.test.tsx`

- [ ] **Step 1: Install Framer Motion**
```bash
npm i framer-motion
```

- [ ] **Step 2: Write failing test** — `src/components/ui/__tests__/Reveal.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from '../Reveal';

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal><p>hello jochi</p></Reveal>);
    expect(screen.getByText('hello jochi')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run — expect FAIL**

Run: `npm test -- Reveal`
Expected: FAIL (module not found).

- [ ] **Step 4: Implement** — `src/components/ui/Reveal.tsx`
```tsx
'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Run — expect PASS**

Run: `npm test -- Reveal`
Expected: 1 passing.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: Reveal scroll-in primitive"
```

---

### Task 7: `MagneticButton` primitive

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`
- Test: `src/components/ui/__tests__/MagneticButton.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/ui/__tests__/MagneticButton.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MagneticButton } from '../MagneticButton';

describe('MagneticButton', () => {
  it('renders as a link when href is given', () => {
    render(<MagneticButton href="#proyectos">Ver proyectos</MagneticButton>);
    const link = screen.getByRole('link', { name: 'Ver proyectos' });
    expect(link).toHaveAttribute('href', '#proyectos');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- MagneticButton`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/ui/MagneticButton.tsx`
```tsx
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
```

- [ ] **Step 4: Run — expect PASS**

Run: `npm test -- MagneticButton`
Expected: 1 passing.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: MagneticButton primitive"
```

---

### Task 8: `SectionLabel` and `Chip`

**Files:**
- Create: `src/components/ui/SectionLabel.tsx`, `src/components/ui/Chip.tsx`
- Test: `src/components/ui/__tests__/SectionLabel.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/ui/__tests__/SectionLabel.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionLabel } from '../SectionLabel';

describe('SectionLabel', () => {
  it('shows number and text', () => {
    render(<SectionLabel index={2} text="Proyectos" />);
    expect(screen.getByText(/02/)).toBeInTheDocument();
    expect(screen.getByText(/Proyectos/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- SectionLabel`
Expected: FAIL.

- [ ] **Step 3: Implement** — `src/components/ui/SectionLabel.tsx`
```tsx
export function SectionLabel({ index, text }: { index: number; text: string }) {
  const num = String(index).padStart(2, '0');
  return (
    <span className="font-[family-name:var(--font-label)] text-xs font-semibold uppercase tracking-[0.2em] text-oxblood">
      {num} — {text}
    </span>
  );
}
```

- [ ] **Step 4: Implement** — `src/components/ui/Chip.tsx`
```tsx
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-current/20 px-3 py-1 font-[family-name:var(--font-label)] text-xs opacity-80">
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Run — expect PASS**

Run: `npm test -- SectionLabel`
Expected: 1 passing.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: SectionLabel + Chip ui"
```

---

### Task 9: Custom Cursor

**Files:**
- Create: `src/components/motion/Cursor.tsx`

- [ ] **Step 1: Implement** — `src/components/motion/Cursor.tsx`
```tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    // Only on fine-pointer (desktop) devices
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-oxblood mix-blend-difference"
    />
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 3: Commit**
```bash
git add -A && git commit -m "feat: custom desktop cursor"
```

---

## Phase 2 — Data layer

### Task 10: Types + data files

**Files:**
- Create: `src/data/types.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts`, `src/data/jochi-messages.ts`, `src/data/site.ts`
- Test: `src/data/__tests__/data.test.ts`

- [ ] **Step 1: Create `src/data/types.ts`**
```ts
export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;          // short, for the card
  description: string[];     // long case-study paragraphs
  stack: string[];
  cover: string;             // /images path
  gallery: string[];
  repo?: string;
  demo?: string;
};

export type SkillGroup = {
  category: 'Frontend' | 'Backend' | 'Tools';
  items: string[];
};

export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  description: string;
  kind: 'work' | 'education';
};

export type JochiMessage = {
  /** section anchor id this message is tied to */
  anchor: string;
  text: string;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  nickname: string;
  role: string;
  tagline: string;
  whatsapp: string;   // digits only for wa.me
  instagram: string;  // handle without @
  github: string;     // username
  email: string;
  cvUrl: string;
};
```

- [ ] **Step 2: Create `src/data/site.ts`**
```ts
import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'José García',
  fullName: 'José Ignacio García Olmos',
  nickname: 'Jochi',
  role: 'Fullstack Engineer',
  tagline: 'Construyo productos web de punta a punta, con buen gusto.',
  whatsapp: '542478407856',
  instagram: 'jochigarcia_',
  github: 'JochiG',
  email: 'josegarciaolmos@outlook.com',
  cvUrl: '/cv-jose-garcia.pdf',
};
```

- [ ] **Step 3: Create `src/data/projects.ts`** (placeholder-real content Jose edits later)
```ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'proyecto-uno',
    title: 'Proyecto Uno',
    year: '2025',
    role: 'Fullstack',
    summary: 'App web con pagos y panel de administración.',
    description: [
      'Problema: el cliente necesitaba vender online sin fricción.',
      'Solución: construí una SPA con checkout y un panel para gestionar el catálogo.',
      'Resultado: el flujo de compra bajó de 5 pasos a 2.',
    ],
    stack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    cover: '/images/proyecto-uno/cover.jpg',
    gallery: ['/images/proyecto-uno/1.jpg', '/images/proyecto-uno/2.jpg'],
    repo: 'https://github.com/JochiG',
    demo: undefined,
  },
  {
    slug: 'proyecto-dos',
    title: 'Proyecto Dos',
    year: '2024',
    role: 'Frontend',
    summary: 'Dashboard de datos en tiempo real.',
    description: [
      'Problema: visualizar métricas en vivo de forma clara.',
      'Solución: dashboard con gráficos reactivos y filtros.',
      'Resultado: decisiones más rápidas para el equipo.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind'],
    cover: '/images/proyecto-dos/cover.jpg',
    gallery: ['/images/proyecto-dos/1.jpg'],
    repo: 'https://github.com/JochiG',
    demo: undefined,
  },
];
```

- [ ] **Step 4: Create `src/data/skills.ts`**
```ts
import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Vite', 'Figma'] },
];
```

- [ ] **Step 5: Create `src/data/experience.ts`**
```ts
import type { ExperienceItem } from './types';

export const experience: ExperienceItem[] = [
  { title: 'Fullstack Developer', org: 'Empresa / Freelance', period: '2024 — presente', description: 'Desarrollo de aplicaciones web de punta a punta.', kind: 'work' },
  { title: 'Tecnicatura en Programación', org: 'Institución', period: '2022 — 2024', description: 'Formación en desarrollo de software.', kind: 'education' },
];
```

- [ ] **Step 6: Create `src/data/jochi-messages.ts`**
```ts
import type { JochiMessage } from './types';

// One or more lines Jochi says when each section anchors into view.
export const jochiMessages: JochiMessage[] = [
  { anchor: 'hero', text: '¡Hola! Soy Jochi. Bajá y te cuento quién soy 👋' },
  { anchor: 'about', text: 'Arranqué con la programación por curiosidad y no paré más.' },
  { anchor: 'proyectos', text: 'Tocá cualquier card para ver el detrás de escena 👀' },
  { anchor: 'stack', text: 'Mi combo favorito hoy: Next.js + TypeScript.' },
  { anchor: 'experiencia', text: 'Acá está mi recorrido hasta ahora.' },
  { anchor: 'contacto', text: '¿Trabajamos juntos? Escribime por acá 🤝' },
];
```

- [ ] **Step 7: Write data integrity test** — `src/data/__tests__/data.test.ts`
```ts
import { describe, it, expect } from 'vitest';
import { projects } from '../projects';
import { jochiMessages } from '../jochi-messages';

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it('every project has at least one description paragraph and a cover', () => {
    for (const p of projects) {
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.cover).toMatch(/^\/images\//);
    }
  });
});

describe('jochi messages', () => {
  it('cover the required anchors', () => {
    const anchors = jochiMessages.map((m) => m.anchor);
    for (const a of ['hero', 'about', 'proyectos', 'stack', 'experiencia', 'contacto']) {
      expect(anchors).toContain(a);
    }
  });
});
```

- [ ] **Step 8: Run — expect PASS**

Run: `npm test -- data`
Expected: passing.

- [ ] **Step 9: Add placeholder images dir**

Create empty `public/images/.gitkeep` so paths resolve at build (real images dropped in later). Add `public/cv-jose-garcia.pdf` placeholder note in README.

- [ ] **Step 10: Commit**
```bash
git add -A && git commit -m "feat: data layer (projects, skills, experience, site, jochi messages)"
```

---

## Phase 3 — Sections & page assembly

### Task 11: Navbar

**Files:**
- Create: `src/components/ui/Navbar.tsx`
- Test: `src/components/ui/__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/ui/__tests__/Navbar.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders anchor links', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute('href', '#proyectos');
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '#contacto');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- Navbar`

- [ ] **Step 3: Implement** — `src/components/ui/Navbar.tsx`
```tsx
'use client';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

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
        scrolled ? 'bg-cream/80 py-3 backdrop-blur' : 'py-5'
      }`}
    >
      <a href="#inicio" className="font-semibold text-oxblood">{site.nickname.toLowerCase()}.dev</a>
      <nav className="flex gap-5">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="opacity-70 transition-opacity hover:opacity-100">{l.label}</a>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Run — expect PASS**, then **Commit**
```bash
npm test -- Navbar
git add -A && git commit -m "feat: Navbar"
```

---

### Task 12: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Test: `src/components/sections/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/Hero.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('plays with the nickname and shows the full legal name', () => {
    render(<Hero />);
    expect(screen.getByText(/Jochi/)).toBeInTheDocument();
    expect(screen.getByText(/José Ignacio García Olmos/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- Hero`

- [ ] **Step 3: Implement** — `src/components/sections/Hero.tsx`
```tsx
import { site } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col justify-center px-6 md:px-16">
      <span className="font-[family-name:var(--font-label)] text-xs font-semibold uppercase tracking-[0.2em] text-oxblood">
        {site.role}
      </span>
      <h1 className="mt-4 font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-tight">
        <span className="block text-base font-semibold normal-case tracking-normal opacity-55">me dicen</span>
        <span className="block text-7xl font-black md:text-8xl">
          {site.nickname}<span className="text-oxblood">.</span>
        </span>
        <span className="mt-2 block text-base font-semibold normal-case tracking-normal opacity-55">
          — pero en el DNI dice {site.fullName}
        </span>
      </h1>
      <p className="mt-6 max-w-md font-[family-name:var(--font-body)] text-lg opacity-65">{site.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {['React', 'Next.js', 'TypeScript', 'Node'].map((s) => <Chip key={s}>{s}</Chip>)}
      </div>
      <div className="mt-10">
        <MagneticButton href="#proyectos">Ver proyectos →</MagneticButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run — expect PASS**, **Commit**
```bash
npm test -- Hero
git add -A && git commit -m "feat: Hero section"
```

---

### Task 13: About section

**Files:**
- Create: `src/components/sections/About.tsx`
- Test: `src/components/sections/__tests__/About.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/About.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('renders a heading and the photo with alt text', () => {
    render(<About />);
    expect(screen.getByRole('img', { name: /José/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement — `src/components/sections/About.tsx`
```tsx
import Image from 'next/image';
import { site } from '@/data/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-16">
      <SectionLabel index={1} text="Sobre mí" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px] md:items-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold md:text-4xl">
            Un poco sobre mí
          </h2>
          <p className="mt-5 max-w-prose font-[family-name:var(--font-body)] text-lg leading-relaxed opacity-75">
            Soy {site.name}, fullstack engineer. Me apasiona construir productos web prolijos,
            rápidos y con buen gusto. Disfruto tanto del detalle visual como de una API bien
            pensada. Busco sumarme a un equipo donde pueda crecer y aportar.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/images/jose.jpg"
            alt="Foto de José García (Jochi)"
            width={320}
            height={400}
            className="rounded-2xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add placeholder photo** — drop any image at `public/images/jose.jpg` (Jose replaces later). For now create a 1x1 placeholder so build/test pass.

- [ ] **Step 4: Run — expect PASS**, **Commit**
```bash
npm test -- About
git add -A && git commit -m "feat: About section"
```

---

### Task 14: ProjectCard + Projects section

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`, `src/components/sections/Projects.tsx`
- Test: `src/components/sections/__tests__/Projects.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/Projects.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from '../Projects';
import { projects } from '@/data/projects';

describe('Projects', () => {
  it('renders a clickable card linking to each project detail page', () => {
    render(<Projects />);
    for (const p of projects) {
      const link = screen.getByRole('link', { name: new RegExp(p.title, 'i') });
      expect(link).toHaveAttribute('href', `/proyectos/${p.slug}/`);
    }
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/components/ui/ProjectCard.tsx`
```tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link
        href={`/proyectos/${project.slug}/`}
        className="group block overflow-hidden rounded-2xl border border-bone/15 bg-espresso/40"
        aria-label={`Ver proyecto ${project.title}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image src={project.cover} alt={project.title} width={640} height={360} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{project.title}</h3>
          <p className="mt-1 text-sm opacity-70">{project.summary}</p>
          <p className="mt-3 font-[family-name:var(--font-label)] text-xs opacity-50">{project.stack.join(' · ')}</p>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 3: Implement** — `src/components/sections/Projects.tsx`
```tsx
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function Projects() {
  return (
    <section id="proyectos" className="bg-espresso px-6 py-28 text-bone md:px-16">
      <SectionLabel index={2} text="Proyectos" />
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold">Proyectos destacados</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run — expect PASS**, **Commit**
```bash
npm test -- Projects
git add -A && git commit -m "feat: Projects section + ProjectCard"
```

---

### Task 15: Skills section

**Files:**
- Create: `src/components/sections/Skills.tsx`
- Test: `src/components/sections/__tests__/Skills.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/Skills.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from '../Skills';

describe('Skills', () => {
  it('renders category headings', () => {
    render(<Skills />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/components/sections/Skills.tsx`
```tsx
import { skills } from '@/data/skills';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { Chip } from '@/components/ui/Chip';

export function Skills() {
  return (
    <section id="stack" className="px-6 py-28 md:px-16">
      <SectionLabel index={3} text="Stack" />
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold">Tecnologías</h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08}>
            <h3 className="font-[family-name:var(--font-label)] text-sm font-semibold uppercase tracking-[0.2em] text-oxblood">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run — expect PASS**, **Commit**
```bash
npm test -- Skills
git add -A && git commit -m "feat: Skills section"
```

---

### Task 16: Experience section

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Test: `src/components/sections/__tests__/Experience.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/Experience.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from '../Experience';
import { experience } from '@/data/experience';

describe('Experience', () => {
  it('renders each timeline item title', () => {
    render(<Experience />);
    for (const item of experience) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/components/sections/Experience.tsx`
```tsx
import { experience } from '@/data/experience';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function Experience() {
  return (
    <section id="experiencia" className="px-6 py-28 md:px-16">
      <SectionLabel index={4} text="Experiencia" />
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold">Trayectoria</h2>
      <ol className="mt-12 border-l-2 border-espresso/20 pl-6">
        {experience.map((item, i) => (
          <Reveal key={`${item.title}-${i}`} delay={i * 0.08}>
            <li className="mb-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{item.title}</h3>
                <span className="font-[family-name:var(--font-label)] text-xs opacity-55">{item.period}</span>
              </div>
              <p className="text-sm font-semibold text-oxblood">{item.org}</p>
              <p className="mt-2 max-w-prose text-sm opacity-70">{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 3: Run — expect PASS**, **Commit**
```bash
npm test -- Experience
git add -A && git commit -m "feat: Experience timeline"
```

---

### Task 17: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Test: `src/components/sections/__tests__/Contact.test.tsx`

- [ ] **Step 1: Write failing test** — `src/components/sections/__tests__/Contact.test.tsx`
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact', () => {
  it('links to whatsapp, instagram, github and email', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', 'https://wa.me/542478407856');
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', 'https://instagram.com/jochigarcia_');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/JochiG');
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:josegarciaolmos@outlook.com');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/components/sections/Contact.tsx`
```tsx
import { site } from '@/data/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Contact() {
  const links = [
    { name: 'WhatsApp', href: `https://wa.me/${site.whatsapp}` },
    { name: 'Instagram', href: `https://instagram.com/${site.instagram}` },
    { name: 'GitHub', href: `https://github.com/${site.github}` },
    { name: 'Email', href: `mailto:${site.email}` },
  ];
  return (
    <section id="contacto" className="bg-espresso px-6 py-32 text-center text-bone md:px-16">
      <SectionLabel index={5} text="Contacto" />
      <h2 className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight">
        Trabajemos juntos
      </h2>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {links.map((l) => (
          <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className="font-[family-name:var(--font-label)] text-sm underline-offset-4 hover:underline">
            {l.name}
          </a>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <MagneticButton href={site.cvUrl} className="border-bone text-bone hover:bg-bone hover:text-espresso">
          Descargar CV →
        </MagneticButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run — expect PASS**, **Commit**
```bash
npm test -- Contact
git add -A && git commit -m "feat: Contact section"
```

---

### Task 18: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Implement** — `src/components/sections/Footer.tsx`
```tsx
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-espresso px-6 py-10 text-bone/60 md:px-16">
      <div className="flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
        <span>© {new Date().getFullYear()} {site.fullName}</span>
        <a href={`https://github.com/${site.github}`} target="_blank" rel="noreferrer" className="hover:text-bone">
          Hecho por {site.nickname} · GitHub
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**, **Commit**
```bash
npm run build
git add -A && git commit -m "feat: Footer"
```

---

### Task 19: Assemble home page + layout providers

**Files:**
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**
```tsx
import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add SmoothScroll + Cursor to `src/app/layout.tsx`**

Wrap `{children}` in body:
```tsx
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';
// ...inside <body>:
<body>
  <Cursor />
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

- [ ] **Step 3: Run full app**

Run: `npm run dev` → open http://localhost:3000. Verify all sections render, smooth scroll works, sections alternate cream/espresso.

- [ ] **Step 4: Run all tests + build**
```bash
npm test
npm run build
```
Expected: all green, `out/` generated.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: assemble home page with providers"
```

---

## Phase 4 — "Jochi" the chrome 3D assistant

### Task 20: ChromeOrb mesh + material

**Files:**
- Create: `src/components/three/ChromeOrb.tsx`

- [ ] **Step 1: Install 3D deps**
```bash
npm i three @react-three/fiber @react-three/drei
npm i -D @types/three
```

- [ ] **Step 2: Implement** — `src/components/three/ChromeOrb.tsx`
```tsx
'use client';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

type Props = { position: [number, number, number]; rotation: [number, number, number] };

export function ChromeOrb({ position, rotation }: Props) {
  const ref = useRef<Mesh>(null);
  // subtle idle spin layered on top of scroll-driven rotation
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <>
      <Environment preset="studio" />
      <mesh ref={ref} position={position} rotation={rotation}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial metalness={1} roughness={0.08} color="#cfd2d6" envMapIntensity={1.5} />
      </mesh>
    </>
  );
}
```
> Note: `MeshTransmissionMaterial` import kept available if a glassier look is preferred later; current build uses chrome `meshStandardMaterial`. Remove the unused import if lint complains.

- [ ] **Step 3: Verify build** (component not yet mounted)

Run: `npm run build`
Expected: passes.

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: ChromeOrb mesh"
```

---

### Task 21: `useJochiPath` interpolation (pure + hook)

**Files:**
- Create: `src/components/jochi/path.ts` (pure), `src/components/jochi/useJochiPath.ts` (hook)
- Test: `src/components/jochi/__tests__/path.test.ts`

- [ ] **Step 1: Write failing test** — `src/components/jochi/__tests__/path.test.ts`
```ts
import { describe, it, expect } from 'vitest';
import { interpolatePath, type Anchor } from '../path';

const anchors: Anchor[] = [
  { at: 0, position: [0, 0, 0], rotation: [0, 0, 0] },
  { at: 1, position: [10, -10, 0], rotation: [0, 6.28, 0] },
];

describe('interpolatePath', () => {
  it('returns the first anchor at progress 0', () => {
    const r = interpolatePath(0, anchors);
    expect(r.position).toEqual([0, 0, 0]);
  });
  it('returns the last anchor at progress 1', () => {
    const r = interpolatePath(1, anchors);
    expect(r.position).toEqual([10, -10, 0]);
  });
  it('linearly interpolates at the midpoint', () => {
    const r = interpolatePath(0.5, anchors);
    expect(r.position[0]).toBeCloseTo(5);
    expect(r.position[1]).toBeCloseTo(-5);
  });
  it('clamps out-of-range progress', () => {
    expect(interpolatePath(-1, anchors).position).toEqual([0, 0, 0]);
    expect(interpolatePath(2, anchors).position).toEqual([10, -10, 0]);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- path`

- [ ] **Step 3: Implement** — `src/components/jochi/path.ts`
```ts
export type Vec3 = [number, number, number];
export type Anchor = { at: number; position: Vec3; rotation: Vec3 };
export type PathPose = { position: Vec3; rotation: Vec3 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function interpolatePath(progress: number, anchors: Anchor[]): PathPose {
  const p = clamp01(progress);
  const sorted = [...anchors].sort((a, b) => a.at - b.at);
  let lo = sorted[0];
  let hi = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (p >= sorted[i].at && p <= sorted[i + 1].at) {
      lo = sorted[i];
      hi = sorted[i + 1];
      break;
    }
  }
  const span = hi.at - lo.at || 1;
  const t = clamp01((p - lo.at) / span);
  const mix = (a: Vec3, b: Vec3): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  return { position: mix(lo.position, hi.position), rotation: mix(lo.rotation, hi.rotation) };
}

// Default flight path across the page (tweak visually during integration).
export const jochiAnchors: Anchor[] = [
  { at: 0.0, position: [2.2, 0, 0], rotation: [0, 0, 0] },
  { at: 0.2, position: [-2.2, -0.5, 0], rotation: [0.3, 1.6, 0] },
  { at: 0.45, position: [2.4, 0.3, -1], rotation: [0, 3.1, 0.2] },
  { at: 0.7, position: [-2.0, 0, 0], rotation: [0.2, 4.7, 0] },
  { at: 1.0, position: [0, -0.4, 0.5], rotation: [0, 6.28, 0] },
];
```

- [ ] **Step 4: Implement hook** — `src/components/jochi/useJochiPath.ts`
```ts
'use client';
import { interpolatePath, jochiAnchors, type PathPose } from './path';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';

export function useJochiPath(): PathPose {
  const progress = useScrollProgress();
  return interpolatePath(progress, jochiAnchors);
}
```

- [ ] **Step 5: Run — expect PASS**

Run: `npm test -- path`
Expected: 4 passing.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: useJochiPath scroll interpolation"
```

---

### Task 22: `JochiScene` persistent canvas

**Files:**
- Create: `src/components/three/JochiScene.tsx`

- [ ] **Step 1: Implement** — `src/components/three/JochiScene.tsx`
```tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { ChromeOrb } from './ChromeOrb';
import { useJochiPath } from '@/components/jochi/useJochiPath';

function OrbDriver() {
  const pose = useJochiPath();
  return <ChromeOrb position={pose.position} rotation={pose.rotation} />;
}

export function JochiScene() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <OrbDriver />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**, **Commit**
```bash
npm run build
git add -A && git commit -m "feat: JochiScene persistent canvas"
```

---

### Task 23: `DialogueBubble` + `useJochiMessages` + `JochiAssistant`

**Files:**
- Create: `src/components/jochi/DialogueBubble.tsx`, `src/components/jochi/useJochiMessages.ts`, `src/components/jochi/JochiAssistant.tsx`
- Test: `src/components/jochi/__tests__/useJochiMessages.test.ts`

- [ ] **Step 1: Write failing test** — `src/components/jochi/__tests__/useJochiMessages.test.ts`
```ts
import { describe, it, expect } from 'vitest';
import { pickMessage } from '../useJochiMessages';
import { jochiMessages } from '@/data/jochi-messages';

describe('pickMessage', () => {
  it('returns the message for the active anchor', () => {
    expect(pickMessage('about', jochiMessages)?.anchor).toBe('about');
  });
  it('returns null for an unknown anchor', () => {
    expect(pickMessage('nope', jochiMessages)).toBeNull();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/components/jochi/useJochiMessages.ts`
```ts
'use client';
import { useEffect, useState } from 'react';
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
  const anchors = jochiMessages.map((m) => m.anchor);
  const active = useActiveAnchor(anchors);
  return pickMessage(active, jochiMessages);
}
```

- [ ] **Step 3: Implement** — `src/components/jochi/DialogueBubble.tsx`
```tsx
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
```

- [ ] **Step 4: Implement** — `src/components/jochi/JochiAssistant.tsx`
```tsx
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
    // 3D only on desktop fine-pointer, non-reduced-motion
    setIs3D(window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768);
  }, []);

  if (reduced) return null; // static fallback: no orb, no bubbles

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
```

- [ ] **Step 5: Run — expect PASS**

Run: `npm test -- useJochiMessages`
Expected: 2 passing.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: Jochi assistant (bubbles + mute + lazy 3D)"
```

---

### Task 24: Mount Jochi + static fallback image

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `public/images/jochi-static.png` (chrome orb still image, used by reduced-motion/mobile fallback)

- [ ] **Step 1: Mount in layout** — add inside `<body>` before `SmoothScroll`:
```tsx
import { JochiAssistant } from '@/components/jochi/JochiAssistant';
// ...
<body>
  <Cursor />
  <JochiAssistant />
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

- [ ] **Step 2: Add reduced-motion static orb in Hero**

In `src/components/sections/Hero.tsx`, add a static chrome image visible only when JS/3D is off or reduced-motion — append before closing `</section>`:
```tsx
<div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 motion-reduce:block">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src="/images/jochi-static.png" alt="" className="h-40 w-40" />
</div>
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev`. Verify:
- Desktop: chrome orb flies across page as you scroll; bubbles change per section; mute button hides bubbles.
- Emulate reduced motion (DevTools → Rendering → prefers-reduced-motion: reduce): orb canvas gone, static image shows, no bubbles.
- Mobile viewport (≤767px): no 3D canvas (bubbles still allowed); layout intact.

- [ ] **Step 4: Run all tests + build**
```bash
npm test
npm run build
```
Expected: green; `out/` built.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: mount Jochi + reduced-motion/mobile fallbacks"
```

---

## Phase 5 — Project detail pages

### Task 25: `/proyectos/[slug]` static pages

**Files:**
- Create: `src/app/proyectos/[slug]/page.tsx`
- Create: `src/lib/projects.ts` (lookup helpers)
- Test: `src/lib/__tests__/projects.test.ts`

- [ ] **Step 1: Write failing test** — `src/lib/__tests__/projects.test.ts`
```ts
import { describe, it, expect } from 'vitest';
import { getProjectBySlug, getAdjacentProjects } from '../projects';

describe('project lookup', () => {
  it('finds a project by slug', () => {
    expect(getProjectBySlug('proyecto-uno')?.title).toBe('Proyecto Uno');
  });
  it('returns prev/next neighbours', () => {
    const { prev, next } = getAdjacentProjects('proyecto-uno');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('proyecto-dos');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**, then implement `src/lib/projects.ts`
```ts
import { projects } from '@/data/projects';
import type { Project } from '@/data/types';

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
}
```

- [ ] **Step 3: Run — expect PASS**

Run: `npm test -- projects`
Expected: 2 passing.

- [ ] **Step 4: Implement page** — `src/app/proyectos/[slug]/page.tsx`
```tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { getProjectBySlug, getAdjacentProjects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — José García (Jochi)`,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="px-6 py-24 md:px-16">
      <Link href="/#proyectos" className="font-[family-name:var(--font-label)] text-sm text-oxblood">← volver</Link>

      <header className="mt-8">
        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-oxblood">
          {project.role} · {project.year}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 font-[family-name:var(--font-label)] text-sm opacity-60">{project.stack.join(' · ')}</p>
      </header>

      <div className="mt-10 max-w-prose space-y-4 text-lg leading-relaxed opacity-80">
        {project.description.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-8 flex gap-4">
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="text-oxblood underline-offset-4 hover:underline">Repositorio</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-oxblood underline-offset-4 hover:underline">Demo en vivo</a>}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {project.gallery.map((src, i) => (
          <Image key={i} src={src} alt={`${project.title} captura ${i + 1}`} width={800} height={500} className="rounded-2xl object-cover" />
        ))}
      </div>

      <nav className="mt-16 flex justify-between border-t border-espresso/15 pt-6 font-[family-name:var(--font-label)] text-sm">
        {prev ? <Link href={`/proyectos/${prev.slug}/`} className="hover:text-oxblood">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/proyectos/${next.slug}/`} className="hover:text-oxblood">{next.title} →</Link> : <span />}
      </nav>
    </main>
  );
}
```

- [ ] **Step 5: Build to confirm static params export pages**

Run: `npm run build`
Expected: `out/proyectos/proyecto-uno/index.html` and `proyecto-dos` generated.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: static project detail pages with prev/next"
```

---

## Phase 6 — SEO, accessibility, polish

### Task 26: Metadata, OG, sitemap, robots

**Files:**
- Modify: `src/app/layout.tsx` (richer metadata + metadataBase)
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Create: `public/og.png` (1200×630 social card — placeholder, Jose replaces)

- [ ] **Step 1: Enrich `metadata` in `layout.tsx`**
```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://jochi-garcia.vercel.app'),
  title: 'José García (Jochi) — Fullstack Engineer',
  description: 'Portfolio de José Ignacio García Olmos, fullstack / software engineer.',
  openGraph: {
    title: 'José García (Jochi) — Fullstack Engineer',
    description: 'Construyo productos web de punta a punta, con buen gusto.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};
```

- [ ] **Step 2: Create `src/app/sitemap.ts`**
```ts
import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const base = 'https://jochi-garcia.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    ...projects.map((p) => ({ url: `${base}/proyectos/${p.slug}/`, priority: 0.7 })),
  ];
}
```

- [ ] **Step 3: Create `src/app/robots.ts`**
```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://jochi-garcia.vercel.app/sitemap.xml',
  };
}
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `out/sitemap.xml` and `out/robots.txt` present.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: SEO metadata, OG, sitemap, robots"
```

---

### Task 27: Accessibility & design-guidelines pass

**Files:** touch components as needed.

- [ ] **Step 1: Invoke the `web-design-guidelines` skill** and review the rendered site against its checklist (focus states, contrast, motion, semantics).

- [ ] **Step 2: Apply fixes.** Concretely verify/repair:
  - Visible focus ring on all links/buttons: add to `globals.css`:
    ```css
    a:focus-visible, button:focus-visible { outline: 2px solid var(--color-oxblood); outline-offset: 3px; }
    ```
  - Every `<Image>`/`<img>` has meaningful `alt` (decorative ones `alt=""`).
  - Contrast: confirm cream/espresso and bone/espresso pass AA (they do at full opacity; avoid text below `opacity-60` for body copy).
  - All sections reachable by keyboard; navbar links use real anchors (they do).
  - `JochiScene` canvas marked `aria-hidden` (it is) and `pointer-events-none` (it is).

- [ ] **Step 3: Run tests + build**
```bash
npm test
npm run build
```

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "a11y: focus states, alt text, contrast pass"
```

---

### Task 28: Final verification & deploy prep

**Files:**
- Create: `README.md` (how to edit data, add images, deploy)

- [ ] **Step 1: Write `README.md`** documenting:
  - How to add a project (edit `src/data/projects.ts`, drop images in `public/images/<slug>/`).
  - How to replace the photo (`public/images/jose.jpg`), CV (`public/cv-jose-garcia.pdf`), OG (`public/og.png`), and Jochi static fallback (`public/images/jochi-static.png`).
  - How to edit Jochi's lines (`src/data/jochi-messages.ts`).
  - Commands: `npm run dev`, `npm test`, `npm run build` (outputs `out/`).
  - Deploy: push to GitHub, import in Vercel (framework auto-detected; no env vars).

- [ ] **Step 2: Full local verification**

Run:
```bash
npm test
npm run build
npx serve out
```
Open the served URL and click through: home scroll, Jochi flight + bubbles + mute, each project detail page, prev/next nav, all contact links, CV button.

- [ ] **Step 3: Lighthouse**

Run Lighthouse (Chrome DevTools) on the served `out/` build. Target 90+ in Performance, Accessibility, Best Practices, SEO. Note any sub-90 category and fix obvious wins (image sizes, alt text, color contrast).

- [ ] **Step 4: Final commit**
```bash
git add -A && git commit -m "docs: README + final verification"
```

- [ ] **Step 5: (When Jose is ready) push & deploy**
```bash
git branch -M main
# create the GitHub repo, then:
# git remote add origin git@github.com:JochiG/<repo>.git
# git push -u origin main
```
Then import the repo at vercel.com — static export deploys automatically.

---

## Self-Review notes (verified against spec)

- **Spec coverage:** stack (T1–T3), tokens/fonts (T3), Jochi persistent+fluid 3D (T20–T24), bubbles+mute+fallbacks (T23–T24), all 8 sections (T11–T19), nickname play + full name (T12), clickable project cards → detail pages (T14, T25), prev/next (T25), real contact data (T17), animation primitives & smooth scroll & cursor (T5–T9), reduced-motion/mobile degradation (throughout), SEO/OG/sitemap/robots (T26), a11y (T27), Lighthouse (T28). ✅
- **Pending real assets (Jose provides):** `public/images/jose.jpg`, per-project images, `public/images/jochi-static.png`, `public/cv-jose-garcia.pdf`, `public/og.png`. Build uses placeholders until then.
- **Type consistency:** `Project`, `SkillGroup`, `ExperienceItem`, `JochiMessage`, `SiteConfig`, `Anchor/PathPose`, `interpolatePath`, `getProjectBySlug`, `getAdjacentProjects`, `pickMessage`, `useJochiMessage` referenced consistently across tasks. ✅

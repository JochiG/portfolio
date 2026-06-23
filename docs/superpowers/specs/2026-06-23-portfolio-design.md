# Portfolio de José García (Jochi) — Diseño

**Fecha:** 2026-06-23
**Tipo:** Sitio web personal (frontend, sin backend)
**Estado:** Aprobado para implementación

## 1. Objetivo y audiencia

Portfolio personal de Jose Garcia (Jochi), **fullstack / software engineer**, orientado a reclutadores
y a demostrar habilidad frontend a través del propio sitio. El portfolio *es* la mejor pieza:
debe verse pulido, con personalidad propia (no plantilla genérica) y con animaciones
"show-off" que evidencien skill, manteniendo profesionalismo y performance.

**Criterios de éxito:**
- Se siente diseñado por una persona con gusto, no generado por IA.
- Carga rápida (Lighthouse 90+ en Performance, Accesibilidad, SEO).
- Animaciones impactantes que degradan con elegancia en mobile y con `prefers-reduced-motion`.
- Fácil de actualizar: agregar un proyecto = editar un archivo de datos.

## 2. Stack técnico

- **Next.js 15 (App Router)** con **TypeScript**, exportado como sitio estático
  (`output: 'export'`). Frontend puro, sin backend ni base de datos.
- **Tailwind CSS v4** con design tokens propios (paleta Oxblood, tipografías, espaciado).
- **Contenido en archivos de datos locales** (`/src/data/*.ts`): proyectos, skills,
  experiencia. Tipados con interfaces TS. Editar el array actualiza la web.
- **Deploy:** Vercel (o Netlify) — push a GitHub y deploy automático, gratis.
- Tooling: ESLint + Prettier, estructura de componentes con composición limpia.

## 3. Identidad visual

### Paleta — "Oxblood"
| Token | Valor | Uso |
|-------|-------|-----|
| `cream` | `#efe7d8` | Fondo principal (secciones claras) |
| `espresso` | `#1c1916` | Texto sobre crema / fondo de secciones oscuras |
| `oxblood` | `#7c2128` | Acento de firma (labels, links, detalles, el punto del nombre) |
| `bone` | `#f2ede3` | Texto/elementos sobre fondo oscuro |
| `chrome` | gradiente plata `#fff→#8a9099→#5e636b` | Elemento 3D cromado y detalles metálicos |

**Ritmo claro/oscuro:** la web es mayormente clara (crema); algunas secciones se invierten
a fondo espresso para dar drama y separar bloques (ej. Proyectos o Contacto en oscuro).

### Tipografía (todo sans, sin serif)
- **Archivo** (700–900) — titulares, en mayúsculas, bien bold, tracking negativo.
- **Inter** (400–500) — cuerpo de texto y descripciones.
- **Space Grotesk** (600) — labels pequeños tipo `01 — PROYECTOS`, en mayúsculas con tracking.

Fuentes vía `next/font` (self-hosted, sin layout shift).

### Elemento estrella: "Jochi", el asistente cromado
Una esfera metálica cromada renderizada con **React Three Fiber + drei**, con material
reflectante (environment map). No es solo decoración: es **"Jochi"**, un asistente con
personalidad que acompaña al visitante durante el scroll y va soltando datos sobre Jose
(su historia, proyectos, stack). Ata el sitio con el apodo del autor.

Comportamiento:
- **Una sola escena 3D persistente** (canvas R3F fijo/pinneado sobre toda la página). Jochi
  **nunca aparece ni desaparece**: viaja de forma **fluida y continua** a medida que se
  scrollea, deslizándose entre puntos de anclaje definidos por sección. Está siempre presente.
- Su **posición y rotación se interpolan según el progreso del scroll** (`useScroll` +
  `lerp`/spring), de modo que el movimiento es suave y se luce el 3D (rota mostrando reflejos
  y caras mientras se desplaza). Es el hilo conductor visual de toda la página.
- En cada **punto de anclaje** (al alinearse con una sección) muestra un **globo de diálogo**
  con un comentario contextual: en About algo personal, en Proyectos comenta un proyecto, en
  Stack su tech favorito, etc. Solo el globo aparece/desaparece — el orbe sigue su recorrido.
  Los mensajes salen de un array editable en `/src/data/jochi-messages.ts`.
- Reacciona también al **mouse** (rotación/parallax sutil adicional sobre el movimiento de scroll).
- **Botón "silenciar / cerrar Jochi"** siempre visible — el asistente es descartable (oculta
  los globos; opcionalmente también el orbe).
- **No tapa contenido** ni bloquea clicks (pointer-events controlados; canvas detrás del contenido).
- Versión **discreta en mobile** (orbe más chico, recorrido simplificado, comentarios acotados) y
  se **desactiva** con `prefers-reduced-motion` (cae a imagen estática sin recorrido ni globos).
- Carga **lazy** (dynamic import, sin SSR) para no bloquear el render inicial.

## 4. Estructura de la página

Single-page con scroll + páginas de detalle de proyecto. Orden:

1. **Navbar** sticky, minimal: logo/nombre a la izquierda, links de ancla
   (inicio · proyectos · stack · contacto) a la derecha. Se compacta al scrollear.
2. **Hero** — label, **juego con el apodo**: "me dicen **Jochi.**" (punto en oxblood) +
   "pero en el DNI dice José Ignacio García Olmos". Subtítulo, Jochi (orbe cromado) que se
   presenta e inicia su recorrido, CTA a proyectos. Chips de stack opcionales.
3. **About** — párrafo de historia + **foto de Jose** (pendiente: conseguir/tomar la foto).
   Fade + slide al entrar en viewport.
4. **Proyectos** — grid de cards. Cada card es **clickeable** y lleva a su página de detalle.
   Hover con efecto magnético / lift. Posible sección en fondo oscuro.
5. **Skills / Stack** — tecnologías agrupadas (frontend, backend, tools), como chips/badges.
6. **Experiencia** — timeline vertical (roles + educación) con reveals escalonados.
7. **Contacto** — CTA grande + datos reales:
   - WhatsApp: `+54 2478 407856` (link `wa.me`)
   - Instagram: [@jochigarcia_](https://instagram.com/jochigarcia_)
   - GitHub: [JochiG](https://github.com/JochiG)
   - Mail: `josegarciaolmos@outlook.com`
   - Botón descargar CV.
8. **Footer** — créditos, link al repo, año.

### Páginas de detalle de proyecto — `/proyectos/[slug]`
Generadas estáticamente (`generateStaticParams`) desde el array de proyectos. Cada una:
- Título, año, rol, stack usado.
- Descripción larga / case study (problema → solución → resultado).
- Galería de imágenes/screenshots (`next/image`).
- Links a repo y demo en vivo.
- Navegación a proyecto anterior/siguiente.
- Transición suave desde la card al entrar.

## 5. Sistema de animación (nivel show-off)

| Herramienta | Uso |
|-------------|-----|
| **Framer Motion** | Reveals on-scroll, stagger en grids/listas, hover magnético en botones y cards, transiciones de página/route, parallax de elementos. |
| **Lenis** | Smooth scroll suave en toda la página. |
| **React Three Fiber + drei** | Esfera cromada 3D del hero. |
| **Cursor custom** | Cursor magnético/seguidor en desktop (oculto en touch). |
| **Scroll-driven** | Labels numéricos y titulares con parallax suave vía `useScroll`. |

**Accesibilidad de animación (obligatorio):**
- Todo respeta `prefers-reduced-motion`: cae a fades simples o sin movimiento.
- 3D y cursor custom solo en desktop con puntero fino.
- Foco visible siempre, navegación por teclado, contraste AA (validar crema/espresso/oxblood).

## 6. Arquitectura de componentes

Cada sección es un componente aislado, testeable y de responsabilidad única:

```
src/
  app/
    layout.tsx              # fuentes, metadata global, providers (Lenis, cursor)
    page.tsx                # ensambla las secciones del home
    proyectos/[slug]/page.tsx   # detalle de proyecto (static params)
  components/
    sections/   Hero, About, Projects, Skills, Experience, Contact, Footer
    ui/         Navbar, ProjectCard, Chip, MagneticButton, SectionLabel, Reveal
    three/      JochiScene (canvas R3F persistente/fijo), ChromeOrb (mesh + material)
    jochi/      JochiAssistant (orquesta recorrido + globos + mute), DialogueBubble,
                useJochiPath (interpola posición/rotación por scroll), useJochiMessages
    motion/     Cursor, SmoothScroll (Lenis provider)
  data/         projects.ts, skills.ts, experience.ts, jochi-messages.ts, site.ts  (+ tipos)
  lib/          utils, hooks (useReducedMotion, useScrollProgress)
  styles/       tokens / theme (Tailwind v4 @theme)
```

Primitivas reutilizables (`Reveal`, `MagneticButton`, `SectionLabel`) encapsulan la lógica
de animación para que las secciones queden declarativas y limpias.

## 7. Performance y SEO

- `next/image` para todas las imágenes; lazy-load del bundle 3D.
- Code-splitting; el 3D no entra en el bundle inicial.
- Metadata + Open Graph + Twitter cards por página (home y cada proyecto).
- `sitemap.xml` y `robots.txt` generados.
- Objetivo Lighthouse 90+ en las cuatro categorías.

## 8. Best practices aplicadas (skills disponibles)

- **vercel-react-best-practices** — patrones de performance React/Next.
- **vercel-composition-patterns** — composición de componentes, evitar prop-drilling.
- **tailwind-v4-shadcn** — setup correcto de Tailwind v4 y tokens.
- **web-design-guidelines** — checklist de accesibilidad/UX antes de cerrar.

## 9. Fuera de alcance (YAGNI)

- Sin backend, CMS, base de datos ni autenticación.
- Sin formulario de contacto con envío (solo links mailto / redes). Se puede sumar después
  con un servicio externo si se quiere.
- Sin blog (se puede agregar como sub-proyecto futuro).
- Sin internacionalización (un solo idioma).
- Sin toggle dark/light: el ritmo claro/oscuro es parte fija del diseño.

<div align="center">

# José García · **Jochi** — Portfolio

Portfolio personal de **José Ignacio García Olmos** (Jochi), fullstack developer.
Estático, animado y construido para verse bien y cargar rápido.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/React_Three_Fiber-black?logo=threedotjs&logoColor=white)](https://r3f.docs.pmnd.rs/)
[![Tests](https://img.shields.io/badge/tests-24%20passing-3fb950)](#%EF%B8%8F-desarrollo)

</div>

---

## ✨ Sobre el proyecto

Un portfolio de una sola página (con páginas de detalle por proyecto) pensado como
**la propia carta de presentación técnica**: estética cuidada, animaciones "show-off"
y buena performance. Frontend puro, sin backend.

La estrella es **Jochi**: un orbe cromado en 3D que **viaja de forma continua a medida que
scrolleás**, va comentando cosas sobre mí por sección, se puede silenciar, y degrada con
elegancia en mobile y con `prefers-reduced-motion`.

## 🧩 Stack

| Capa | Tecnologías |
|------|-------------|
| **Framework** | Next.js 16 (App Router), exportado 100% estático |
| **Lenguaje** | TypeScript |
| **Estilos** | Tailwind CSS v4 (design tokens propios — paleta "Oxblood") |
| **Animación** | Framer Motion · Lenis (smooth scroll) · cursor custom |
| **3D** | React Three Fiber + drei (el orbe cromado "Jochi") |
| **Testing** | Vitest + React Testing Library (24 tests) |
| **Deploy** | Vercel (export estático) |

## 🎨 Identidad

- **Paleta Oxblood:** crema `#efe7d8`, espresso `#1c1916`, rojo vino `#7c2128`, hueso `#f2ede3`.
- **Tipografías:** Archivo (titulares), Inter (texto), Space Grotesk (labels).
- Página clara con secciones oscuras intercaladas para dar ritmo.

## 🗂️ Secciones

`Hero` · `Sobre mí` · `Proyectos` (cards clickeables → caso de estudio) · `Stack` (slider de
logos) · `Experiencia` · `Contacto` (WhatsApp · LinkedIn · GitHub · Instagram · email + CV ES/EN).

## 🚀 Proyectos incluidos

- **Beacon AI** — SaaS CRM para inmobiliarias con IA · [beacon-ia.com](https://beacon-ia.com)
- **NS Inversiones** — sitio a medida para analista económico · [nsinversiones.com](https://nsinversiones.com)
- **Paolo Masajes** — web con Google Calendar + Maps · [paolomasajes.com](https://paolomasajes.com)
- **Naturave** — sistema de gestión (inventario, ventas, caja)
- **Subastas+** — app móvil de subastas (React Native + Expo)

## 🛠️ Desarrollo

```bash
npm install        # instalar dependencias
npm run dev        # servidor local en http://localhost:3000
npm test           # correr los tests (Vitest)
npm run build      # build estático → carpeta out/
npx serve out      # previsualizar el build estático
```

## ✏️ Editar contenido (sin tocar componentes)

Todo el contenido vive en [`src/data/`](src/data/):

| Archivo | Qué contiene |
|---------|--------------|
| `projects.ts` | Proyectos. Agregar un objeto crea su card **y** su página `/proyectos/<slug>/`. |
| `skills.ts` | Tecnologías agrupadas. |
| `experience.ts` | Línea de tiempo (trabajo / educación). |
| `jochi-messages.ts` | Frases que dice Jochi en cada sección. |
| `site.ts` | Nombre, rol, tagline y links de contacto (WhatsApp, LinkedIn, GitHub, email, CV). |

## 🖼️ Assets a reemplazar

Hay placeholders listos para cambiar por material real:

- `public/images/jose.jpg` — foto personal (sección Sobre mí).
- `public/images/naturave/` y `public/images/subastasplus/` — capturas reales (hoy tienen un placeholder con el nombre).
- `public/images/jochi-static.svg` — imagen del orbe para el fallback sin 3D (ya incluida).
- `public/og.png` — imagen social 1200×630.
- Las capturas de Beacon AI, NS Inversiones y Paolo Masajes ya están tomadas automáticamente.

## ♿ Accesibilidad y performance

- Todas las animaciones (orbe 3D, cursor, smooth scroll, reveals) respetan `prefers-reduced-motion`.
- El 3D y el cursor custom solo se activan en desktop con puntero fino; en mobile se simplifica.
- Foco visible, contraste AA, imágenes con `alt`, semántica correcta.
- `next/image`, code-splitting y el bundle 3D cargado de forma diferida (`ssr: false`).

## 📦 Deploy

1. Push a este repo.
2. Importar en [vercel.com](https://vercel.com) — el framework se detecta solo, sin variables de entorno.
3. Actualizar la URL placeholder `https://jochi-garcia.vercel.app` en `src/app/layout.tsx`,
   `src/app/sitemap.ts` y `src/app/robots.ts` por el dominio real.

---

<div align="center">
Hecho por <b>Jochi</b> 🤘
</div>

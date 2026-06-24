# Portfolio de José García (Jochi)

Static portfolio built with Next.js 16. Showcases projects, skills, and experience with a custom 3D assistant, smooth scroll, and animated UI.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, Lenis (smooth scroll) |
| 3D | React Three Fiber + @react-three/drei |
| Testing | Vitest + React Testing Library |
| Backend | None — fully static, no server required |

---

## Commands

```bash
# Local development server
npm run dev

# Run the test suite
npm test

# Production build — outputs a fully static site to out/
npm run build

# Preview the static build locally
npx serve out
```

---

## Editing Content (no code needed)

All content lives in `src/data/`. Change the data files; the UI updates automatically.

### `src/data/site.ts`

Name, nickname, role, tagline, and all contact links (WhatsApp, Instagram, GitHub, email, CV path). This is the first file to update when setting up the portfolio for a new person.

### `src/data/projects.ts`

List of projects. Each entry has:

| Field | Type | Description |
|---|---|---|
| `slug` | string | URL key — becomes `/proyectos/<slug>/` |
| `title` | string | Display name |
| `year` | string | Year of the project |
| `role` | string | Your role (e.g. "Fullstack", "Frontend") |
| `summary` | string | One-line description shown on the card |
| `description` | string[] | Paragraphs shown on the detail page (Problem / Solution / Result) |
| `stack` | string[] | Technologies used |
| `cover` | string | Path to cover image (relative to `public/`) |
| `gallery` | string[] | Additional images shown on the detail page |
| `repo` | string? | Optional GitHub URL |
| `demo` | string? | Optional live URL |

Adding an object to the array automatically creates its card on the home page **and** a static detail page at `/proyectos/<slug>/`.

### `src/data/skills.ts`

Tech stack groups shown in the Skills section (Frontend / Backend / Tools).

### `src/data/experience.ts`

Timeline entries for the Experience section. Each entry can be work or education.

### `src/data/jochi-messages.ts`

The lines the "Jochi" 3D assistant says as the user scrolls through each section. Sections are identified by anchor: `hero`, `about`, `proyectos`, `stack`, `experiencia`, `contacto`.

---

## Assets to Replace

The following files are placeholders. Replace them before deploying.

| Path | What it is |
|---|---|
| `public/images/jose.jpg` | The About section photo |
| `public/images/proyecto-uno/cover.jpg` | Cover image for Proyecto Uno |
| `public/images/proyecto-uno/1.jpg` | Gallery image 1 for Proyecto Uno |
| `public/images/proyecto-uno/2.jpg` | Gallery image 2 for Proyecto Uno |
| `public/images/proyecto-dos/cover.jpg` | Cover image for Proyecto Dos |
| `public/images/proyecto-dos/1.jpg` | Gallery image for Proyecto Dos |
| `public/images/jochi-static.png` | Static chrome-orb shown when 3D or motion is disabled (reduced-motion / touch devices). Replace with a real render of the chrome orb. |
| `public/cv-jose-garcia.pdf` | The PDF linked by the "Descargar CV" button. Drop the real CV here (path is set in `site.cvUrl`). |
| `public/og.png` | Social-share image (1200×630 px) shown when the URL is shared on social media. |

**For a new project with slug `X`:** add images under `public/images/X/` and reference them in `src/data/projects.ts`.

---

## Animations and Accessibility

- The 3D orb, custom cursor, and Lenis smooth scroll all **disable automatically** on touch devices and when the OS "Reduce Motion" setting is on.
- A static orb image (`public/images/jochi-static.png`) is shown as fallback in those cases.
- No JavaScript is required for content to be readable.

---

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Framework is auto-detected as Next.js. No environment variables are needed.
4. Vercel runs `npm run build` and serves the `out/` directory.

### Update the domain after deploy

Once Vercel assigns a domain (or you add a custom one), update the placeholder `https://jochi-garcia.vercel.app` in these three files:

- `src/app/layout.tsx` — `metadataBase`
- `src/app/sitemap.ts` — `const base`
- `src/app/robots.ts` — base URL

---

## Performance / Lighthouse

After deploying (or locally via `npx serve out`), open Chrome DevTools → Lighthouse and run an audit against the served URL. The project targets **90+** in all four categories:

- Performance
- Accessibility
- Best Practices
- SEO

This step requires a browser and is manual — it cannot be automated in CI.

---

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Home page (all sections)
    proyectos/[slug]/   # Dynamic project detail pages
    layout.tsx          # Root layout (fonts, metadata, global providers)
    sitemap.ts          # Auto-generated sitemap
    robots.ts           # robots.txt
  components/
    sections/           # Home page sections (Hero, About, Projects, etc.)
    ui/                 # Reusable UI components
    jochi/              # Jochi 3D assistant
    motion/             # Cursor, SmoothScroll
  data/                 # All editable content (see above)
public/
  images/               # Project and profile photos
  cv-jose-garcia.pdf    # CV download
  og.png                # Social share image
```

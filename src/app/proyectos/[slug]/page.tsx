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
      <Link href="/#proyectos" className="font-[family-name:var(--font-label)] text-sm text-accent">← volver</Link>

      <header className="mt-8">
        <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-accent">
          {project.role} · {project.year}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 font-[family-name:var(--font-label)] text-sm opacity-60">{project.stack.join(' · ')}</p>
      </header>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.cover} alt={`${project.title} — portada`} className="w-full" />
      </div>

      <div className="mt-10 max-w-prose space-y-4 text-lg leading-relaxed opacity-80">
        {project.description.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-8 flex gap-4">
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">Repositorio</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">Demo en vivo</a>}
      </div>

      {project.gallery.length > 0 && (
        <div className="mt-12">
          <p className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-accent">
            Recorrido completo
          </p>
          <div className="mt-4 space-y-8">
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className="max-h-[75vh] overflow-y-auto rounded-2xl border border-border shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} captura ${i + 1}`}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <nav className="mt-16 flex justify-between border-t border-border pt-6 font-[family-name:var(--font-label)] text-sm">
        {prev ? <Link href={`/proyectos/${prev.slug}/`} className="hover:text-accent">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/proyectos/${next.slug}/`} className="hover:text-accent">{next.title} →</Link> : <span />}
      </nav>
    </main>
  );
}

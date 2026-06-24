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

      <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-espresso/10">
        <Image
          src={project.cover}
          alt={`${project.title} — portada`}
          width={1280}
          height={720}
          className="h-full w-full object-cover object-top"
          priority
        />
      </div>

      <div className="mt-10 max-w-prose space-y-4 text-lg leading-relaxed opacity-80">
        {project.description.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-8 flex gap-4">
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="text-oxblood underline-offset-4 hover:underline">Repositorio</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-oxblood underline-offset-4 hover:underline">Demo en vivo</a>}
      </div>

      {project.gallery.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <div key={i} className="aspect-[16/10] overflow-hidden rounded-2xl border border-espresso/10">
              <Image
                src={src}
                alt={`${project.title} captura ${i + 1}`}
                width={1200}
                height={750}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      )}

      <nav className="mt-16 flex justify-between border-t border-espresso/15 pt-6 font-[family-name:var(--font-label)] text-sm">
        {prev ? <Link href={`/proyectos/${prev.slug}/`} className="hover:text-oxblood">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/proyectos/${next.slug}/`} className="hover:text-oxblood">{next.title} →</Link> : <span />}
      </nav>
    </main>
  );
}

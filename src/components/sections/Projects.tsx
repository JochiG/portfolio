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

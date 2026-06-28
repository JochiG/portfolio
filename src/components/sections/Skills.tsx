import { skills } from '@/data/skills';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { Chip } from '@/components/ui/Chip';
import { LogoMarquee } from '@/components/ui/LogoMarquee';

export function Skills() {
  return (
    <section id="stack" className="px-6 py-28 md:px-16">
      <SectionLabel text="mis herramientas" />
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold">Tecnologías</h2>
      <div className="mt-10">
        <LogoMarquee />
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08}>
            <h3 className="font-[family-name:var(--font-label)] text-sm font-semibold uppercase tracking-[0.2em] text-accent">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

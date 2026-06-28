import { experience } from '@/data/experience';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function Experience() {
  return (
    <section id="experiencia" className="px-6 py-28 md:px-16">
      <SectionLabel text="por dónde pasé" />
      <h2 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold">Trayectoria</h2>
      <ol className="mt-12 border-l-2 border-border pl-6">
        {experience.map((item, i) => (
          <Reveal key={`${item.title}-${i}`} delay={i * 0.08}>
            <li className="mb-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{item.title}</h3>
                <span className="font-[family-name:var(--font-label)] text-xs opacity-55">{item.period}</span>
              </div>
              <p className="text-sm font-semibold text-accent">{item.org}</p>
              <p className="mt-2 max-w-prose text-sm opacity-70">{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

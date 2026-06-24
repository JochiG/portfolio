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
      <p className="mt-6 max-w-md font-[family-name:var(--font-body)] text-lg opacity-70">{site.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {['React', 'Next.js', 'TypeScript', 'Node'].map((s) => <Chip key={s}>{s}</Chip>)}
      </div>
      <div className="mt-10">
        <MagneticButton href="#proyectos">Ver proyectos →</MagneticButton>
      </div>
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 motion-reduce:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/jochi-static.png" alt="" className="h-40 w-40" />
      </div>
    </section>
  );
}

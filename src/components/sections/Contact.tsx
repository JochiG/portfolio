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

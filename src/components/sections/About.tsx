import Image from 'next/image';
import { site } from '@/data/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  return (
    <section id="about" className="px-6 py-20 md:px-16 md:py-28">
      <SectionLabel text="quién soy" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px] md:items-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold md:text-4xl">
            Un poco sobre mí
          </h2>
          <p className="mt-5 max-w-prose font-[family-name:var(--font-body)] text-lg leading-relaxed opacity-75">
            Soy {site.name} ({site.nickname}), estudiante de la Licenciatura en Gestión de
            Tecnología de la Información en UADE (graduación estimada 2026). Construyo productos
            web de punta a punta para clientes reales: sitios a medida, sistemas de gestión y un
            SaaS con IA. Disfruto resolver problemas, trabajar bajo presión y entregar con
            calidad, en tiempo y forma.
          </p>
          <p className="mt-4 max-w-prose font-[family-name:var(--font-body)] text-base leading-relaxed opacity-70">
            Estoy en Buenos Aires, Argentina, con disponibilidad inmediata y abierto a trabajo
            remoto o presencial en CABA.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex justify-center md:block">
          <Image
            src="/images/jose-placeholder.svg"
            alt="Foto de José García (Jochi)"
            width={320}
            height={400}
            className="aspect-[4/5] w-full max-w-[260px] rounded-2xl object-cover md:max-w-none"
          />
        </Reveal>
      </div>
    </section>
  );
}

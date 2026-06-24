import Image from 'next/image';
import { site } from '@/data/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-16">
      <SectionLabel index={1} text="Sobre mí" />
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
        <Reveal delay={0.1}>
          <Image
            src="/images/jose.jpg"
            alt="Foto de José García (Jochi)"
            width={320}
            height={400}
            className="rounded-2xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

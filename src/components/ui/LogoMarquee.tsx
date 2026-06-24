import Image from 'next/image';

const logos = [
  { src: '/logos/react.svg', name: 'React' },
  { src: '/logos/nextjs.svg', name: 'Next.js' },
  { src: '/logos/typescript.svg', name: 'TypeScript' },
  { src: '/logos/javascript.svg', name: 'JavaScript' },
  { src: '/logos/python.svg', name: 'Python' },
  { src: '/logos/java.svg', name: 'Java' },
  { src: '/logos/tailwindcss.svg', name: 'Tailwind CSS' },
  { src: '/logos/bootstrap.svg', name: 'Bootstrap' },
  { src: '/logos/vite.svg', name: 'Vite' },
  { src: '/logos/supabase.svg', name: 'Supabase' },
  { src: '/logos/postgresql.svg', name: 'PostgreSQL' },
  { src: '/logos/mongodb.svg', name: 'MongoDB' },
  { src: '/logos/redis.svg', name: 'Redis' },
  { src: '/logos/flutter.svg', name: 'Flutter' },
  { src: '/logos/git.svg', name: 'Git' },
  { src: '/logos/figma.svg', name: 'Figma' },
];

/** Infinite horizontal logo slider. The track is rendered twice so the
 *  CSS `marquee` animation (translateX -50%) loops seamlessly. Pauses on
 *  hover and stops entirely under prefers-reduced-motion (see globals.css). */
export function LogoMarquee() {
  const track = [...logos, ...logos];
  return (
    <div
      className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      aria-label="Tecnologías que uso"
    >
      <div className="animate-marquee flex w-max items-center gap-12">
        {track.map((logo, i) => (
          <Image
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            title={logo.name}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 object-contain opacity-75 transition-opacity duration-300 hover:opacity-100"
            aria-hidden={i >= logos.length}
          />
        ))}
      </div>
    </div>
  );
}

import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-espresso px-6 py-10 text-bone/60 md:px-16">
      <div className="flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
        <span>© {new Date().getFullYear()} {site.fullName}</span>
        <a href={`https://github.com/${site.github}`} target="_blank" rel="noreferrer" className="hover:text-bone">
          Hecho por {site.nickname} · GitHub
        </a>
      </div>
    </footer>
  );
}

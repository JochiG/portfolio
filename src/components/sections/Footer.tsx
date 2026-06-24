import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-surface px-6 py-10 text-fg/55 md:px-16">
      <div className="flex flex-col items-center justify-between gap-3 text-sm md:flex-row">
        <span>© {new Date().getFullYear()} {site.fullName} — hecho por {site.nickname}</span>
        <div className="flex gap-4">
          <a href={`https://github.com/${site.github}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
            GitHub
          </a>
          <a href={`https://linkedin.com/in/${site.linkedin}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const dynamic = 'force-static';

const base = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    ...projects.map((p) => ({ url: `${base}/proyectos/${p.slug}/`, priority: 0.7 })),
  ];
}

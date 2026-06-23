import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'proyecto-uno',
    title: 'Proyecto Uno',
    year: '2025',
    role: 'Fullstack',
    summary: 'App web con pagos y panel de administración.',
    description: [
      'Problema: el cliente necesitaba vender online sin fricción.',
      'Solución: construí una SPA con checkout y un panel para gestionar el catálogo.',
      'Resultado: el flujo de compra bajó de 5 pasos a 2.',
    ],
    stack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    cover: '/images/proyecto-uno/cover.jpg',
    gallery: ['/images/proyecto-uno/1.jpg', '/images/proyecto-uno/2.jpg'],
    repo: 'https://github.com/JochiG',
    demo: undefined,
  },
  {
    slug: 'proyecto-dos',
    title: 'Proyecto Dos',
    year: '2024',
    role: 'Frontend',
    summary: 'Dashboard de datos en tiempo real.',
    description: [
      'Problema: visualizar métricas en vivo de forma clara.',
      'Solución: dashboard con gráficos reactivos y filtros.',
      'Resultado: decisiones más rápidas para el equipo.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind'],
    cover: '/images/proyecto-dos/cover.jpg',
    gallery: ['/images/proyecto-dos/1.jpg'],
    repo: 'https://github.com/JochiG',
    demo: undefined,
  },
];

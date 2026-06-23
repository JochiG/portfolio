'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <a
        href={`/proyectos/${project.slug}/`}
        className="group block overflow-hidden rounded-2xl border border-bone/15 bg-espresso/40"
        aria-label={`Ver proyecto ${project.title}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image src={project.cover} alt={project.title} width={640} height={360} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">{project.title}</h3>
          <p className="mt-1 text-sm opacity-70">{project.summary}</p>
          <p className="mt-3 font-[family-name:var(--font-label)] text-xs opacity-50">{project.stack.join(' · ')}</p>
        </div>
      </a>
    </motion.div>
  );
}

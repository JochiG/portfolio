import type { Metadata } from 'next';
import { Archivo, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', weight: ['600', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500', '600'] });

export const metadata: Metadata = {
  title: 'José García (Jochi) — Fullstack Engineer',
  description: 'Portfolio de José Ignacio García Olmos, fullstack / software engineer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Archivo, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { JochiAssistant } from '@/components/jochi/JochiAssistant';
import { site } from '@/data/site';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', weight: ['600', '700', '800', '900'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500', '600'] });

// Sets the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'José García (Jochi) — Fullstack Developer',
  description: 'Portfolio de José Ignacio García Olmos, fullstack developer. Sitios y sistemas web a medida.',
  openGraph: {
    title: 'José García (Jochi) — Fullstack Developer',
    description: 'Construyo productos web de punta a punta, con buen gusto.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Cursor />
        <JochiAssistant />
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}

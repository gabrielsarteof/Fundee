// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { RouteProgress } from '@/components/RouteProgress';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],   // inclua os pesos que você vai usar
  variable: '--font-poppins',
});

export const metadata : Metadata = {
  // título default e template para páginas individuais
  title: {
    default: 'Galaxy Bay',
    template: '%s | Galaxy Bay',
  },
  icons: {
    icon: '/favicon.svg',
  },
  description: 'Gerencie suas NFTs e seu perfil com Galaxy Bay',
  // você pode manter outros metadados globais aqui:
  keywords: ['NFT', 'Web3', 'Next.js', 'Galaxy Bay'],
  openGraph: {
    title: 'Galaxy Bay',
    description: 'Gerencie suas NFTs e seu perfil com Galaxy Bay',
    url: '',
    siteName: 'Galaxy Bay',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        <Providers>
          {/* barra de progresso em todas as rotas */}
          <RouteProgress>
            {children}
          </RouteProgress>
        </Providers>
      </body>
    </html>
  );
}

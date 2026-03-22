import type { Metadata } from 'next';
import { Cinzel, Playfair_Display } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'SOLOMON\'S PALACE — AUREUS GENESIS',
  description: 'Enter the Palace. Collect 31 Artifacts. Become a Legion.',
  openGraph: {
    title: 'SOLOMON\'S PALACE — AUREUS GENESIS',
    description: 'A 31-day Web3 quest. Collect artifacts. Reach The Monetary Mint.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cinzel.variable} ${playfair.variable}`}>
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}

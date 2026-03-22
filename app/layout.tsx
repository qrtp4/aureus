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
  title: 'AUREUS GENESIS — 888 Warrior NFTs on Polygon',
  description:
    '888 genesis warrior NFTs. Mint on Polygon. True ownership. No intermediaries. Be first.',
  openGraph: {
    title: 'AUREUS GENESIS',
    description: '888 Warriors. One Chain. Eternal Legacy. Mint now on Polygon.',
    type: 'website',
    url: 'https://taupe-creponne-de523f.netlify.app',
    siteName: 'AUREUS GENESIS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUREUS GENESIS — 888 NFTs on Polygon',
    description: '888 Warriors. One Chain. Eternal Legacy.',
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

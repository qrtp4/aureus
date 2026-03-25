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
  title: 'AUREUS GENESIS — Warrior NFTs on Polygon',
  description:
    '100 genesis warrior NFTs. Mint on Polygon. True ownership. No intermediaries. Be first.',
  openGraph: {
    title: 'AUREUS GENESIS',
    description: '100 Warriors. One Chain. Eternal Legacy. Mint now on Polygon.',
    type: 'website',
    url: 'https://aureus-qrtp4s-projects.vercel.app',
    siteName: 'AUREUS GENESIS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUREUS GENESIS — 100 NFTs on Polygon',
    description: '100 Warriors. One Chain. Eternal Legacy.',
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${playfair.variable} font-cinzel antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUREUS',
  description: 'The Palace of Power',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

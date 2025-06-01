
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PageInitializer } from '@/components/layout/PageInitializer';

export const metadata: Metadata = {
  title: 'Web Evolusioner',
  description: 'Jelajahi evolusi internet dari Web1 hingga Web3.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Terapkan kelas gelap ke html untuk konsistensi jika diperlukan, atau andalkan :root
    // Tambahkan bg-background untuk memastikan lapisan dasar adalah warna tema gelap
    <html lang="id" className="dark bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <PageInitializer>
          {children}
        </PageInitializer>
        <Toaster />
      </body>
    </html>
  );
}

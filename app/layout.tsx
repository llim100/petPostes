import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { Suspense } from 'react';
import { Loading } from '@/components/auth/loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'petPoste',
  description: 'pet picture sharing platform for nurses',
  icons: { icon: [{ rel: 'icon', url: 'logo.svg', href: '/favicon.ico' }] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}

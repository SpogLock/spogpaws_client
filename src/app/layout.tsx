import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers, ErrorBoundary, LoadingProvider } from '@/lib/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spog Paws - Connecting Vets with Pet Owners',
  description: 'A comprehensive platform for veterinary consultations, pet adoption, and pet care products.',
  keywords: ['veterinary', 'pets', 'adoption', 'pet care', 'consultation'],
  authors: [{ name: 'Spog Paws Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Spog Paws',
    description: 'Connecting Vets with Pet Owners',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <LoadingProvider>
              <div id="root">
                {children}
              </div>
            </LoadingProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}

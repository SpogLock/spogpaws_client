import Navbar from '@/components/ui/navbar';
import { AppProviders } from '@/lib/providers';

export const metadata = {
  title: 'SpogPaws - Connecting Vets with Pet Owners',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
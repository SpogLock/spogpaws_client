import Navbar from '@/components/ui/navbar';
import { AppProviders } from '@/lib/providers';
import BootstrapScript from '@/components/ui/bootstrap-script';
import './global.css';

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
      <head>
        {/* Bootstrap CSS CDN */}
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous"
        />
        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css"
        />
      </head>
      <body>
        <AppProviders>
          <Navbar />
          {children}
          <BootstrapScript />
        </AppProviders>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import ClientLayout from './ClientLayout';
import './globals.css';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bommier.ba'), // Zamijenite sa stvarnom domenom
  title: 'Bommier Wear • Bezvremenska elegancija',
  description: 'Ekskluzivni komadi beskompromisnog dizajna. Definicija modernog luksuza i premium kvalitete.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bommier Wear',
  },
  openGraph: {
    title: 'Bommier Wear • Bezvremenska elegancija',
    description: 'Ekskluzivni komadi beskompromisnog dizajna. Definicija modernog luksuza i premium kvalitete.',
    url: 'https://bommier.ba',
    siteName: 'Bommier Wear',
    images: [
      {
        url: '/images/seo-cover.webp', // Obavezno zamijeniti sliku u folderu novom premium fotografijom
        width: 1200,
        height: 630,
        alt: 'Bommier Wear Kolekcija',
      },
    ],
    locale: 'bs_BA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bommier Wear • Bezvremenska elegancija',
    description: 'Ekskluzivni komadi beskompromisnog dizajna. Definicija modernog luksuza i premium kvalitete.',
    images: ['/images/seo-cover.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fontovi zadržani za sada, možemo ih promijeniti u globals.css ili ovdje ako želite serifni font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800;900&display=swap"
        />
      </head>
      <body className="bg-[#FAF9F5] text-neutral-900 antialiased font-['Inter']">
        
        {/* GOOGLE ANALYTICS INTEGRACIJA SA CONSENT MODE */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="google-consent-init"
              strategy="beforeInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 500
                });

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
          </>
        )}

        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import ClientLayout from './ClientLayout';
import './globals.css';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bommier.pages.dev'),
  title: 'BOMMIER WEAR',
  description: 'Otkrijte novu kolekciju luksuzne odjeće. Beskompromisan dizajn i bezvremenska elegancija.',
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/logo.png', sizes: 'any', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'BOMMIER WEAR',
    description: 'Otkrijte novu kolekciju luksuzne odjeće.',
    url: 'https://bommier.pages.dev',
    siteName: 'BOMMIER WEAR',
    images: [
      {
        url: '/images/seo-cover.webp',
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
    title: 'BOMMIER WEAR',
    description: 'Otkrijte novu kolekciju luksuzne odjeće.',
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
        {/* Dodajemo jako tanke (Light 300) i normalne fontove za elegantan, "high-end" osjećaj */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap"
        />
      </head>
      {/* Čista, potpuno bijela pozadina */}
      <body className="bg-white text-black antialiased font-['Inter']">
        
        {GA_MEASUREMENT_ID && (
          <>
            <Script id="google-consent-init" strategy="beforeInteractive">
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
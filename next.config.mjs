import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // UKLONJENO: output: 'export' 
  // Razlog: Omogućavamo da Cloudflare Pages pokreće naše API rute (/api/checkout, /api/subscribe)
  
  images: {
    unoptimized: true, // Ovo mora ostati zbog Cloudflarea
  },
  
  // Ovo rješava konflikt između PWA paketa i Next.js 16 Turbopack-a
  turbopack: {},
};

export default withPWA(nextConfig);
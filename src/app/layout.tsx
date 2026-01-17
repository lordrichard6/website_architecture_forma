import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forma-architects.ch'),
  title: {
    default: 'FORMA | Architecture Studio Zurich',
    template: '%s | FORMA Architects',
  },
  description: 'Award-winning architecture studio in Zurich, Switzerland. We design bold, timeless spaces for residential, commercial, and public projects. 25+ years of design excellence.',
  keywords: ['architecture', 'Zurich', 'Switzerland', 'architect', 'design studio', 'residential', 'commercial', 'interior design', 'urban planning'],
  authors: [{ name: 'FORMA Architects' }],
  openGraph: {
    title: 'FORMA | Architecture Studio Zurich',
    description: 'Award-winning architecture studio designing bold, timeless spaces. Residential, commercial, and public projects across Switzerland.',
    url: 'https://forma-architects.ch',
    siteName: 'FORMA Architects',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'FORMA Architecture Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORMA | Architecture Studio Zurich',
    description: 'Award-winning architecture studio designing bold, timeless spaces.',
    images: ['/hero.webp'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://forma-architects.ch',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalBusiness',
  name: 'FORMA Architects',
  description: 'Award-winning architecture studio in Zurich, Switzerland.',
  url: 'https://forma-architects.ch',
  telephone: '+41 44 123 45 67',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bahnhofstrasse 42',
    addressLocality: 'Zurich',
    addressRegion: 'ZH',
    postalCode: '8001',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.3769,
    longitude: 8.5417,
  },
  foundingDate: '1999',
  numberOfEmployees: '50+',
  areaServed: 'Switzerland',
  sameAs: [
    'https://linkedin.com/company/forma-architects',
    'https://instagram.com/forma_architects',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

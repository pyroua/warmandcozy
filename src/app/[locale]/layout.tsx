import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

const SITE_URL = 'https://warmandcozy.club';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  "streetAddress": "De Omgang 17",
  "addressLocality": "Veghel",
  "postalCode": "5463KZ",
  "addressCountry": "NL",
};

const SAME_AS = ["https://www.instagram.com/schoonmaak_warm.cozy/"];

/**
 * Schema.org structured data (JSON-LD) rendered in <head>: WebSite + Organization +
 * LocalBusiness linked via @id, so search engines and AI Overviews can resolve the
 * brand entity, the site and the physical business as one knowledge-graph node set.
 */
function buildJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        "url": `${SITE_URL}/`,
        "name": "Schoonmaak Warm and Cozy",
        "alternateName": "Warm and Cozy",
        "inLanguage": locale,
        "publisher": { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        "name": "Schoonmaak Warm and Cozy",
        "alternateName": "Warm and Cozy",
        "url": `${SITE_URL}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/images/logo.png`,
          "width": 1024,
          "height": 1024,
        },
        "image": `${SITE_URL}/images/logo.png`,
        "email": "info@warmandcozy.club",
        "telephone": "+31617615757",
        "address": POSTAL_ADDRESS,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+31617615757",
          "email": "info@warmandcozy.club",
          "areaServed": "NL",
          "availableLanguage": ["nl", "en", "fr", "de"],
        },
        "sameAs": SAME_AS,
      },
      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        "name": "Schoonmaak Warm and Cozy",
        "image": `${SITE_URL}/images/logo.png`,
        "telephone": "+31617615757",
        "email": "info@warmandcozy.club",
        "address": POSTAL_ADDRESS,
        "url": `${SITE_URL}/`,
        "sameAs": SAME_AS,
        "priceRange": "€€",
        "openingHours": "Mo-Su 06:00-22:00",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.6124,
          "longitude": 5.5462,
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 51.6124,
            "longitude": 5.5462,
          },
          "geoRadius": 25000,
        },
        "serviceType": ["Dieptereiniging", "Kantoorschoonmaak", "Woningschoonmaak"],
        "parentOrganization": { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    nl: 'Professionele schoonmaakservice in Veghel en omgeving. Dieptereiniging woningen & kantoorschoonmaak op contract. Bel +31 617 615 757.',
    en: 'Professional cleaning service in Veghel and surroundings. Deep cleaning homes & office cleaning on contract. Call +31 617 615 757.',
    fr: 'Service de nettoyage professionnel à Veghel et environs. Nettoyage en profondeur et entretien bureaux. Appelez le +31 617 615 757.',
    de: 'Professioneller Reinigungsservice in Veghel und Umgebung. Tiefenreinigung Wohnungen & Büroreinigung auf Vertragsbasis. Anrufen +31 617 615 757.',
  };

  return {
    title: "Schoonmaak Warm and Cozy | Veghel",
    description: descriptions[locale] || descriptions.nl,
    keywords: ['schoonmaak', 'Veghel', 'dieptereiniging', 'kantoorschoonmaak', 'schoonmaakbedrijf', 'cleaning', 'Eindhoven', 'Den Bosch'],
    openGraph: {
      title: 'Schoonmaak Warm and Cozy',
      description: descriptions[locale] || descriptions.nl,
      url: 'https://warmandcozy.club',
      siteName: 'Warm and Cozy',
      images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Warm and Cozy Schoonmaak' }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Schoonmaak Warm and Cozy | Veghel',
      description: descriptions[locale] || descriptions.nl,
      images: ['/images/hero.jpg'],
    },
    alternates: {
      // Self-referencing canonical per locale. The root "/" is a redirect stub whose
      // canonical points to /nl/, so pointing /nl/ back to "/" created a canonical loop.
      canonical: `${SITE_URL}/${locale}/`,
      languages: {
        'nl': `${SITE_URL}/nl/`,
        'en': `${SITE_URL}/en/`,
        'fr': `${SITE_URL}/fr/`,
        'de': `${SITE_URL}/de/`,
        'x-default': `${SITE_URL}/nl/`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL('https://warmandcozy.club'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Load messages directly from file — no headers() call (compatible with static export)
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={nunito.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape "<" so the JSON payload can never close the <script> tag early.
            __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

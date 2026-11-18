import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { business } from "@/lib/business";
import { getSiteSettings } from "@/lib/storyblok";

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    template: "%s | Lily Pads & Poppy Paws"
  },
  description: "Lily Pads & Poppy Paws offers dog grooming in Hemel Hempstead, Hertfordshire. Qualified and insured, with nail clipping and full grooms for all breeds. Call to enquire.",
  alternates: { canonical: "/" },
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: {
    icon: [{ url: "/images/2.jpeg", type: "image/jpeg" }],
    shortcut: ["/images/2.jpeg"],
    apple: [{ url: "/images/2.jpeg", type: "image/jpeg" }]
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
    title: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Lily Pads & Poppy Paws offers qualified and insured dog grooming in Hemel Hempstead, from nail clipping to full grooms for all breeds.",
    url: business.domain
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Qualified and insured dog grooming in Hemel Hempstead, from nail clipping to full grooms. All breeds welcome.",
    images: ["/images/2.jpeg"]
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.domain}/#business`,
    name: settings?.brand_name || business.name,
    description: settings?.footer_description || business.description,
    url: business.domain,
    telephone: business.telephone.startsWith("0") ? `+44${business.telephone.slice(1)}` : business.telephone,
    image: settings?.logo?.filename || `${business.domain}/images/2.jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address_line_1 || business.address.streetAddress,
      addressLocality: settings?.address_line_2 || business.address.addressLocality,
      postalCode: settings?.address_line_3 || business.address.postalCode,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry
    },
    sameAs: [settings?.facebook_url || business.facebook, settings?.instagram_url || business.instagram],
    knowsAbout: ["Dog grooming", "Dog nail clipping", "Full dog grooms"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Tuesday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Wednesday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Thursday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Friday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Saturday", opens: "09:00", closes: "15:00" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dog grooming services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dog nail clipping" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full dog grooming" } }
      ]
    }
  };

  return (
    <html lang="en-GB">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <SiteHeader settings={settings} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}

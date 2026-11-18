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
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
    title: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    description: "Lily Pads & Poppy Paws offers qualified and insured dog grooming in Hemel Hempstead, from nail clipping to full grooms for all breeds.",
    url: business.domain
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings?.brand_name || business.name,
    description: settings?.footer_description || business.description,
    url: business.domain,
    telephone: business.telephone,
    image: settings?.logo?.filename || `${business.domain}/images/2.jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      postalCode: business.address.postalCode,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry
    },
    sameAs: [settings?.facebook_url || business.facebook, settings?.instagram_url || business.instagram],
    areaServed: [
      { "@type": "City", name: "Hemel Hempstead" },
      { "@type": "AdministrativeArea", name: "Hertfordshire" }
    ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader settings={settings} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { business } from "@/lib/business";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: business.domain,
    telephone: business.telephone,
    image: `${business.domain}/images/2.jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      postalCode: business.address.postalCode,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry
    },
    sameAs: [business.facebook, business.instagram],
    areaServed: [
      { "@type": "City", name: "Hemel Hempstead" },
      { "@type": "AdministrativeArea", name: "Hertfordshire" }
    ],
    knowsAbout: ["Dog grooming", "Dog nail clipping", "Full dog grooms"]
  };

  return (
    <html lang="en-GB">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

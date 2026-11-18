import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";

type FooterLink = { _uid?: string; label?: string; href?: string };
type SiteSettings = {
  logo?: { filename?: string; alt?: string };
  logo_alt?: string;
  brand_name?: string;
  footer_description?: string;
  footer_find_us_heading?: string;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
  phone_display?: string;
  phone_link?: string;
  footer_social_heading?: string;
  facebook_url?: string;
  instagram_url?: string;
  footer_links?: FooterLink[];
  copyright_text?: string;
  footer_tagline?: string;
};

const defaultFooterLinks = [
  { label: "Grooming services", href: "/services" },
  { label: "Frequently asked questions", href: "/faqs" },
  { label: "Contact & location", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" }
];

export default function SiteFooter({ settings }: { settings?: SiteSettings | null }) {
  const logoSrc = settings?.logo?.filename || "/images/2.jpeg";
  const brandName = settings?.brand_name || business.name;
  const phone = settings?.phone_link || `tel:${business.telephone}`;
  const phoneDisplay = settings?.phone_display || business.telephoneDisplay;
  const links = settings?.footer_links?.length
    ? settings.footer_links.filter((item) => item.label && item.href)
    : defaultFooterLinks;
  const address = [
    settings?.address_line_1 || business.address.streetAddress,
    settings?.address_line_2 || business.address.addressLocality,
    settings?.address_line_3 || business.address.postalCode
  ];

  return (
    <footer className="site-footer">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="brand-lockup text-white">
            <Image src={logoSrc} alt={settings?.logo?.alt || settings?.logo_alt || `${brandName} logo`} width={76} height={76} className="footer-brand-logo" />
            <span className="brand-name">{brandName}</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-sky-100">{settings?.footer_description || business.description}</p>
        </div>
        <div>
          <h2 className="footer-heading">{settings?.footer_find_us_heading || "Find us"}</h2>
          <p className="mt-4 flex gap-3 leading-7 text-sky-100"><MapPin className="mt-1 shrink-0" size={18} /><span>{address.map((line) => <span className="block" key={line}>{line}</span>)}</span></p>
          <a className="mt-4 flex items-center gap-3 text-sky-100 hover:text-white" href={phone}><Phone size={17} />{phoneDisplay}</a>
        </div>
        <div>
          <h2 className="footer-heading">{settings?.footer_social_heading || "Follow & explore"}</h2>
          <div className="mt-4 flex gap-3">
            <a className="social-link" href={settings?.facebook_url || business.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={19} /></a>
            <a className="social-link" href={settings?.instagram_url || business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19} /></a>
          </div>
          <div className="mt-5 grid gap-2 text-sky-100">
            {links.map((item) => <Link href={item.href || "/"} key={item._uid || item.href}>{item.label}</Link>)}
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-shell flex flex-wrap justify-between gap-2 py-5 text-sm text-sky-100">
          <span>{(settings?.copyright_text || "© {year} Lily Pads & Poppy Paws").replace("{year}", String(new Date().getFullYear())).replace("Lily Pads & Poppy Paws", brandName)}</span>
          <span>{settings?.footer_tagline || "Dog grooming in Hemel Hempstead, Hertfordshire"}</span>
        </div>
      </div>
    </footer>
  );
}

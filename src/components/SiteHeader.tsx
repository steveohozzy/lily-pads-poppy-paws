import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";

type NavItem = { _uid?: string; label?: string; href?: string };
type SiteSettings = {
  logo?: { filename?: string; alt?: string };
  logo_url?: string;
  logo_alt?: string;
  brand_name?: string;
  header_call_text?: string;
  phone_display?: string;
  phone_link?: string;
  navigation?: NavItem[];
};

const defaultLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["FAQs", "/faqs"],
  ["Contact", "/contact"]
];

export default function SiteHeader({ settings }: { settings?: SiteSettings | null }) {
  const links = settings?.navigation?.length
    ? settings.navigation.filter((item) => item.label && item.href).map((item) => [item.label as string, item.href as string])
    : defaultLinks;
  const logoSrc = settings?.logo?.filename || settings?.logo_url || "/images/2.jpeg";
  const logoAlt = settings?.logo?.alt || settings?.logo_alt || `${settings?.brand_name || business.name} logo`;
  const brandName = settings?.brand_name || business.name;
  const phone = settings?.phone_link || `tel:${business.telephone}`;
  const phoneDisplay = settings?.phone_display || business.telephoneDisplay;

  return (
    <header className="site-header">
      <div className="container-shell header-inner">
        <Link href="/" className="brand-lockup" aria-label={`${brandName} — dog grooming in Hemel Hempstead`}>
          <Image src={logoSrc} alt={logoAlt} width={72} height={72} className="brand-logo-image" />
          <span className="brand-name">{brandName}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <a className="header-call" href={phone}><Phone size={17} /> <span>{settings?.header_call_text || "Call us"}</span></a>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </header>
  );
}

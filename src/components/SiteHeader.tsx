import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["FAQs", "/faqs"],
  ["Contact", "/contact"]
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-shell header-inner">
        <Link href="/" className="brand-lockup" aria-label="Lily Pads & Poppy Paws — dog grooming in Hemel Hempstead">
          <Image src="/images/brand-reference-logo.jpeg" alt="" width={72} height={72} className="brand-logo-image" />
          <span className="brand-name">Lily Pads <span>&</span><br />Poppy Paws</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <a className="header-call" href="tel:07752027606"><Phone size={17} /> <span>Call us</span></a>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </header>
  );
}

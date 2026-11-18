import Link from "next/link";
import { PawPrint, Phone } from "lucide-react";

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
      <div className="container-shell flex min-h-[82px] items-center justify-between gap-4">
        <Link href="/" className="brand-lockup" aria-label="Lily Pads and Poppy Paws home">
          <span className="brand-mark"><PawPrint size={27} fill="currentColor" /></span>
          <span className="brand-name">Lily Pads <span>&</span><br />Poppy Paws</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <a className="header-call" href="tel:07752027606"><Phone size={16} /> <span>Call us</span></a>
      </div>
      <nav className="mobile-nav lg:hidden" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MapPin, PawPrint, Phone } from "lucide-react";
import { business } from "@/lib/business";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="brand-lockup text-white">
            <Image src="/images/2.jpeg" alt="Lily Pads & Poppy Paws logo" width={76} height={76} className="footer-brand-logo" />
            <span className="brand-name">Lily Pads <span>&</span><br />Poppy Paws</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-sky-100">Qualified and insured dog grooming in Hemel Hempstead, Hertfordshire. Enquire about nail clipping and full grooms for all breeds.</p>
        </div>
        <div>
          <h2 className="footer-heading">Find us</h2>
          <p className="mt-4 flex gap-3 leading-7 text-sky-100"><MapPin className="mt-1 shrink-0" size={18} />42 Lomond Road<br />Hemel Hempstead<br />HP2 6PA</p>
          <a className="mt-4 flex items-center gap-3 text-sky-100 hover:text-white" href="tel:07752027606"><Phone size={17} />07752 027606</a>
        </div>
        <div>
          <h2 className="footer-heading">Follow & explore</h2>
          <div className="mt-4 flex gap-3">
            <a className="social-link" href={business.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={19} /></a>
            <a className="social-link" href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19} /></a>
          </div>
          <div className="mt-5 grid gap-2 text-sky-100">
            <Link href="/services">Grooming services</Link>
            <Link href="/faqs">Frequently asked questions</Link>
            <Link href="/contact">Contact & location</Link>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-shell flex flex-wrap justify-between gap-2 py-5 text-sm text-sky-100">
          <span>© {new Date().getFullYear()} Lily Pads & Poppy Paws</span>
          <span>Dog grooming in Hemel Hempstead, Hertfordshire</span>
        </div>
      </div>
    </footer>
  );
}

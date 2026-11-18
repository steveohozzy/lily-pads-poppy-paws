"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X, ChevronRight, PawPrint } from "lucide-react";
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

const defaultLinks: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["FAQs", "/faqs"],
  ["Contact", "/contact"]
];

export default function SiteHeader({ settings }: { settings?: SiteSettings | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const links: [string, string][] = settings?.navigation?.length
    ? settings.navigation.filter((item) => item.label && item.href).map((item) => [item.label as string, item.href as string])
    : defaultLinks;
  const logoSrc = settings?.logo?.filename || settings?.logo_url || "/images/2.jpeg";
  const logoAlt = settings?.logo?.alt || settings?.logo_alt || `${settings?.brand_name || business.name} logo`;
  const brandName = settings?.brand_name || business.name;
  const phone = settings?.phone_link || `tel:${business.telephone}`;

  useEffect(() => {
    let previousY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const difference = currentY - previousY;

      if (menuOpen || currentY < 100) {
        setHidden(false);
      } else if (difference > 7 && currentY > 150) {
        setHidden(true);
      } else if (difference < -7) {
        setHidden(false);
      }

      previousY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${hidden && !menuOpen ? " site-header-hidden" : ""}`}>
      <div className="container-shell header-inner">
        <Link href="/" className="brand-lockup" aria-label={`${brandName} — dog grooming in Hemel Hempstead`} onClick={closeMenu}>
          <Image src={logoSrc} alt={logoAlt} width={72} height={72} className="brand-logo-image" priority />
          <span className="brand-name">{brandName.includes("&") ? <>{brandName.split("&")[0].trim()} <span>&</span><br/>{brandName.split("&").slice(1).join("&").trim()}</> : brandName}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>

        <div className="header-actions">
          <a className="header-call" href={phone} aria-label={settings?.header_call_text || "Call Lily Pads & Poppy Paws"}>
            <Phone size={17} /> <span>{settings?.header_call_text || "Call us"}</span>
          </a>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-layer">
          <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu} />
          <nav id="mobile-menu-panel" className="mobile-menu-panel" aria-label="Mobile navigation">
            <div className="mobile-menu-heading">
              <span>Where would you like to go?</span>
              <PawPrint className="mobile-menu-paw" aria-hidden="true" size={25} />
            </div>
            {links.map(([label, href], index) => (
              <Link key={href} href={href} className="mobile-menu-link" onClick={closeMenu}>
                <span className="mobile-menu-number">0{index + 1}</span>
                <span>{label}</span>
                <ChevronRight size={19} aria-hidden="true" />
              </Link>
            ))}
            <a className="mobile-menu-call" href={phone} onClick={closeMenu}>
              <Phone size={18} /> {settings?.header_call_text || "Give us a call"}
            </a>
            <p className="mobile-menu-footnote">A little love for every paw.</p>
          </nav>
        </div>
      )}
    </header>
  );
}

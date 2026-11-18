import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, PawPrint, Phone, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: { eyebrow?: string; heading?: string; highlight?: string; intro?: string; image?: { filename?: string; alt?: string }; image_url?: string; image_alt?: string; button_text?: string; button_link?: string | { cached_url?: string; url?: string }; secondary_button_text?: string; secondary_button_link?: string; show_secondary_button?: boolean; phone_link?: string; phone_text?: string; paint_note?: string; layout?: string; trust_badge_one?: string; trust_badge_two?: string; sticker_top?: string; sticker_bottom?: string } };

export default function Hero({ blok }: Props) {
  const isHome = (blok.eyebrow || "").toLowerCase().includes("little love for every paw");
  const heading = blok.heading || "Happy dogs. Lovely fresh trims.";
  const isServices = heading.toLowerCase().includes("service");
  const isContact = heading.toLowerCase().includes("contact");
  const paintNote = blok.paint_note || (isServices ? "Freshen up\nyour fluff!" : isContact ? "Come say\nhello!" : "A little kindness\ngoes a long way");
  const pageArtClass = isServices ? "page-art-services" : isContact ? "page-art-contact" : "page-art-about";
  const pageButtonText = blok.phone_text || blok.button_text || (isServices ? "Call for a quote" : isContact ? "Call 07752 027606" : "Have a chat");
  const secondaryHref = blok.secondary_button_link || (typeof blok.button_link === "string" ? blok.button_link : blok.button_link?.cached_url || blok.button_link?.url) || "/services";
  const imageSrc = blok.image?.filename || blok.image_url;
  const artwork = imageSrc
    ? <img src={imageSrc} alt={blok.image?.alt || blok.image_alt || "Illustrated dog artwork for Lily Pads & Poppy Paws"} className={isHome ? "hero-brand-art hero-dog-art" : "page-feature-image"} />
    : <Image src={isHome ? "/images/1.jpg" : "/images/3.jpg"} alt="Aqua and blue dog grooming illustration for Lily Pads & Poppy Paws" width={1000} height={1000} priority className={isHome ? "hero-brand-art hero-dog-art" : "page-feature-image"} sizes="(max-width: 1024px) 90vw, 46vw" />;

  if (!isHome && blok.layout === "centered") return (
    <section className="page-hero" {...storyblokEditable(blok as never)}>
      <div className="container-shell text-center"><p className="eyebrow justify-center"><PawPrint size={16}/> {blok.eyebrow || "A little about us"}</p><h1 className="mt-4"><HighlightedText text={heading} highlight={blok.highlight}/></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{blok.intro || "Qualified and insured dog grooming in Hemel Hempstead. All breeds are welcome."}</p></div>
    </section>
  );

  if (!isHome) return (
    <>
      <section className="page-hero page-hero-art" {...storyblokEditable(blok as never)}>
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div>
            <p className="eyebrow"><PawPrint size={16}/> {blok.eyebrow || "A little about us"}</p>
            <h1 className="mt-4"><HighlightedText text={heading} highlight={blok.highlight}/></h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{blok.intro || "Qualified and insured dog grooming in Hemel Hempstead. All breeds are welcome."}</p>
            <div className="mt-7 flex flex-wrap gap-3"><a className="button-primary" href={blok.phone_link || "tel:07752027606"}><Phone size={18}/> {blok.phone_text || pageButtonText}</a>{blok.show_secondary_button !== false && <Link className="button-secondary" href={secondaryHref}>{blok.secondary_button_text || "Explore grooming"} <span aria-hidden="true">→</span></Link>}</div>
          </div>
          <div className={`page-art-card ${pageArtClass}`}>{artwork}<span className="paint-note">{paintNote.split("\n").map((line, index) => <span key={index}>{index > 0 && <br/>}{line}</span>)}</span></div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <section className="hero-wrap" {...storyblokEditable(blok as never)}>
        <div className="container-shell hero-layout grid gap-8 py-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-16">
          <div className="hero-copy relative z-10">
            <p className="eyebrow"><PawPrint size={16} /> {blok.eyebrow || "Dog grooming in Hemel Hempstead"}</p>
            <h1 className="display-heading mt-5"><HighlightedText text={heading} highlight={blok.highlight}/></h1>
            <p className="hero-intro mt-6 max-w-xl">{blok.intro || "Qualified and insured dog grooming in Hemel Hempstead, with nail clipping and full grooms available to enquire about. All breeds welcome."}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="button-primary" href={blok.phone_link || "tel:07752027606"}><Phone size={18}/> {blok.button_text || "Call 07752 027606"}</a><Link className="button-secondary" href={blok.button_link || "/services"}>Explore our services <span aria-hidden="true">→</span></Link></div>
            <div className="hero-trust mt-8 flex flex-wrap gap-x-6 gap-y-3"><span><ShieldCheck size={18}/> {blok.trust_badge_one || "Qualified & insured"}</span><span><HeartHandshake size={18}/> {blok.trust_badge_two || "All breeds welcome"}</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-art-wash" aria-hidden="true"/><span className="hero-paint-streak hero-paint-streak-one" aria-hidden="true"/><span className="hero-paint-streak hero-paint-streak-two" aria-hidden="true"/>
            <span className="hero-doodle-heart hero-doodle-heart-one" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M31 51C23 44 6 32 6 19 6 9 18 4 26 12l6 7 6-8C47 1 60 9 58 21 56 33 42 44 31 51Z"/></svg></span>
            <span className="hero-doodle-heart hero-doodle-heart-two" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M31 51C22 43 7 32 7 20 7 9 18 5 26 13l6 6 7-8C48 2 59 10 57 21 55 33 42 44 31 51Z"/></svg></span>
            <span className="hero-doodle-paw hero-doodle-paw-one" aria-hidden="true"><PawPrint size={27}/></span><span className="hero-doodle-paw hero-doodle-paw-two" aria-hidden="true"><PawPrint size={22}/></span><span className="hero-doodle-paw hero-doodle-paw-three" aria-hidden="true"><PawPrint size={24}/></span>
            {artwork}<span className="hero-sticker hero-sticker-top" aria-hidden="true">{blok.sticker_top || "Pawsitively pampered!"}</span><span className="hero-sticker hero-sticker-bottom" aria-hidden="true"><PawPrint size={17}/> {blok.sticker_bottom || "Every dog is special"}</span>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true"/>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, MapPin, PawPrint, Phone, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: { eyebrow?: string; heading?: string; highlight?: string; intro?: string; image?: { filename?: string; alt?: string }; button_text?: string; button_link?: string; show_trust_ribbon?: boolean } };

export default function Hero({ blok }: Props) {
  const isHome = blok.show_trust_ribbon || (blok.eyebrow || "").toLowerCase().includes("little love for every paw");
  return (
    <>
      <section className="hero-wrap" {...storyblokEditable(blok as never)}>
        <div className="container-shell hero-layout grid gap-8 py-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-16">
          <div className="hero-copy relative z-10">
            <p className="eyebrow"><PawPrint size={16} /> {blok.eyebrow || "Dog grooming in Hemel Hempstead"}</p>
            <h1 className="display-heading mt-5"><HighlightedText text={blok.heading || "Happy dogs. Lovely fresh trims."} highlight={blok.highlight} /></h1>
            <p className="hero-intro mt-6 max-w-xl">{blok.intro || "Qualified and insured dog grooming in Hemel Hempstead, with nail clipping and full grooms available to enquire about. All breeds welcome."}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="tel:07752027606"><Phone size={18} /> {blok.button_text || "Call 07752 027606"}</a>
              <Link className="button-secondary" href={blok.button_link || "/services"}>Explore our services <span aria-hidden="true">→</span></Link>
            </div>
            <div className="hero-trust mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <span><ShieldCheck size={18} /> Qualified & insured</span>
              <span><HeartHandshake size={18} /> All breeds welcome</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-art-wash" aria-hidden="true" />
            <span className="hero-paint-streak hero-paint-streak-one" aria-hidden="true" />
            <span className="hero-paint-streak hero-paint-streak-two" aria-hidden="true" />
            <span className="hero-doodle-heart hero-doodle-heart-one" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M31 51C23 44 6 32 6 19 6 9 18 4 26 12l6 7 6-8C47 1 60 9 58 21 56 33 42 44 31 51Z" /></svg></span>
            <span className="hero-doodle-heart hero-doodle-heart-two" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M31 51C22 43 7 32 7 20 7 9 18 5 26 13l6 6 7-8C48 2 59 10 57 21 55 33 42 44 31 51Z" /></svg></span>
            <span className="hero-doodle-paw hero-doodle-paw-one" aria-hidden="true"><PawPrint size={27} /></span>
            <span className="hero-doodle-paw hero-doodle-paw-two" aria-hidden="true"><PawPrint size={22} /></span>
            <span className="hero-doodle-paw hero-doodle-paw-three" aria-hidden="true"><PawPrint size={24} /></span>
            {blok.image?.filename ? <img className="hero-brand-art hero-dog-art" src={blok.image.filename} alt={blok.image.alt || "Illustrated dog artwork for Lily Pads & Poppy Paws"} /> : <Image src="/images/1.jpg" alt="A friendly illustrated dog in the Lily Pads & Poppy Paws brand style" width={1000} height={1500} priority className="hero-brand-art hero-dog-art" sizes="(max-width: 1024px) 90vw, 46vw" />}
            <span className="hero-sticker hero-sticker-top" aria-hidden="true">Pawsitively<br />pampered!</span>
            <span className="hero-sticker hero-sticker-bottom" aria-hidden="true"><PawPrint size={17} /> Every dog is special</span>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>
      {isHome && <section className="trust-ribbon" aria-label="About our dog grooming service"><div className="container-shell"><span><PawPrint size={17} /> A warm welcome for every breed</span><span><ShieldCheck size={17} /> Qualified and insured</span><span><MapPin size={17} /> Hemel Hempstead, Hertfordshire</span></div></section>}
    </>
  );
}

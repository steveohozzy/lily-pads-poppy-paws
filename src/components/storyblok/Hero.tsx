import Image from "next/image";
import Link from "next/link";
import { PawPrint, Phone, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { eyebrow?: string; heading?: string; intro?: string; image?: { filename?: string; alt?: string }; button_text?: string; button_link?: string } };

export default function Hero({ blok }: Props) {
  return (
    <section className="hero-wrap" {...storyblokEditable(blok as never)}>
      <div className="container-shell hero-layout grid gap-8 py-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-16">
        <div className="relative z-10">
          <p className="eyebrow"><PawPrint size={16} /> {blok.eyebrow || "Dog grooming in Hemel Hempstead"}</p>
          <h1 className="display-heading mt-5">{blok.heading || "Happy dogs. Lovely fresh trims."}</h1>
          <p className="hero-intro mt-6 max-w-xl">{blok.intro || "Qualified and insured dog groomer. Everything available from nail clips to full grooms for all breeds."}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="tel:07752027606"><Phone size={18} /> Call 07752 027606</a>
            <Link className="button-secondary" href="/services">Explore our services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-trust mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <span><ShieldCheck size={18} /> Qualified & insured</span>
            <span><PawPrint size={18} /> All breeds welcome</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art-wash" aria-hidden="true" />
          {blok.image?.filename ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hero-brand-art" src={blok.image.filename} alt={blok.image.alt || "Dog ready for a groom"} />
          ) : (
            <Image
              src="/images/1.jpg"
              alt="A friendly illustrated dog on a bright aqua background, in the Lily Pads & Poppy Paws brand style"
              width={1000}
              height={1500}
              priority
              className="hero-brand-art hero-dog-art"
              sizes="(max-width: 1024px) 90vw, 46vw"
            />
          )}
          <span className="hero-sticker hero-sticker-top" aria-hidden="true">Pawsitively<br />pampered!</span>
          <span className="hero-sticker hero-sticker-bottom" aria-hidden="true"><PawPrint size={17} /> Every dog is special</span>
        </div>
      </div>
      <div className="hero-wave" aria-hidden="true" />
    </section>
  );
}

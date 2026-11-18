import Link from "next/link";
import { PawPrint } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { eyebrow?: string; heading?: string; intro?: string; image?: { filename?: string; alt?: string }; button_text?: string; button_link?: string } };

export default function Hero({ blok }: Props) {
  return (
    <section className="hero-wrap" {...storyblokEditable(blok as never)}>
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
        <div className="relative z-10">
          <p className="eyebrow"><PawPrint size={16} /> {blok.eyebrow || "Dog grooming in Hemel Hempstead"}</p>
          <h1 className="display-heading mt-5">{blok.heading || "Happy dogs. Lovely fresh trims."}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">{blok.intro || "Qualified and insured dog groomer. Everything available from nail clips to full grooms for all breeds."}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="tel:07752027606">Call 07752 027606</a>
            <Link className="button-secondary" href="/services">Explore grooming services</Link>
          </div>
        </div>
        <div className="hero-art">
          {blok.image?.filename ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={blok.image.filename} alt={blok.image.alt || "Dog ready for a groom"} />
          ) : (
            <div className="hero-dog-placeholder" aria-label="Dog illustration placeholder">
              <div className="paint-splash" />
              <div className="paw-stamp"><PawPrint size={38} fill="currentColor" /></div>
              <div className="dog-emoji" aria-hidden="true">🐶</div>
              <span className="hero-note">Lots of love<br />for every paw</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

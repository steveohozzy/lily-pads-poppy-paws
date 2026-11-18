import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import { PawPrint, Scissors, Sparkles, Heart } from "lucide-react";
import { services } from "@/lib/business";
import HighlightedText from "./HighlightedText";

type Props = { blok: { _uid: string; eyebrow?: string; heading?: string; highlight?: string; intro?: string; button_text?: string; button_link?: string; price_note?: string; price_note_heading?: string; show_prices?: boolean; show_button?: boolean; show_heading?: boolean; items?: Array<{ _uid: string; component: string; title?: string; description?: string; show_price?: boolean; price?: string }> } };

export default function ServiceGrid({ blok }: Props) {
  return (
    <>
      <section className="section-pad services-section" {...storyblokEditable(blok as never)}>
        <div className="container-shell">
          {blok.show_heading !== false && <div className="section-intro mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><PawPrint size={16} /> {blok.eyebrow || "The good stuff"}</p>
            <h2 className="section-heading mt-4"><HighlightedText text={blok.heading || "A little care goes a long way"} highlight={blok.highlight} /></h2>
            <p className="mt-4 leading-7 text-slate-600">{blok.intro || "From nail clips to full grooms, get in touch to talk through what your dog needs."}</p>
          </div>}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blok.items?.length ? blok.items.map((item, index) => <StoryblokServerComponent blok={item} key={item._uid} show_prices={blok.show_prices} index={index} />) : services.map((item, index) => {
              const Icon = [Scissors, Sparkles, Heart][index % 3];
              return <article className={`service-card service-card-${index + 1}`} key={item.title}><span className="service-icon"><Icon size={27} /></span><h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.description}</p><a href="/contact" className="text-link mt-6">Ask us about this <span aria-hidden="true">→</span></a></article>;
            })}
          </div>
          {blok.price_note && <div className="service-price-note mt-9"><PawPrint size={24}/><p><strong>{blok.price_note_heading || "Every pup is unique."}</strong> {blok.price_note}</p></div>}
          {blok.show_button !== false && <div className="mt-9 text-center"><a href={blok.button_link || "/services"} className="button-secondary">{blok.button_text || "See all service information"} <span aria-hidden="true">→</span></a></div>}
        </div>
      </section>
    </>
  );
}

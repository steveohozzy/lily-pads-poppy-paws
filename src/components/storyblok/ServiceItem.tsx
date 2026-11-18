import { HeartHandshake, PawPrint, Scissors, Sparkles } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { _uid: string; _editable?: string; title?: string; description?: string; show_price?: boolean; price?: string }; show_prices?: boolean };

export default function ServiceItem({ blok, show_prices = false }: Props) {
  const title = blok.title || "Grooming care";
  const Icon = title.toLowerCase().includes("nail") ? Scissors : title.toLowerCase().includes("full") ? Sparkles : HeartHandshake;
  return (
    <article className="service-card service-card-illustrated" {...storyblokEditable(blok)}>
      <span className="service-icon" aria-hidden="true"><Icon size={27} /></span>
      <p className="service-kicker">A little love · Tail-wagging care</p>
      <h3 className="mt-3 text-2xl font-bold text-navy">{title}</h3>
      {blok.description && <p className="mt-3 leading-7 text-slate-600">{blok.description}</p>}
      {show_prices && blok.show_price && blok.price && <p className="mt-4 font-bold text-navy">{blok.price}</p>}
      <div className="service-card-bottom"><span><PawPrint size={15} /> All breeds welcome</span><a href="/contact" className="text-link">Enquire <span aria-hidden="true">→</span></a></div>
    </article>
  );
}

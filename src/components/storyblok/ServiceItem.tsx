import { HeartHandshake, PawPrint, Scissors, Sparkles } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { _uid: string; _editable?: string; title?: string; description?: string; kicker?: string; link_text?: string; link_url?: string; footer_note?: string; variant?: string; show_price?: boolean; price?: string }; show_prices?: boolean; index?: number };

export default function ServiceItem({ blok, show_prices = false, index = 0 }: Props) {
  const title = blok.title || "Grooming care";
  const Icon = title.toLowerCase().includes("nail") ? Scissors : title.toLowerCase().includes("full") ? Sparkles : HeartHandshake;
  const simple = blok.variant === "simple";
  return (
    <article className={simple ? `service-card service-card-${index + 1}` : `service-card service-card-${index + 1} service-card-illustrated`} {...storyblokEditable(blok)}>
      <span className="service-icon" aria-hidden="true"><Icon size={27} /></span>
      {!simple && <p className="service-kicker">{blok.kicker || "A little love · Tail-wagging care"}</p>}
      <h3 className={simple ? "mt-5 text-xl font-bold text-navy" : "mt-3 text-2xl font-bold text-navy"}>{title}</h3>
      {blok.description && <p className="mt-3 leading-7 text-slate-600">{blok.description}</p>}
      {show_prices && blok.show_price && blok.price && <p className="mt-4 font-bold text-navy">{blok.price}</p>}
      {simple ? <a href={blok.link_url || "/contact"} className="text-link mt-6">{blok.link_text || "Ask us about this"}</a> : <div className="service-card-bottom">{blok.footer_note && <span><PawPrint size={15} /> {blok.footer_note}</span>}<a href={blok.link_url || "/contact"} className="text-link">{blok.link_text || "Enquire"}</a></div>}
    </article>
  );
}

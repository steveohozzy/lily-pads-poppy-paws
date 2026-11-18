import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { _uid: string; title?: string; description?: string; show_price?: boolean; price?: string }; show_prices?: boolean };

export default function ServiceItem({ blok, show_prices = false }: Props) {
  return (
    <article className="service-card" {...storyblokEditable(blok)}>
      <h3 className="text-xl font-bold text-navy">{blok.title}</h3>
      {blok.description && <p className="mt-3 leading-7 text-slate-600">{blok.description}</p>}
      {show_prices && blok.show_price && blok.price && <p className="mt-4 font-bold text-navy">{blok.price}</p>}
      <a href="/contact" className="mt-6 inline-flex font-bold text-sky-700 hover:text-navy">Enquire about this service →</a>
    </article>
  );
}

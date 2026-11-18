import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { PawPrint, Scissors, Sparkles, Heart } from "lucide-react";
import { services } from "@/lib/business";

type Props = { blok: { _uid: string; heading?: string; intro?: string; show_prices?: boolean; items?: Array<{ _uid: string; component: string; title?: string; description?: string; show_price?: boolean; price?: string }> } };

export default function ServiceGrid({ blok }: Props) {
  return (
    <section className="section-pad bg-pale">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center"><PawPrint size={16} /> Grooming services</p>
          <h2 className="section-heading mt-3">{blok.heading || "A little care goes a long way"}</h2>
          <p className="mt-4 leading-7 text-slate-600">{blok.intro || "From nail clips to full grooms, get in touch to talk through what your dog needs."}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blok.items?.length ? blok.items.map((item) => <StoryblokServerComponent blok={item} key={item._uid} show_prices={blok.show_prices} />) : services.map((item, index) => {
            const Icon = [Scissors, Sparkles, Heart][index % 3];
            return <article className="service-card" key={item.title}><span className="service-icon"><Icon size={25} /></span><h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.description}</p><a href="/contact" className="mt-6 inline-flex font-bold text-sky-700 hover:text-navy">Enquire about this service →</a></article>;
          })}
        </div>
      </div>
    </section>
  );
}

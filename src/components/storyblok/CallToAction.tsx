import { Phone } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: { heading?: string; body?: string; button_text?: string } };

export default function CallToAction({ blok }: Props) {
  return (
    <section className="section-pad" {...storyblokEditable(blok as never)}>
      <div className="container-shell">
        <div className="cta-panel">
          <p className="eyebrow justify-center">Let's talk tails</p>
          <h2 className="section-heading mt-3">{blok.heading || "Ready to book your dog's next groom?"}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">{blok.body || "Call us to discuss your dog's grooming needs and ask about availability and prices."}</p>
          <a className="button-primary mt-7" href="tel:07752027606"><Phone size={18} /> {blok.button_text || "Call 07752 027606"}</a>
        </div>
      </div>
    </section>
  );
}

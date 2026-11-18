import { PawPrint, Phone } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: {
  _uid?: string; _editable?: string; eyebrow?: string; heading?: string; highlight?: string; body?: string;
  button_text?: string; button_link?: string; phone_link?: string; secondary_button_text?: string; secondary_button_link?: string;
} };

export default function CallToAction({ blok }: Props) {
  return (
    <section className="section-pad final-cta-section" {...storyblokEditable(blok as never)}>
      <div className="container-shell"><div className="final-cta">
        <PawPrint className="final-cta-paw" size={36} fill="currentColor" aria-hidden="true" />
        <p className="eyebrow justify-center">{blok.eyebrow || "Ready for a little pampering?"}</p>
        <h2 className="section-heading mt-4"><HighlightedText text={blok.heading || "Let's get those tails wagging!"} highlight={blok.highlight} /></h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">{blok.body || "Tell us a little about your dog and the grooming you're looking for. We'd love to hear from you."}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><a href={blok.phone_link || "tel:07752027606"} className="button-primary"><Phone size={18} /> {blok.button_text || "07752 027606"}</a><a href={blok.secondary_button_link || "/contact"} className="button-secondary">{blok.secondary_button_text || "Contact us"}</a></div>
      </div></div>
    </section>
  );
}

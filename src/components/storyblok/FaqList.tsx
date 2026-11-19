import { Phone } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: {
  _uid?: string; _editable?: string; heading?: string; highlight?: string;
  intro?: string; phone_text?: string; phone_display?: string; phone_link?: string; show_heading?: boolean;
  items?: Array<{ question: string; answer: string }>;
} };

export default function FaqList({ blok }: Props) {
  return (
    <section className="section-pad" {...storyblokEditable(blok as never)}>
      <div className="container-shell max-w-4xl">
        <div className="faq-intro"><p>{blok.intro || "Can't see the answer you're looking for? Give us a call — we're always happy to have a chat."}</p><a href={blok.phone_link || "tel:07752027606"} className="flex gap-2 items-center"><Phone size={16} /> {blok.phone_text || blok.phone_display || "07752 027606"}</a></div>
        {blok.show_heading && <h2 className="section-heading mt-8"><HighlightedText text={blok.heading || "Dog grooming FAQs"} highlight={blok.highlight} /></h2>}
        <div className="faq-list mt-7">
          {(blok.items || []).map((item, index) => <details className="faq-item" key={`${item.question}-${index}`}><summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}

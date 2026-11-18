import { Phone } from "lucide-react";
import HighlightedText from "./HighlightedText";

type Props = { blok: { heading?: string; highlight?: string; items?: Array<{ question: string; answer: string }> } };

export default function FaqList({ blok }: Props) {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl">
        <div className="faq-intro"><span aria-hidden="true">🐾</span><p>Can't see the answer you're looking for? Give us a call — we're always happy to have a chat.</p><a href="tel:07752027606"><Phone size={16} /> 07752 027606</a></div>
        <h2 className="section-heading mt-8"><HighlightedText text={blok.heading || "Dog grooming FAQs"} highlight={blok.highlight} /></h2>
        <div className="faq-list mt-7">
          {(blok.items || []).map((item, index) => <details className="faq-item" key={`${item.question}-${index}`}><summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}

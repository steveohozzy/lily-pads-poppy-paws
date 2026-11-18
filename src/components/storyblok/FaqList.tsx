import HighlightedText from "./HighlightedText";

type Props = { blok: { heading?: string; highlight?: string; items?: Array<{ question: string; answer: string }> } };

export default function FaqList({ blok }: Props) {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl">
        <h2 className="section-heading"><HighlightedText text={blok.heading || "Dog grooming FAQs"} highlight={blok.highlight} /></h2>
        <div className="mt-8 divide-y divide-sky-100">
          {(blok.items || []).map((item, index) => (
            <details className="faq-item" key={`${item.question}-${index}`}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

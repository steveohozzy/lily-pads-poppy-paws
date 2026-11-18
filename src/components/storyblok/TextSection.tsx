import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: { _uid: string; _editable?: string; heading?: string; highlight?: string; body?: string; eyebrow?: string } };

export default function TextSection({ blok }: Props) {
  return (
    <section className="section-pad" {...storyblokEditable(blok)}>
      <div className="container-shell max-w-4xl">
        {blok.eyebrow && <p className="eyebrow">{blok.eyebrow}</p>}
        {blok.heading && <h2 className="section-heading mt-3"><HighlightedText text={blok.heading} highlight={blok.highlight} /></h2>}
        {blok.body && <div className="prose-copy mt-5 whitespace-pre-line">{blok.body}</div>}
      </div>
    </section>
  );
}

import { HeartHandshake, PawPrint, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: {
  _uid: string; _editable?: string;
  promise_eyebrow?: string; promise_heading?: string; promise_highlight?: string; promise_body?: string;
  heading?: string; highlight?: string; body?: string;
  feature_one?: string; feature_two?: string; feature_three?: string;
} };

export default function AboutIntro({ blok }: Props) {
  const paragraphs = (blok.body || "").split(/\n\n+/).filter(Boolean);
  return (
    <section className="section-pad" {...storyblokEditable(blok as never)}>
      <div className="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div className="soft-note-card"><span className="soft-note-flower">✿</span><p className="eyebrow">{blok.promise_eyebrow || "The Lily Pads promise"}</p><h2 className="section-heading mt-3"><HighlightedText text={blok.promise_heading || "Gentle care. Lovely results."} highlight={blok.promise_highlight || "Lovely results."}/></h2><p className="mt-5 leading-8 text-slate-600">{blok.promise_body || "Every dog has their own personality, coat and comfort level. We believe grooming should feel like a positive part of their care."}</p></div>
        <div className="prose-copy"><h2 className="section-heading"><HighlightedText text={blok.heading || "A friendly approach to dog grooming."} highlight={blok.highlight || "dog grooming."}/></h2>{paragraphs.map((paragraph,index)=><p className={index ? "mt-4" : "mt-6"} key={index}>{paragraph}</p>)}<ul className="feature-list mt-7"><li><ShieldCheck size={20}/>{blok.feature_one || "Qualified and insured"}</li><li><PawPrint size={20}/>{blok.feature_two || "All breeds welcome"}</li><li><HeartHandshake size={20}/>{blok.feature_three || "Friendly conversations about your dog's grooming needs"}</li></ul></div>
      </div>
    </section>
  );
}

import EnquiryOptions from "@/components/EnquiryOptions";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = {
  blok: {
    _uid: string;
    _editable?: string;
    heading?: string;
    body?: string;
    button_text?: string;
    phone_link?: string;
  };
};

export default function StoryblokCallout({ blok }: Props) {
  return (
    <section className="container-shell py-12" {...storyblokEditable(blok as never)}>
      <div className="cta-strip">
        <div>
          <p className="font-display text-3xl font-bold text-navy">{blok.heading || "Let's get those tails wagging!"}</p>
          <p className="mt-2 text-slate-600">{blok.body || "Call to discuss your dog's grooming needs and ask about prices."}</p>
        </div>
        <div className="shrink-0"><EnquiryOptions compact /></div>
      </div>
    </section>
  );
}

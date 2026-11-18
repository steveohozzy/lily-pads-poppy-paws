import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, MapPin, PawPrint, ShieldCheck, Sparkles } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import HighlightedText from "./HighlightedText";

type Props = { blok: { _uid: string; _editable?: string; heading?: string; highlight?: string; body?: string; eyebrow?: string } };

export default function TextSection({ blok }: Props) {
  const eyebrow = blok.eyebrow || "";
  const heading = blok.heading || "";
  const body = blok.body || "";
  const paragraphs = body.split(/\n\n+/).filter(Boolean);
  const isIntro = eyebrow.toLowerCase().includes("welcome to our little grooming");
  const isWhy = eyebrow.toLowerCase().includes("care with a personal touch");
  const isLocal = eyebrow.toLowerCase().includes("your local dog groomer") || heading.toLowerCase().includes("hemel hempstead") && body.includes("42 Lomond Road");

  const isMadeFor = eyebrow.toLowerCase().includes("made for wagging tails");
  const isOpeningHours = heading.toLowerCase().includes("opening hours");
  const isPromise = eyebrow.toLowerCase().includes("the lily pads promise");
  const isServicesIntro = eyebrow.toLowerCase().includes("the pamper menu");
  const EyebrowIcon = isIntro ? Sparkles : isWhy ? HeartHandshake : isLocal ? MapPin : PawPrint;

  if (isPromise) return (
    <section className="section-pad">
      <div className="container-shell"><div className="soft-note-card max-w-xl"><span className="soft-note-flower">✿</span><p className="eyebrow">{eyebrow}</p><h2 className="section-heading mt-3"><HighlightedText text={heading} highlight={blok.highlight}/></h2>{paragraphs.map((paragraph,index)=><p className="mt-5 leading-8 text-slate-600" key={index}>{paragraph}</p>)}</div></div>
    </section>
  );

  if (isServicesIntro) return (
    <section className="section-pad services-section">
      <div className="container-shell"><div className="section-intro mx-auto max-w-2xl text-center"><p className="eyebrow justify-center"><Sparkles size={16}/> {eyebrow}</p><h2 className="section-heading mt-4"><HighlightedText text={heading} highlight={blok.highlight}/></h2>{paragraphs.map((paragraph,index)=><p className="mt-4 leading-7 text-slate-600" key={index}>{paragraph}</p>)}</div></div>
    </section>
  );

  if (isIntro) return (
    <section className="section-pad intro-section" {...storyblokEditable(blok)}>
      <div className="container-shell grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div><p className="eyebrow"><EyebrowIcon size={16} /> {eyebrow}</p><h2 className="section-heading mt-4"><HighlightedText text={heading} highlight={blok.highlight} /></h2></div>
        <div className="prose-copy">{paragraphs.map((paragraph, index) => <p className={index ? "mt-4" : ""} key={index}>{paragraph}</p>)}<Link href="/about" className="text-link mt-5">Get to know Lily Pads & Poppy Paws <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );

  if (isWhy) return (
    <section className="section-pad why-section" {...storyblokEditable(blok)}>
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="why-art-illustration"><div className="why-art-splash" aria-hidden="true" /><PawPrint className="why-art-paw" size={154} fill="currentColor" strokeWidth={1.2} aria-hidden="true" /><span className="why-art-caption">Little paws.<br />Big personalities.</span><span className="why-art-sparkle" aria-hidden="true">✦</span></div>
        <div><p className="eyebrow"><HeartHandshake size={16} /> {eyebrow}</p><h2 className="section-heading mt-4"><HighlightedText text={heading} highlight={blok.highlight} /></h2>
          {paragraphs.map((paragraph,index)=><p className="mt-5 leading-8 text-slate-600" key={index}>{paragraph}</p>)}
          <ul className="feature-list mt-6"><li><ShieldCheck size={20} /> Qualified and insured dog groomer</li><li><PawPrint size={20} /> Grooming options from nail clips to full grooms</li><li><MapPin size={20} /> Conveniently based in Hemel Hempstead</li></ul>
          <Link href="/faqs" className="text-link mt-7">Read our grooming FAQs <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );

  if (isMadeFor) return (
    <section className="section-pad about-image-band" {...storyblokEditable(blok)}>
      <div className="container-shell grid gap-8 md:grid-cols-2 md:items-center">
        <Image src="/images/1.jpg" alt="Illustrated dog in the Lily Pads & Poppy Paws aqua and blue brand artwork" width={1000} height={900} className="about-secondary-image" />
        <div><p className="eyebrow"><Sparkles size={16}/> {eyebrow}</p><h2 className="section-heading mt-4"><HighlightedText text={heading} highlight={blok.highlight}/></h2>{paragraphs.map((paragraph,index)=><p className="mt-5 leading-8 text-slate-600" key={index}>{paragraph}</p>)}<Link href="/contact" className="text-link mt-6">Come and say hello <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );

  if (isLocal) return (
    <section className="section-pad local-section" {...storyblokEditable(blok)}>
      <div className="container-shell grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div><p className="eyebrow"><MapPin size={16} /> {eyebrow || "Your local dog groomer"}</p><h2 className="section-heading mt-4"><HighlightedText text={heading} highlight={blok.highlight} /></h2>
          {(eyebrow.toLowerCase().includes("your local dog groomer") ? paragraphs.slice(0, 1) : []).map((paragraph,index)=><p className="mt-5 max-w-xl leading-8 text-slate-600" key={index}>{paragraph}</p>)}
          <address className="mt-5 not-italic font-bold leading-7 text-navy">Lily Pads & Poppy Paws<br />42 Lomond Road<br />Hemel Hempstead<br />HP2 6PA</address>
          <div className="mt-7 flex flex-wrap gap-3"><a className="button-primary" href="tel:07752027606">Call to enquire</a><a className="button-secondary" href="https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="map-frame"><iframe title="Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA" src="https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed" width="100%" height="390" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div>
    </section>
  );

  const icon = eyebrow.toLowerCase().includes("promise") ? <HeartHandshake size={16} /> : eyebrow.toLowerCase().includes("tails") ? <Sparkles size={16} /> : <PawPrint size={16} />;
  return (
    <section className="section-pad" {...storyblokEditable(blok)}>
      <div className="container-shell max-w-4xl">
        {eyebrow && <p className="eyebrow">{icon}{eyebrow}</p>}
        {heading && <h2 className="section-heading mt-3"><HighlightedText text={heading} highlight={blok.highlight} /></h2>}
        {!isOpeningHours && paragraphs.map((paragraph,index)=><p className="prose-copy mt-5" key={index}>{paragraph}</p>)}
        {heading.toLowerCase().includes("opening hours") && <div className="contact-panel contact-address-panel mt-7"><span className="contact-icon"><PawPrint size={25}/></span><p className="eyebrow mt-5">When we're open</p><h3 className="mt-2 text-3xl font-bold text-navy">Opening hours.</h3><dl className="mt-4 space-y-2 leading-7 text-slate-600">{[["Monday","Closed"],["Tuesday","09:00 – 17:00"],["Wednesday","09:00 – 17:00"],["Thursday","09:00 – 17:00"],["Friday","09:00 – 17:00"],["Saturday","09:00 – 15:00"],["Sunday","Closed"]].map(([day,hours])=><div className="flex justify-between gap-4" key={day}><dt className="font-semibold">{day}</dt><dd>{hours}</dd></div>)}</dl></div>}
      </div>
    </section>
  );
}

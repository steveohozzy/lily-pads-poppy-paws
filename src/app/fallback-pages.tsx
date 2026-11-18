import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, HeartHandshake, MapPin, PawPrint, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/lib/business";
import Callout from "@/components/Callout";


export function HomeFallback() {
  return (
    <>
      <section className="hero-wrap">
        <div className="container-shell hero-layout grid gap-8 py-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-16">
          <div className="hero-copy relative z-10">
            <p className="eyebrow"><PawPrint size={16} /> A little love for every paw · Hemel Hempstead</p>
            <h1 className="display-heading mt-5">Dog grooming in <span>Hemel Hempstead</span></h1>
            <p className="hero-intro mt-6 max-w-xl">Happy dogs, lovely fresh coats and a whole lot of fuss. Lily Pads & Poppy Paws is a qualified and insured dog groomer offering everything from nail clips to full grooms for all breeds.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="tel:07752027606"><Phone size={18} /> Call 07752 027606</a>
              <Link className="button-secondary" href="/services">Explore our services <span aria-hidden="true">→</span></Link>
            </div>
            <div className="hero-trust mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <span><ShieldCheck size={18} /> Qualified & insured</span>
              <span><HeartHandshake size={18} /> All breeds welcome</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-art-wash" aria-hidden="true" />
            <Image
              src="/images/brand-reference-logo.jpeg"
              alt="Lily Pads & Poppy Paws illustrated dog grooming logo with two hand-drawn dogs and blue flowers"
              width={1000}
              height={1000}
              priority
              className="hero-brand-art"
              sizes="(max-width: 1024px) 90vw, 46vw"
            />
            <span className="hero-sticker hero-sticker-top" aria-hidden="true">Pawsitively<br />pampered!</span>
            <span className="hero-sticker hero-sticker-bottom" aria-hidden="true"><PawPrint size={17} /> Every dog is special</span>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>

      <section className="trust-ribbon" aria-label="About our dog grooming service">
        <div className="container-shell">
          <span><PawPrint size={17} /> A warm welcome for every breed</span>
          <span><ShieldCheck size={17} /> Qualified and insured</span>
          <span><MapPin size={17} /> Hemel Hempstead, Hertfordshire</span>
        </div>
      </section>

      <section className="section-pad intro-section">
        <div className="container-shell grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow"><Sparkles size={16} /> Welcome to our little grooming corner</p>
            <h2 className="section-heading mt-4">Good hair days are for <span>every dog.</span></h2>
          </div>
          <div className="prose-copy">
            <p>At Lily Pads & Poppy Paws, we believe every dog deserves to feel comfortable, cared for and looking their very best. Based in Hemel Hempstead, we welcome all breeds and offer grooming from a simple nail clip to a full groom.</p>
            <p className="mt-4">Not sure what your dog needs? Give us a call. We can chat about the grooming you have in mind and provide a price before you arrange an appointment.</p>
            <Link href="/about" className="text-link mt-5">Get to know Lily Pads & Poppy Paws <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section-pad services-section">
        <div className="container-shell">
          <div className="section-intro mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><PawPrint size={16} /> The good stuff</p>
            <h2 className="section-heading mt-4">A little trim, or the full <span>glow-up?</span></h2>
            <p className="mt-4 leading-7 text-slate-600">Explore our dog grooming services in Hemel Hempstead. Every dog is different, so get in touch to discuss what your four-legged friend needs.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <article className={`service-card service-card-${index + 1}`} key={service.title}>
                <span className="service-icon" aria-hidden="true">{index === 0 ? <ScissorsIcon /> : index === 1 ? <Sparkles size={27} /> : <HeartHandshake size={27} />}</span>
                <p className="service-kicker">0{index + 1} · Tail-wagging care</p>
                <h3 className="mt-2 text-xl font-bold text-navy">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                <Link href="/contact" className="text-link mt-6">Ask us about this <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
          <div className="mt-9 text-center"><Link href="/services" className="button-secondary">See all service information <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section-pad why-section">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="why-art-illustration" aria-label="Illustrated paw print and grooming message">
            <div className="why-art-splash" aria-hidden="true" />
            <PawPrint className="why-art-paw" size={154} fill="currentColor" strokeWidth={1.2} aria-hidden="true" />
            <span className="why-art-caption">Little paws.<br />Big personalities.</span>
            <span className="why-art-sparkle" aria-hidden="true">✦</span>
          </div>
          <div>
            <p className="eyebrow"><HeartHandshake size={16} /> Care with a personal touch</p>
            <h2 className="section-heading mt-4">Because they're not just pets. They're <span>family.</span></h2>
            <p className="mt-5 leading-8 text-slate-600">Choosing a dog groomer is about finding someone you feel happy trusting with a very important member of the family. Lily Pads & Poppy Paws is qualified and insured, and welcomes dogs of all breeds.</p>
            <ul className="feature-list mt-6">
              <li><BadgeCheck size={20} /> Qualified and insured dog groomer</li>
              <li><PawPrint size={20} /> Grooming options from nail clips to full grooms</li>
              <li><MapPin size={20} /> Conveniently based in Hemel Hempstead</li>
            </ul>
            <Link href="/faqs" className="text-link mt-7">Read our grooming FAQs <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section-pad local-section">
        <div className="container-shell grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow"><MapPin size={16} /> Your local dog groomer</p>
            <h2 className="section-heading mt-4">Find us in <span>Hemel Hempstead.</span></h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA. If you're looking for dog grooming in Hemel Hempstead, Hertfordshire, get in touch to ask about services, prices and appointments.</p>
            <address className="mt-5 not-italic font-bold leading-7 text-navy">Lily Pads & Poppy Paws<br />42 Lomond Road<br />Hemel Hempstead<br />HP2 6PA</address>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="button-primary" href="tel:07752027606"><Phone size={17} /> Call to enquire</a>
              <a className="button-secondary" href="https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="map-frame">
            <iframe title="Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA" src="https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed" width="100%" height="390" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="section-pad final-cta-section">
        <div className="container-shell">
          <div className="final-cta">
            <PawPrint className="final-cta-paw" size={36} fill="currentColor" aria-hidden="true" />
            <p className="eyebrow justify-center">Ready for a little pampering?</p>
            <h2 className="section-heading mt-4">Let's get those tails wagging!</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Tell us a little about your dog and the grooming you're looking for. We'd love to hear from you.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="tel:07752027606" className="button-primary"><Phone size={18} /> 07752 027606</a>
              <Link href="/contact" className="button-secondary">Contact us <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ScissorsIcon() {
  return <span className="scissors-symbol" aria-hidden="true">✂</span>;
}


export function AboutFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell"><p className="eyebrow">A little about us</p><h1 className="mt-4">Care for every kind of coat</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Lily Pads & Poppy Paws is a qualified and insured dog grooming business in Hemel Hempstead.</p></div></section>
      <section className="section-pad"><div className="container-shell max-w-4xl"><h2 className="section-heading">Qualified and insured dog groomer</h2><div className="prose-copy mt-6"><p>At Lily Pads & Poppy Paws, everything is available from nail clips to full grooms for all breeds.</p><p className="mt-4">If you are looking for a dog groomer in Hemel Hempstead, get in touch to talk about your dog, the grooming you need and the price.</p></div></div></section>
      <Callout />
    </>
  );
}



export function ServicesFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell"><p className="eyebrow">Lily Pads & Poppy Paws</p><h1 className="mt-4">Dog grooming services</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">From nail clips to full grooms for all breeds. Call us to discuss your dog's needs and ask for a price.</p></div></section>
      <section className="section-pad"><div className="container-shell"><div className="grid gap-5 md:grid-cols-3">{services.map((service) => <article className="service-card" key={service.title}><h2 className="text-xl font-bold text-navy">{service.title}</h2><p className="mt-3 leading-7 text-slate-600">{service.description}</p><p className="mt-5 text-sm font-bold text-sky-700">Price on enquiry</p><a href="tel:07752027606" className="mt-5 inline-flex font-bold text-navy">Call to enquire →</a></article>)}</div><p className="mt-10 max-w-3xl leading-8 text-slate-600">Prices can vary depending on the grooming required and your dog. Please contact Lily Pads & Poppy Paws directly for a quote. We can discuss the service you are looking for before arranging an appointment.</p></div></section>
      <Callout />
    </>
  );
}



export function GalleryFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell"><p className="eyebrow">Our lovely four-legged visitors</p><h1 className="mt-4">Grooming gallery</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A collection of dogs and grooming transformations from Lily Pads & Poppy Paws.</p></div></section>
      <section className="section-pad"><div className="container-shell"><div className="rounded-3xl bg-pale px-6 py-14 text-center"><div className="text-5xl">🐾</div><h2 className="section-heading mt-5">Gallery coming soon</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Photos will be added here as the gallery is built in Storyblok. Follow us on Facebook and Instagram in the meantime.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><a className="button-secondary" href="https://www.facebook.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Facebook</a><a className="button-secondary" href="https://www.instagram.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Instagram</a></div></div></div></section>
      <Callout />
    </>
  );
}



const faqs = [
  ["Where are you based?", "Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA."],
  ["What dog grooming services do you offer?", "Everything is available from nail clips to full grooms for all breeds. Call to discuss the grooming you need."],
  ["How much does dog grooming cost?", "Please call for a price. The cost can depend on the service required and your dog."],
  ["How do I make an appointment?", "Please call 07752 027606 to enquire about appointments."],
  ["Are you a qualified and insured dog groomer?", "Yes. Lily Pads & Poppy Paws describes itself as a qualified and insured dog groomer."]
];

export function FaqsFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell"><p className="eyebrow">Helpful information</p><h1 className="mt-4">Dog grooming FAQs</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A few useful answers about dog grooming with Lily Pads & Poppy Paws in Hemel Hempstead.</p></div></section>
      <section className="section-pad"><div className="container-shell max-w-4xl"><div className="divide-y divide-sky-100">{faqs.map(([q, a]) => <details className="faq-item" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
      <Callout />
    </>
  );
}



export function ContactFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell"><p className="eyebrow">We'd love to hear from you</p><h1 className="mt-4">Contact & location</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Call Lily Pads & Poppy Paws to discuss your dog's grooming needs, prices and appointments.</p></div></section>
      <section className="section-pad"><div className="container-shell grid gap-6 lg:grid-cols-2">
        <div className="contact-panel"><Phone size={28} className="text-sky-700" /><h2 className="mt-4 text-2xl font-bold text-navy">Call us</h2><p className="mt-3 leading-7 text-slate-600">For grooming enquiries, prices and appointments, give us a call.</p><a className="button-primary mt-6" href="tel:07752027606">07752 027606</a></div>
        <div className="contact-panel"><MapPin size={28} className="text-sky-700" /><h2 className="mt-4 text-2xl font-bold text-navy">Visit us</h2><p className="mt-3 leading-7 text-slate-600">42 Lomond Road<br />Hemel Hempstead<br />HP2 6PA<br />Hertfordshire</p><a className="mt-5 inline-flex font-bold text-sky-700" href="https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA" target="_blank" rel="noreferrer">Get directions →</a></div>
      </div><div className="container-shell mt-8 overflow-hidden rounded-3xl border border-sky-100"><iframe title="Map showing Lily Pads & Poppy Paws" src="https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed" width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0" /></div></section>
      <Callout />
    </>
  );
}



export function PrivacyFallback() {
  return (
    <section className="section-pad"><div className="container-shell max-w-4xl"><p className="eyebrow">Website information</p><h1 className="section-heading mt-3">Privacy policy</h1><p className="mt-6 leading-8 text-slate-600">This page is a starter privacy notice and must be reviewed and completed by the business before the website goes live. Add the business's data controller details, the information collected, purposes and lawful bases, retention periods, third-party services, data subject rights and contact method. If analytics, advertising cookies or enquiry forms are added, update this policy and implement the appropriate consent controls.</p><p className="mt-5 leading-8 text-slate-600">The website currently provides telephone links and links to third-party social media and map services. Those third-party services operate under their own privacy policies.</p></div></section>
  );
}

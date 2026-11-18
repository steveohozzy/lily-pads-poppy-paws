import Link from "next/link";
import { BadgeCheck, HeartHandshake, MapPin, PawPrint, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/lib/business";
import Callout from "@/components/Callout";


export function HomeFallback() {
  return (
    <>
      <section className="hero-wrap">
        <div className="container-shell grid gap-8 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div className="relative z-10">
            <p className="eyebrow"><PawPrint size={16} /> Dog grooming in Hemel Hempstead</p>
            <h1 className="display-heading mt-5">A little pampering for your best friend.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">Qualified and insured dog groomer. Everything available from nail clips to full grooms for all breeds!</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="tel:07752027606">Call 07752 027606</a>
              <Link className="button-secondary" href="/services">Explore grooming services</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-navy">
              <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-sky-700" /> Qualified & insured</span>
              <span className="flex items-center gap-2"><HeartHandshake size={18} className="text-sky-700" /> All breeds welcome</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-dog-placeholder">
              <div className="paint-splash" />
              <div className="paw-stamp"><PawPrint size={38} fill="currentColor" /></div>
              <div className="dog-emoji" aria-hidden="true">🐶</div>
              <span className="hero-note">Lots of love<br />for every paw</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow"><Sparkles size={16} /> Welcome to our little corner</p>
            <h2 className="section-heading mt-3">Dog grooming in Hemel Hempstead</h2>
          </div>
          <div className="prose-copy">
            <p>Lily Pads & Poppy Paws is a dog grooming business in Hemel Hempstead, Hertfordshire. We offer everything from nail clips to full grooms for all breeds.</p>
            <p className="mt-4">Whether you are looking for a quick nail trim or enquiring about a full groom, give us a call and we can discuss what your dog needs and provide a price.</p>
            <Link href="/about" className="mt-5 inline-flex font-bold text-sky-700 hover:text-navy">More about Lily Pads & Poppy Paws →</Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-pale">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><PawPrint size={16} /> Grooming services</p>
            <h2 className="section-heading mt-3">From nail clips to full grooms</h2>
            <p className="mt-4 leading-7 text-slate-600">Every dog is different. Get in touch to talk through the grooming you need and ask for a price.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-icon">{index === 0 ? "✂" : index === 1 ? "✦" : "♡"}</span>
                <h3 className="mt-5 text-xl font-bold text-navy">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                <Link href="/contact" className="mt-6 inline-flex font-bold text-sky-700 hover:text-navy">Enquire now →</Link>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/services" className="button-secondary">View all service information</Link></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          <div className="contact-panel">
            <BadgeCheck className="text-sky-700" size={28} />
            <h2 className="mt-4 text-xl font-bold text-navy">Qualified & insured</h2>
            <p className="mt-2 leading-7 text-slate-600">Your dog is in the care of a qualified and insured dog groomer.</p>
          </div>
          <div className="contact-panel">
            <PawPrint className="text-sky-700" size={28} />
            <h2 className="mt-4 text-xl font-bold text-navy">All breeds welcome</h2>
            <p className="mt-2 leading-7 text-slate-600">From nail clips to full grooms, get in touch to discuss your dog's needs.</p>
          </div>
          <div className="contact-panel">
            <MapPin className="text-sky-700" size={28} />
            <h2 className="mt-4 text-xl font-bold text-navy">Based in Hemel Hempstead</h2>
            <p className="mt-2 leading-7 text-slate-600">Find Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead, HP2 6PA.</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-pale">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow"><MapPin size={16} /> Find your local dog groomer</p>
            <h2 className="section-heading mt-3">Looking for dog grooming in Hemel Hempstead?</h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA. If you are local and looking for a dog groomer, call us to ask about services, prices and availability.</p>
            <a className="button-primary mt-7" href="tel:07752027606">Call 07752 027606</a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-2 shadow-sm">
            <iframe title="Map showing Lily Pads & Poppy Paws in Hemel Hempstead" src="https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed" width="100%" height="340" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl border-0" />
          </div>
        </div>
      </section>
      <Callout />
    </>
  );
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

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, HeartHandshake, MapPin, PawPrint, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/lib/business";
import Callout from "@/components/Callout";
import { GroomingPicker, GalleryShowcase } from "@/components/FallbackInteractions";


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
              src="/images/1.jpg"
              alt="A friendly illustrated dog on a bright aqua background, in the Lily Pads & Poppy Paws brand style"
              width={1000}
              height={1500}
              priority
              className="hero-brand-art hero-dog-art"
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

      <section className="section-pad picker-section"><div className="container-shell"><GroomingPicker /></div></section>

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
      <section className="page-hero page-hero-art">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div><p className="eyebrow"><HeartHandshake size={16} /> A little about us</p><h1 className="mt-4">A happy place for <span>happy paws.</span></h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A friendly, caring grooming experience where your dog is treated like one of the family. Lily Pads & Poppy Paws is a qualified and insured dog groomer in Hemel Hempstead, welcoming all breeds.</p>
            <div className="mt-7 flex flex-wrap gap-3"><a className="button-primary" href="tel:07752027606"><Phone size={18} /> Have a chat</a><Link className="button-secondary" href="/services">Explore grooming <span aria-hidden="true">→</span></Link></div>
          </div>
          <div className="page-art-card page-art-about"><Image src="/images/3.jpg" alt="Lily Pads & Poppy Paws brand artwork" width={900} height={900} className="page-feature-image" /><span className="paint-note">A little kindness<br />goes a long way</span></div>
        </div>
      </section>
      <section className="section-pad"><div className="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div className="soft-note-card"><span className="soft-note-flower">✿</span><p className="eyebrow">The Lily Pads promise</p><h2 className="section-heading mt-3">Gentle care.<br /><span>Lovely results.</span></h2><p className="mt-5 leading-8 text-slate-600">Every dog has their own personality, coat and comfort level. We believe grooming should feel like a positive part of their care.</p></div>
        <div className="prose-copy"><h2 className="section-heading">A little care makes a <span>big difference.</span></h2><p className="mt-6">From a simple nail clip to a full groom, Lily Pads & Poppy Paws offers grooming options for all breeds. Whether your dog is a regular visitor or you're enquiring for the first time, you're welcome to get in touch and talk through what they need.</p><p className="mt-4">We're based in Hemel Hempstead and are qualified and insured. We can discuss the grooming you're looking for and provide a price before you arrange an appointment.</p><ul className="feature-list mt-7"><li><ShieldCheck size={20} /> Qualified and insured</li><li><PawPrint size={20} /> All breeds welcome</li><li><HeartHandshake size={20} /> From nail clips to full grooms</li></ul></div>
      </div></section>
      <section className="section-pad about-image-band"><div className="container-shell grid gap-8 md:grid-cols-2 md:items-center"><Image src="/images/1.jpg" alt="Lily Pads & Poppy Paws dog grooming brand image" width={1000} height={900} className="about-secondary-image" /><div><p className="eyebrow"><Sparkles size={16} /> Made for wagging tails</p><h2 className="section-heading mt-4">Because every dog deserves to feel <span>their best.</span></h2><p className="mt-5 leading-8 text-slate-600">A tidy trim, a little refresh or a full pamper — let's find the right grooming option for your four-legged friend.</p><Link href="/contact" className="text-link mt-6">Come and say hello <span aria-hidden="true">→</span></Link></div></div></section>
      <Callout />
    </>
  );
}

export function ServicesFallback() {
  return (
    <>
      <section className="page-hero page-hero-art"><div className="container-shell grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><p className="eyebrow"><Sparkles size={16} /> A little something for every dog</p><h1 className="mt-4">Grooming that keeps tails <span>wagging.</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">From nail clips to full grooms, we offer dog grooming for all breeds in Hemel Hempstead. Tell us what your dog needs and we'll be happy to chat.</p><a className="button-primary mt-7" href="tel:07752027606"><Phone size={18} /> Call for a quote</a></div><div className="page-art-card page-art-services"><Image src="/images/1.jpg" alt="Lily Pads & Poppy Paws grooming artwork" width={900} height={900} className="page-feature-image" /><span className="paint-note">Freshen up<br />your fluff!</span></div></div></section>
      <section className="section-pad services-section"><div className="container-shell"><div className="section-intro mx-auto max-w-2xl text-center"><p className="eyebrow justify-center">The pamper menu</p><h2 className="section-heading mt-4">Little touches, <span>lovely transformations.</span></h2><p className="mt-4 leading-7 text-slate-600">Every dog is different, so get in touch to discuss the best option for your four-legged friend.</p></div>
        <div className="mt-11 grid gap-5 md:grid-cols-3">{services.map((service,index)=><article className={`service-card service-card-${index+1} service-card-illustrated`} key={service.title}><span className="service-icon" aria-hidden="true">{index===0?<ScissorsIcon />:index===1?<Sparkles size={27}/>:<HeartHandshake size={27}/>}</span><p className="service-kicker">A little love · 0{index+1}</p><h3 className="mt-3 text-2xl font-bold text-navy">{service.title}</h3><p className="mt-3 leading-7 text-slate-600">{service.description}</p><div className="service-card-bottom"><span>All breeds welcome</span><Link href="/contact" className="text-link">Enquire <span aria-hidden="true">→</span></Link></div></article>)}</div>
        <div className="service-price-note mt-9"><PawPrint size={24}/><p><strong>Every pup is unique.</strong> Prices depend on the grooming required and your dog. Give us a call and we'll happily discuss your needs and provide a price before arranging an appointment.</p></div>
      </div></section>
      <section className="section-pad"><div className="container-shell"><GroomingPicker /></div></section>
      <Callout />
    </>
  );
}

export function GalleryFallback() {
  return (
    <>
      <section className="page-hero"><div className="container-shell text-center"><p className="eyebrow justify-center"><PawPrint size={16}/> The lovely faces behind the paws</p><h1 className="mt-4">A little gallery of <span>loveliness.</span></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">A peek at the Lily Pads & Poppy Paws world. Tap a picture to take a closer look.</p></div></section>
      <section className="section-pad gallery-page-section"><div className="container-shell"><GalleryShowcase /><div className="gallery-social-note mt-12"><div><p className="eyebrow">More fluffy updates</p><h2 className="section-heading mt-2">Follow along for <span>more paw-some moments.</span></h2><p className="mt-3 leading-7 text-slate-600">Find Lily Pads & Poppy Paws on social media for the latest updates.</p></div><div className="flex flex-wrap gap-3"><a className="button-secondary" href="https://www.facebook.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Facebook ↗</a><a className="button-secondary" href="https://www.instagram.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></div></section>
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
      <section className="page-hero"><div className="container-shell text-center"><p className="eyebrow justify-center"><HeartHandshake size={16}/> Here to help</p><h1 className="mt-4">A few little <span>questions?</span></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Everything you might like to know before booking a grooming appointment with Lily Pads & Poppy Paws.</p></div></section>
      <section className="section-pad"><div className="container-shell max-w-4xl"><div className="faq-intro"><span>🐾</span><p>Can't see the answer you're looking for? Give us a call — we're always happy to have a chat.</p><a href="tel:07752027606">07752 027606</a></div><div className="faq-list mt-7">{faqs.map(([q,a],index)=><details className="faq-item" key={q}><summary><span className="faq-number">0{index+1}</span><span>{q}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
      <Callout />
    </>
  );
}

export function ContactFallback() {
  return (
    <>
      <section className="page-hero page-hero-art"><div className="container-shell grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><p className="eyebrow"><HeartHandshake size={16}/> Let's have a chat</p><h1 className="mt-4">Your dog's next little <span>glow-up starts here.</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Questions about grooming, prices or appointments? We'd love to hear from you.</p><a href="tel:07752027606" className="button-primary mt-7"><Phone size={18}/> Call 07752 027606</a></div><div className="page-art-card page-art-contact"><Image src="/images/3.jpg" alt="Lily Pads & Poppy Paws brand artwork" width={900} height={900} className="page-feature-image"/><span className="paint-note">Come say<br/>hello!</span></div></div></section>
      <section className="section-pad"><div className="container-shell"><div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="contact-panel contact-main-panel"><span className="contact-icon"><Phone size={25}/></span><p className="eyebrow mt-5">Give us a call</p><h2 className="mt-2 text-3xl font-bold text-navy">Let's talk tails.</h2><p className="mt-3 leading-7 text-slate-600">For grooming enquiries, prices and appointments, give us a ring. We can chat about your dog's needs and the best next step.</p><a className="button-primary mt-6" href="tel:07752027606">07752 027606</a></div>
        <div className="contact-panel contact-address-panel"><span className="contact-icon"><MapPin size={25}/></span><p className="eyebrow mt-5">Find our little corner</p><h2 className="mt-2 text-3xl font-bold text-navy">Hemel Hempstead.</h2><address className="mt-4 not-italic leading-8 text-slate-600">42 Lomond Road<br/>Hemel Hempstead<br/>HP2 6PA<br/>Hertfordshire</address><a className="text-link mt-5" href="https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
      </div><div className="map-frame mt-8"><iframe title="Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA" src="https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed" width="100%" height="390" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></div></section>
      <Callout />
    </>
  );
}

export function PrivacyFallback() {
  return (
    <section className="section-pad"><div className="container-shell max-w-4xl"><p className="eyebrow">Website information</p><h1 className="section-heading mt-3">Privacy policy</h1><p className="mt-6 leading-8 text-slate-600">This page is a starter privacy notice and must be reviewed and completed by the business before the website goes live. Add the business's data controller details, the information collected, purposes and lawful bases, retention periods, third-party services, data subject rights and contact method. If analytics, advertising cookies or enquiry forms are added, update this policy and implement the appropriate consent controls.</p><p className="mt-5 leading-8 text-slate-600">The website currently provides telephone links and links to third-party social media and map services. Those third-party services operate under their own privacy policies.</p></div></section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, PawPrint, X } from "lucide-react";

const galleryImages = [
  { src: "/images/1.jpg", alt: "Lily Pads & Poppy Paws artwork — image one", note: "A little love for every paw" },
  { src: "/images/2.jpeg", alt: "Lily Pads & Poppy Paws logo artwork", note: "A friendly welcome" },
  { src: "/images/3.jpg", alt: "Lily Pads & Poppy Paws artwork — image three", note: "Made for happy tails" }
];

const groomingOptions = [
  { id: "nails", title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." },
  { id: "full", title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." },
  { id: "other", title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." }
];

export function GroomingPicker() {
  const [selected, setSelected] = useState("full");
  const choice = groomingOptions.find((item) => item.id === selected) || groomingOptions[1];
  return (
    <div className="grooming-picker">
      <div className="picker-copy"><p className="eyebrow"><PawPrint size={15}/> A tiny bit of help</p><h2 className="section-heading mt-3">What kind of <span>pamper</span> are you thinking?</h2><p className="mt-4 leading-7 text-slate-600">Choose the option that sounds closest. We'll point you in the right direction.</p></div>
      <div className="picker-options" role="group" aria-label="Choose a grooming option">
        {groomingOptions.map((option) => <button type="button" key={option.id} className={`picker-option ${selected === option.id ? "is-selected" : ""}`} onClick={() => setSelected(option.id)} aria-pressed={selected === option.id}><span className="picker-option-check">{selected === option.id ? <Check size={15}/> : <PawPrint size={15}/>}</span><strong>{option.title}</strong><small>{option.detail}</small></button>)}
      </div>
      <div className="picker-result" aria-live="polite"><span className="picker-result-paw"><PawPrint size={23}/></span><div><strong>{choice.title}</strong><p>{choice.result}</p></div><a href="tel:07752027606" aria-label="Call Lily Pads and Poppy Paws">Let's chat <ArrowRight size={17}/></a></div>
    </div>
  );
}

export function GalleryShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const previous = () => setActive((current) => current === null ? null : (current + galleryImages.length - 1) % galleryImages.length);
  const next = () => setActive((current) => current === null ? null : (current + 1) % galleryImages.length);
  return (
    <>
      <div className="gallery-showcase">
        {galleryImages.map((item,index)=><button type="button" className={`gallery-showcase-tile gallery-showcase-tile-${index+1}`} key={item.src} onClick={() => setActive(index)} aria-label={`Open image: ${item.note}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 33vw"/><span className="gallery-tile-caption">{item.note} <span aria-hidden="true">↗</span></span></button>)}
      </div>
      {active !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={close}><button type="button" className="lightbox-close" onClick={close} aria-label="Close image"><X size={22}/></button><button type="button" className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous image"><ChevronLeft size={28}/></button><div className="lightbox-image-wrap" onClick={(event) => event.stopPropagation()}><Image src={galleryImages[active].src} alt={galleryImages[active].alt} fill sizes="90vw" priority/><p>{galleryImages[active].note}</p></div><button type="button" className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={28}/></button><span className="lightbox-count">{active+1} / {galleryImages.length}</span></div>}
    </>
  );
}

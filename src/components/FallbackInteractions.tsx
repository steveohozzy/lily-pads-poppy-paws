"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, PawPrint, X } from "lucide-react";

type GalleryImage = { src: string; alt: string; note?: string };
const defaultGalleryImages: GalleryImage[] = [
  { src: "/images/1.jpg", alt: "Illustrated dog artwork in the Lily Pads & Poppy Paws aqua and blue brand style", note: "A little love for every paw" },
  { src: "/images/2.jpeg", alt: "Lily Pads & Poppy Paws business logo", note: "A friendly welcome" },
  { src: "/images/3.jpg", alt: "Decorative dog grooming brand illustration for Lily Pads & Poppy Paws", note: "Made for happy tails" }
];

const defaultGroomingOptions = [
  { id: "nails", title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." },
  { id: "full", title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." },
  { id: "other", title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." }
];

type GroomingPickerOption = { id?: string; title: string; detail?: string; result?: string };

type GroomingPickerProps = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  highlight_after_words?: number;
  intro?: string;
  button_text?: string;
  phone_link?: string;
  options_aria_label?: string;
  options?: GroomingPickerOption[];
};

export function GroomingPicker({ eyebrow = "A tiny bit of help", heading, highlight = "pamper", highlight_after_words, intro = "Choose the option that sounds closest. We'll point you in the right direction.", button_text = "Let's chat", phone_link = "tel:07752027606", options_aria_label = "Choose a grooming option", options }: GroomingPickerProps = {}) {
  const groomingOptions = options?.length ? options : defaultGroomingOptions;
  const [selected, setSelected] = useState(groomingOptions[1]?.id || groomingOptions[1]?.title || groomingOptions[0]?.id || groomingOptions[0]?.title || "");
  const choice = groomingOptions.find((item) => (item.id || item.title) === selected) || groomingOptions[0];
  const headingParts = heading || "What kind of pamper are you thinking?";
  const highlightIndex = highlight ? headingParts.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  const words = [...headingParts.matchAll(/\S+/g)];
  const insertAfterWords = Math.max(0, Math.min(words.length, highlight_after_words ?? 3));
  const insertIndex = insertAfterWords === 0 ? 0 : words[insertAfterWords - 1].index! + words[insertAfterWords - 1][0].length;
  const headingBefore = headingParts.slice(0, insertIndex).trimEnd();
  const headingAfter = headingParts.slice(insertIndex).trimStart();
  const highlightedHeading = highlight ? <>{headingBefore}{headingBefore ? " " : ""}<span>{highlight}</span>{headingAfter ? " " : ""}{headingAfter}</> : headingParts;
  return (
    <div className="grooming-picker">
      <div className="picker-copy"><p className="eyebrow"><PawPrint size={15}/> {eyebrow}</p><h2 className="section-heading mt-3">{highlightIndex >= 0 ? <>{headingParts.slice(0, highlightIndex)}<span>{headingParts.slice(highlightIndex, highlightIndex + highlight.length)}</span>{headingParts.slice(highlightIndex + highlight.length)}</> : highlightedHeading}</h2><p className="mt-4 leading-7 text-slate-600">{intro}</p></div>
      <div className="picker-options" role="group" aria-label={options_aria_label}>
        {groomingOptions.map((option) => {
          const optionId = option.id || option.title;
          return <button type="button" key={optionId} className={`picker-option ${selected === optionId ? "is-selected" : ""}`} onClick={() => setSelected(optionId)} aria-pressed={selected === optionId}><span className="picker-option-check">{selected === optionId ? <Check size={15}/> : <PawPrint size={15}/>}</span><strong>{option.title}</strong><small>{option.detail}</small></button>;
        })}
      </div>
      {choice && <div className="picker-result" aria-live="polite"><span className="picker-result-paw"><PawPrint size={23}/></span><div><strong>{choice.title}</strong><p>{choice.result}</p></div><a href={phone_link}>{button_text} <ArrowRight size={17}/></a></div>}
    </div>
  );
}

export function GalleryShowcase({ images = defaultGalleryImages }: { images?: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const previous = () => setActive((current) => current === null ? null : (current + images.length - 1) % images.length);
  const next = () => setActive((current) => current === null ? null : (current + 1) % images.length);
  return (
    <>
      <div className="gallery-showcase">
        {images.map((item,index)=><figure className={`gallery-showcase-item gallery-showcase-item-${index+1}`} key={item.src}><button type="button" className={`gallery-showcase-tile gallery-showcase-tile-${index+1}`} onClick={() => setActive(index)} aria-label={`Open image: ${item.note || item.alt}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 33vw"/></button><figcaption className="gallery-showcase-caption">{item.note || item.alt}</figcaption></figure>)}
      </div>
      {active !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={close}><button type="button" className="lightbox-close" onClick={close} aria-label="Close image"><X size={22}/></button><button type="button" className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous image"><ChevronLeft size={28}/></button><div className="lightbox-image-wrap" onClick={(event) => event.stopPropagation()}><Image src={images[active].src} alt={images[active].alt} fill sizes="90vw" priority/><p>{images[active].note || images[active].alt}</p></div><button type="button" className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={28}/></button><span className="lightbox-count">{active+1} / {images.length}</span></div>}
    </>
  );
}

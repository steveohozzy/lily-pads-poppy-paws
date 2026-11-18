import { PawPrint } from "lucide-react";
import { GalleryShowcase } from "@/components/FallbackInteractions";

type Props = { blok: { heading?: string; images?: Array<{ filename: string; alt?: string; title?: string }> } };

export default function GalleryGrid({ blok }: Props) {
  const images = (blok.images || []).filter((image) => image.filename).map((image) => ({
    src: image.filename,
    alt: image.alt || image.title || "Dog grooming gallery image for Lily Pads & Poppy Paws",
    note: image.title || image.alt || "A little love for every paw"
  }));
  return (
    <section className="section-pad gallery-page-section">
      <div className="container-shell">
        <div className="section-intro mx-auto max-w-2xl text-center"><p className="eyebrow justify-center"><PawPrint size={16}/> The lovely faces behind the paws</p><h2 className="section-heading mt-4">{blok.heading || "A peek at our lovely gallery."}</h2></div>
        <div className="mt-10"><GalleryShowcase images={images.length ? images : undefined} /></div>
        <div className="gallery-social-note mt-12"><div><p className="eyebrow">More fluffy updates</p><h2 className="section-heading mt-2">Follow along for <span>more paw-some moments.</span></h2><p className="mt-3 leading-7 text-slate-600">Find Lily Pads & Poppy Paws on social media for the latest updates.</p></div><div className="flex flex-wrap gap-3"><a className="button-secondary" href="https://www.facebook.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Facebook ↗</a><a className="button-secondary" href="https://www.instagram.com/lilypadspoppypaws/" target="_blank" rel="noreferrer">Instagram ↗</a></div></div>
      </div>
    </section>
  );
}

import { PawPrint } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { GalleryShowcase } from "@/components/FallbackInteractions";
import HighlightedText from "./HighlightedText";

type Props = { blok: {
  _uid: string; _editable?: string; eyebrow?: string; heading?: string; intro?: string;
  images?: Array<{ filename: string; alt?: string; title?: string }>;
  gallery_items?: Array<{ _uid: string; image?: { filename?: string; alt?: string }; image_url?: string; alt?: string; caption?: string }>;
  social_eyebrow?: string; social_heading?: string; social_highlight?: string; social_intro?: string;
  facebook_url?: string; instagram_url?: string; facebook_text?: string; instagram_text?: string;
} };

export default function GalleryGrid({ blok }: Props) {
  const images = blok.gallery_items?.length
    ? blok.gallery_items.filter((image) => image.image?.filename || image.image_url).map((image) => ({
        src: image.image?.filename || image.image_url || "",
        alt: image.image?.alt || image.alt || "Dog grooming gallery image for Lily Pads & Poppy Paws",
        note: image.caption || image.alt || "A little love for every paw"
      }))
    : (blok.images || []).filter((image) => image.filename).map((image, index) => ({
        src: image.filename,
        alt: image.alt || image.title || "Dog grooming gallery image for Lily Pads & Poppy Paws",
        note: image.title || ["A little love for every paw", "A friendly welcome", "Made for happy tails"][index] || image.alt || "A little love for every paw"
      }));
  return (
    <section className="section-pad gallery-page-section" {...storyblokEditable(blok as never)}>
      <div className="container-shell">
        <div className="section-intro mx-auto max-w-2xl text-center"><p className="eyebrow justify-center"><PawPrint size={16}/> {blok.eyebrow || "The lovely faces behind the paws"}</p><h2 className="section-heading mt-4">{blok.heading || "A peek at our lovely gallery."}</h2>{blok.intro && <p className="mt-4 leading-7 text-slate-600">{blok.intro}</p>}</div>
        <div className="mt-10"><GalleryShowcase images={images.length ? images : undefined} /></div>
        <div className="gallery-social-note mt-12"><div><p className="eyebrow">{blok.social_eyebrow || "More fluffy updates"}</p><h2 className="section-heading mt-2"><HighlightedText text={blok.social_heading || "Follow along for more paw-some moments."} highlight={blok.social_highlight || "more paw-some moments."} /></h2><p className="mt-3 leading-7 text-slate-600">{blok.social_intro || "Find Lily Pads & Poppy Paws on social media for the latest updates."}</p></div><div className="flex flex-wrap gap-3"><a className="button-secondary" href={blok.facebook_url || "https://www.facebook.com/lilypadspoppypaws/"} target="_blank" rel="noreferrer">{blok.facebook_text || "Facebook"} </a><a className="button-secondary" href={blok.instagram_url || "https://www.instagram.com/lilypadspoppypaws/"} target="_blank" rel="noreferrer">{blok.instagram_text || "Instagram"} </a></div></div>
      </div>
    </section>
  );
}

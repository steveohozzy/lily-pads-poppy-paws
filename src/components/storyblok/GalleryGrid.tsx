type Props = { blok: { heading?: string; images?: Array<{ filename: string; alt?: string }> } };

export default function GalleryGrid({ blok }: Props) {
  return (
    <section className="section-pad bg-pale">
      <div className="container-shell">
        <h2 className="section-heading">{blok.heading || "A peek at our lovely clients"}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {(blok.images || []).map((image, index) => (
            <div className="gallery-tile" key={`${image.filename}-${index}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.filename} alt={image.alt || "Dog groomed by Lily Pads & Poppy Paws"} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { HeartHandshake, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = {
  blok: {
    _uid: string;
    _editable?: string;
    items?: Array<{ _uid: string; label?: string; icon?: string }>;
  };
};

export default function TrustRibbon({ blok }: Props) {
  const icons = { paw: PawPrint, shield: ShieldCheck, location: MapPin, heart: HeartHandshake };
  return (
    <section className="trust-ribbon" aria-label="About our dog grooming service" {...storyblokEditable(blok as never)}>
      <div className="container-shell">
        {(blok.items || []).map((item) => {
          const Icon = icons[(item.icon || "paw") as keyof typeof icons] || PawPrint;
          return <span key={item._uid}><Icon size={17} /> {item.label}</span>;
        })}
      </div>
    </section>
  );
}

import { MapPin, PawPrint, Phone } from "lucide-react";
import { storyblokEditable } from "@storyblok/react/rsc";

type Props = { blok: {
  _uid: string; _editable?: string;
  phone_eyebrow?: string; phone_heading?: string; phone_body?: string; phone_display?: string; phone_link?: string;
  location_eyebrow?: string; location_heading?: string; address_line_1?: string; address_line_2?: string; address_line_3?: string; address_line_4?: string;
  directions_text?: string; directions_url?: string; hours_eyebrow?: string; hours_heading?: string;
  monday_hours?: string; tuesday_hours?: string; wednesday_hours?: string; thursday_hours?: string; friday_hours?: string; saturday_hours?: string; sunday_hours?: string;
  map_title?: string; map_embed_url?: string;
} };

export default function ContactPanels({ blok }: Props) {
  const hours = [
    ["Monday", blok.monday_hours || "Closed"], ["Tuesday", blok.tuesday_hours || "09:00 – 17:00"],
    ["Wednesday", blok.wednesday_hours || "09:00 – 17:00"], ["Thursday", blok.thursday_hours || "09:00 – 17:00"],
    ["Friday", blok.friday_hours || "09:00 – 17:00"], ["Saturday", blok.saturday_hours || "09:00 – 15:00"],
    ["Sunday", blok.sunday_hours || "Closed"]
  ];
  return (
    <section className="section-pad" {...storyblokEditable(blok as never)}>
      <div className="container-shell">
        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="contact-panel contact-main-panel"><span className="contact-icon"><Phone size={25}/></span><p className="eyebrow mt-5">{blok.phone_eyebrow || "Give us a call"}</p><h2 className="mt-2 text-3xl font-bold text-navy">{blok.phone_heading || "Let's talk tails."}</h2><p className="mt-3 leading-7 text-slate-600">{blok.phone_body || "For grooming enquiries, prices and appointments, give us a ring. We can chat about your dog's needs and the best next step."}</p><a className="button-primary mt-6" href={blok.phone_link || "tel:07752027606"}>{blok.phone_display || "07752 027606"}</a></div>
          <div className="contact-panel contact-address-panel"><span className="contact-icon"><MapPin size={25}/></span><p className="eyebrow mt-5">{blok.location_eyebrow || "Find our little corner"}</p><h2 className="mt-2 text-3xl font-bold text-navy">{blok.location_heading || "Hemel Hempstead."}</h2><address className="mt-4 not-italic leading-8 text-slate-600">{blok.address_line_1 || "42 Lomond Road"}<br/>{blok.address_line_2 || "Hemel Hempstead"}<br/>{blok.address_line_3 || "HP2 6PA"}<br/>{blok.address_line_4 || "Hertfordshire"}</address><a className="text-link mt-5" href={blok.directions_url || "https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA"} target="_blank" rel="noreferrer">{blok.directions_text || "Get directions"} <span aria-hidden="true">↗</span></a></div>
          <div className="contact-panel contact-address-panel"><span className="contact-icon"><PawPrint size={25}/></span><p className="eyebrow mt-5">{blok.hours_eyebrow || "When we're open"}</p><h2 className="mt-2 text-3xl font-bold text-navy">{blok.hours_heading || "Opening hours."}</h2><dl className="mt-4 space-y-2 leading-7 text-slate-600">{hours.map(([day,value])=><div className="flex justify-between gap-4" key={day}><dt>{day}</dt><dd className="font-semibold text-navy">{value}</dd></div>)}</dl></div>
        </div>
        <div className="map-frame mt-8"><iframe title={blok.map_title || "Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA"} src={blok.map_embed_url || "https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed"} width="100%" height="390" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
      </div>
    </section>
  );
}

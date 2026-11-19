import { Facebook, MessageCircle, Phone } from "lucide-react";

const whatsappUrl = "https://wa.me/447752027606?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20dog%20grooming.";
const messengerUrl = "https://m.me/lilypadspoppypaws";

export default function EnquiryOptions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "items-center" : "items-stretch"}`} aria-label="Choose how to contact Lily Pads & Poppy Paws">
      <a className="button-primary" href="tel:07752027606">
        <Phone size={17} aria-hidden="true" /> Call us
      </a>
      <a className="button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle size={17} aria-hidden="true" /> WhatsApp
      </a>
      <a className="button-secondary" href={messengerUrl} target="_blank" rel="noreferrer">
        <Facebook size={17} aria-hidden="true" /> Facebook message
      </a>
    </div>
  );
}
